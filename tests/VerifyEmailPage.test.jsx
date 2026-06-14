import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, act, renderHook } from "@testing-library/react";
import { VerifyEmailPage } from "../src/components/auth/VerifyEmailPage.jsx";

/* VerifyEmailPage is the second auth page mirror, but unlike a pure presentational
   mirror it carries real logic: a verifying → ok / error state machine (the
   headless `useVerify`), a success countdown, and a cooldown-gated resend. Those
   behaviors — plus the `fmt` interpolation that a downstream bug report flagged
   (success countdown rendering as "[object Object]s" because String.replace
   stringified a React node) — are exactly what build + Storybook-by-eye can't
   assert. So the logic gets a unit suite. We assert behavior, not snapshots.

   Source under test: src/components/auth/VerifyEmailPage.jsx (a verbatim Claude
   Design mirror — these tests live OUTSIDE it so a design-sync re-sync never
   clobbers them). See TESTING.md. */

const flush = () => act(async () => {});
// Advance fake timers AND flush the React updates + microtasks they trigger, so a
// chained setTimeout (each tick reschedules the next on re-render) actually walks.
const tick = (ms) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });

afterEach(() => {
  vi.useRealTimers();
});

describe("useVerify — the headless verifying → ok / error machine", () => {
  it("starts in 'verifying' and resolves to 'ok' when verifyToken resolves", async () => {
    const { result } = renderHook(() =>
      VerifyEmailPage.useVerify({ verifyToken: () => Promise.resolve() }),
    );
    expect(result.current.status).toBe("verifying");
    await flush();
    expect(result.current.status).toBe("ok");
    expect(result.current.error).toBeNull();
  });

  it("lands in 'error' (never a silent hang) when verifyToken rejects, capturing the error", async () => {
    const err = new Error("link expired");
    const { result } = renderHook(() =>
      VerifyEmailPage.useVerify({ verifyToken: () => Promise.reject(err) }),
    );
    await flush();
    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe(err);
  });

  it("retry() re-runs the check (back through 'verifying')", async () => {
    let ok = false;
    const verifyToken = () => (ok ? Promise.resolve() : Promise.reject(new Error("nope")));
    const { result } = renderHook(() => VerifyEmailPage.useVerify({ verifyToken }));
    await flush();
    expect(result.current.status).toBe("error");
    ok = true;
    act(() => result.current.retry());
    expect(result.current.status).toBe("verifying"); // synchronously resets before the next resolve
    await flush();
    expect(result.current.status).toBe("ok");
  });

  it("autoStart:false stays 'verifying' until retry() is called", async () => {
    const verifyToken = vi.fn(() => Promise.resolve());
    const { result } = renderHook(() =>
      VerifyEmailPage.useVerify({ verifyToken, autoStart: false }),
    );
    await flush();
    expect(verifyToken).not.toHaveBeenCalled();
    expect(result.current.status).toBe("verifying");
    act(() => result.current.retry());
    await flush();
    expect(verifyToken).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("ok");
  });
});

describe("VerifyEmailPage — success countdown (the fmt array fix)", () => {
  it("renders a REAL decrementing number, not '[object Object]s'", async () => {
    vi.useFakeTimers();
    const onContinue = vi.fn();
    render(
      <VerifyEmailPage
        status="ok"
        returnTo={{ label: "Agentaily", href: "/app" }}
        redirectDelay={3}
        onContinue={onContinue}
        showBrandPanel={false}
      />,
    );
    const hint = () => document.querySelector(".ax-verify__hint");
    // The interpolated {seconds} is a React <b> node — with String.replace it
    // would serialize to "[object Object]"; the array-returning fmt renders it.
    expect(hint().textContent).not.toContain("[object Object]");
    expect(hint().querySelector("b")).not.toBeNull();
    expect(hint().querySelector("b").textContent).toBe("3");

    await tick(1000);
    expect(hint().querySelector("b").textContent).toBe("2");
    expect(hint().textContent).not.toContain("[object Object]");
  });

  it("fires onContinue(returnTo) once when the countdown elapses", async () => {
    vi.useFakeTimers();
    const onContinue = vi.fn();
    const returnTo = { label: "Agentaily", href: "/app" };
    render(
      <VerifyEmailPage
        status="ok"
        returnTo={returnTo}
        redirectDelay={2}
        onContinue={onContinue}
        showBrandPanel={false}
      />,
    );
    // 2 → 1 → 0; the final 0-render re-runs the effect that fires onContinue.
    await tick(1000);
    await tick(1000);
    await flush();
    expect(onContinue).toHaveBeenCalledTimes(1);
    expect(onContinue).toHaveBeenCalledWith(returnTo);
  });
});

describe("VerifyEmailPage — error state never auto-redirects", () => {
  it("does not call onContinue in the error state, no matter how much time passes", async () => {
    vi.useFakeTimers();
    const onContinue = vi.fn();
    render(
      <VerifyEmailPage
        status="error"
        returnTo={{ label: "Agentaily", href: "/app" }}
        onContinue={onContinue}
        onBackToSignIn={() => {}}
        showBrandPanel={false}
      />,
    );
    expect(document.querySelector(".ax-verify__mark--error")).not.toBeNull();
    expect(document.querySelector(".ax-verify__hint")).toBeNull(); // no countdown in error
    await act(async () => {
      vi.advanceTimersByTime(60000);
    });
    expect(onContinue).not.toHaveBeenCalled();
  });
});

describe("VerifyEmailPage — resend is cooldown-gated + idempotent + confirms in place", () => {
  it("disables during cooldown and shows a real decrementing number; resend ≠ verified note appears", async () => {
    vi.useFakeTimers();
    let resolveResend;
    const onResend = vi.fn(
      () =>
        new Promise((r) => {
          resolveResend = r;
        }),
    );
    render(
      <VerifyEmailPage
        status="error"
        email="lin@agentaily.dev"
        resendCooldown={20}
        onResend={onResend}
        onBackToSignIn={() => {}}
        showBrandPanel={false}
      />,
    );
    const btn = () => document.querySelector(".ax-verify__resend");
    expect(btn().disabled).toBe(false);

    // doResend calls onResend in a microtask, so flush before asserting.
    fireEvent.click(btn());
    await flush();
    expect(onResend).toHaveBeenCalledTimes(1);
    expect(btn().disabled).toBe(true); // in-flight (idempotent — blocks double-send)

    // A second click while in-flight must not fire onResend again.
    fireEvent.click(btn());
    await flush();
    expect(onResend).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveResend();
    });

    // Now cooled down: button disabled, shows a real seconds number (fmt with a
    // plain number arg), and the in-place "sent" confirmation + "resend ≠ verified"
    // note are present.
    expect(btn().disabled).toBe(true);
    expect(btn().textContent).toContain("20");
    expect(btn().textContent).not.toContain("[object Object]");
    expect(document.querySelector(".ax-verify__confirm--ok")).not.toBeNull();
    expect(document.querySelector(".ax-verify__confirm--ok em")).not.toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(btn().textContent).toContain("19");
  });

  it("hides the resend button entirely when onResend is not injected", () => {
    render(<VerifyEmailPage status="error" email="lin@agentaily.dev" showBrandPanel={false} />);
    expect(document.querySelector(".ax-verify__resend")).toBeNull();
  });
});
