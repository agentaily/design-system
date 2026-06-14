import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "../src/components/inputs/Input.jsx";

/* Input is the form layer's deliberate exception — not a byte-verbatim Claude
   Design mirror but the prototype translated into repo idiom. Its one bit of
   real behavior is the opt-in `reveal` eye: a password field can sprout a
   show/hide toggle that flips the input between type="password" and "text"
   WITHOUT stealing tab focus. That toggle is exactly what build + Storybook-by-
   eye can't assert, so it gets a unit suite here (outside the component file, so
   a future re-sync never clobbers it). See TESTING.md. */

const eye = (c) => c.querySelector(".ax-field__reveal");
const field = (c) => c.querySelector(".ax-input");

describe("Input — opt-in `reveal` eye (password show/hide)", () => {
  it("renders the eye toggle for a password field when reveal is set", () => {
    const { container } = render(<Input label="Password" type="password" reveal />);
    expect(eye(container)).not.toBeNull();
    // starts masked
    expect(field(container).getAttribute("type")).toBe("password");
  });

  it("toggles the input between password and text on click", () => {
    const { container } = render(<Input label="Password" type="password" reveal />);
    expect(field(container).getAttribute("type")).toBe("password");

    fireEvent.click(eye(container));
    expect(field(container).getAttribute("type")).toBe("text");

    fireEvent.click(eye(container));
    expect(field(container).getAttribute("type")).toBe("password");
  });

  it("keeps the eye button out of the tab order (tabIndex=-1) so it never breaks the Tab flow", () => {
    const { container } = render(<Input label="Password" type="password" reveal />);
    expect(eye(container).getAttribute("tabindex")).toBe("-1");
    expect(eye(container).getAttribute("type")).toBe("button"); // never submits a form
  });

  it("exposes aria-pressed reflecting the show/hide state", () => {
    const { container } = render(<Input label="Password" type="password" reveal />);
    const btn = eye(container);
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("does NOT render the eye on a non-password field, even with reveal set", () => {
    const { container } = render(<Input label="Name" type="text" reveal />);
    expect(eye(container)).toBeNull();
    expect(field(container).getAttribute("type")).toBe("text");
  });

  it("does NOT render the eye on a password field when reveal is omitted (opt-in)", () => {
    const { container } = render(<Input label="Password" type="password" />);
    expect(eye(container)).toBeNull();
    expect(field(container).getAttribute("type")).toBe("password");
  });
});
