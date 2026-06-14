import { describe, it, expect } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";
import { TestRow } from "../src/components/settings/TestRow.jsx";
import { ConnectionCard } from "../src/components/settings/ConnectionCard.jsx";
import { DeepSeekCard } from "../src/components/settings/DeepSeekCard.jsx";
import { SettingsSaveBar } from "../src/components/layout/SettingsSaveBar.jsx";
import { AccountControl } from "../src/components/auth/AccountControl.jsx";
import { SettingsSheet } from "../src/components/layout/SettingsSheet.jsx";

/* Headless-copy contract for the settings / account components (PR #35).

   These components used to hardcode zh-CN user-facing text; this suite locks in
   the headless派 (老板拍板): the DS is locale-agnostic — every visible string now
   has an ENGLISH default fallback (never empty), and a `copy` prop (forwarded
   down through ConnectionCard → TestRow for the composite cards) overrides it.
   Where an older explicit label prop already existed (testLabel, saveLabel,
   signInLabel …) it must still WIN over the matching copy field.

   Source under test are verbatim Claude Design mirrors — but this `copy` prop is
   a deliberate REPO-SIDE headless refactor (not a handoff). Tests live OUTSIDE
   the mirrors (in tests/) so a future design-sync never clobbers them. We assert
   behavior, not snapshots. See TESTING.md. */

describe("TestRow — English default + copy override", () => {
  it("falls back to English (never empty zh) when no copy is passed", () => {
    const idle = render(<TestRow status="idle" />);
    expect(idle.container.textContent).toContain("Not tested yet");
    expect(within(idle.container).getByRole("button").textContent).toContain("Test connection");

    const ok = render(<TestRow status="ok" result="142ms" />);
    expect(within(ok.container).getByRole("button").textContent).toContain("Test again");
  });

  it("copy overrides every string (here zh-CN)", () => {
    const { container, getByRole } = render(
      <TestRow status="idle" copy={{ idle: "尚未测试", test: "测试连接" }} />,
    );
    expect(container.textContent).toContain("尚未测试");
    expect(getByRole("button").textContent).toContain("测试连接");
  });

  it("the explicit testLabel/idleHint props still win over copy", () => {
    const { container, getByRole } = render(
      <TestRow
        status="idle"
        idleHint="HINT"
        testLabel="GO"
        copy={{ idle: "尚未测试", test: "测试连接" }}
      />,
    );
    expect(container.textContent).toContain("HINT");
    expect(getByRole("button").textContent).toContain("GO");
  });
});

describe("ConnectionCard — copy (own chrome) + testCopy (forwarded to TestRow)", () => {
  it("English defaults: connected summary + collapse aria-label", () => {
    const collapsed = render(<ConnectionCard title="X" status="ok" />);
    expect(collapsed.container.textContent).toContain("Connected");

    // open (status !== ok) → the collapse toggle carries the aria-label
    const open = render(<ConnectionCard title="X" status="idle" />);
    expect(open.getByLabelText("Collapse")).toBeTruthy();
  });

  it("copy overrides summary + collapse aria-label (sentinels avoid StatusPill collision)", () => {
    const collapsed = render(<ConnectionCard title="X" status="ok" copy={{ connected: "ZZON" }} />);
    expect(collapsed.container.textContent).toContain("ZZON");

    const open = render(<ConnectionCard title="X" status="idle" copy={{ collapse: "收起" }} />);
    expect(open.getByLabelText("收起")).toBeTruthy();
  });

  it("testCopy is forwarded to the footer TestRow", () => {
    const { getByText } = render(
      <ConnectionCard title="X" status="idle" testCopy={{ test: "测试连接" }} />,
    );
    expect(getByText("测试连接")).toBeTruthy();
  });
});

describe("DeepSeekCard — one copy object localizes the whole card (forwards down)", () => {
  it("English defaults render (title, desc, idle hint, test button, help, key label)", () => {
    const { container, getByText } = render(<DeepSeekCard status="idle" />);
    expect(container.textContent).toContain("DeepSeek");
    expect(container.textContent).toContain("Powers conversational interaction");
    expect(container.textContent).toContain("Enter a key, then test the connection");
    expect(getByText("Test connection")).toBeTruthy();
    expect(container.textContent).toContain("How do I get a DeepSeek API key?");
    expect(container.textContent).toContain("API KEY");
    expect(container.querySelector("input").placeholder).toContain("sk-");
  });

  it("copy threads down through ConnectionCard → TestRow (sentinels)", () => {
    const { container, getByText } = render(
      <DeepSeekCard
        status="idle"
        copy={{ desc: "ZZDESC", apiKeyLabel: "ZZLABEL", idleHint: "ZZIDLE", test: "ZZTEST" }}
      />,
    );
    expect(container.textContent).toContain("ZZDESC"); // own (ConnectionCard desc)
    expect(container.textContent).toContain("ZZLABEL"); // own field label
    expect(container.textContent).toContain("ZZIDLE"); // forwarded as idleHint → TestRow
    expect(getByText("ZZTEST")).toBeTruthy(); // forwarded via testCopy → TestRow button
  });

  it("copy localizes the connected summary (sentinel avoids StatusPill collision)", () => {
    const { container } = render(<DeepSeekCard status="ok" copy={{ connected: "ZZON" }} />);
    expect(container.textContent).toContain("ZZON");
  });

  it("copy overrides the masked-key placeholder + hint", () => {
    const { container } = render(
      <DeepSeekCard masked copy={{ maskedPlaceholder: "ZZMASK", maskedHint: "ZZHINT" }} />,
    );
    expect(container.querySelector("input").placeholder).toContain("ZZMASK");
    expect(container.textContent).toContain("ZZHINT");
  });

  it("the explicit help prop still wins over copy.help", () => {
    const { container } = render(
      <DeepSeekCard
        status="idle"
        help={{ title: "EXPLICIT HELP", steps: [] }}
        copy={{ help: { title: "copy help", steps: [] } }}
      />,
    );
    expect(container.textContent).toContain("EXPLICIT HELP");
    expect(container.textContent).not.toContain("copy help");
  });
});

describe("SettingsSaveBar — English default + copy override", () => {
  it("English defaults: Save / Discard changes / clean + dirty hints", () => {
    const clean = render(<SettingsSaveBar dirty={false} onSave={() => {}} onReset={() => {}} />);
    expect(clean.container.textContent).toContain("All changes saved");
    expect(clean.getByText("Save")).toBeTruthy();
    expect(clean.getByText("Discard changes")).toBeTruthy();

    const dirty = render(<SettingsSaveBar dirty onSave={() => {}} />);
    expect(dirty.container.textContent).toContain("Unsaved changes");

    const saving = render(<SettingsSaveBar dirty status="saving" onSave={() => {}} />);
    expect(saving.container.textContent).toContain("Saving…");

    const errored = render(<SettingsSaveBar dirty status="error" onSave={() => {}} />);
    expect(errored.container.textContent).toContain("Couldn’t save — please retry");
  });

  it("copy overrides every string (zh-CN)", () => {
    const { container, getByText } = render(
      <SettingsSaveBar
        dirty
        onSave={() => {}}
        onReset={() => {}}
        copy={{ save: "保存", reset: "放弃更改", dirtyHint: "有未保存的更改" }}
      />,
    );
    expect(getByText("保存")).toBeTruthy();
    expect(getByText("放弃更改")).toBeTruthy();
    expect(container.textContent).toContain("有未保存的更改");
  });

  it("the explicit saveLabel + error props still win over copy", () => {
    const { getByText, queryByText, container } = render(
      <SettingsSaveBar
        dirty
        status="error"
        saveLabel="GO"
        error="EXPLICIT ERR"
        onSave={() => {}}
        copy={{ save: "保存", error: "copy err" }}
      />,
    );
    expect(getByText("GO")).toBeTruthy();
    expect(queryByText("保存")).toBeNull();
    expect(container.textContent).toContain("EXPLICIT ERR");
    expect(container.textContent).not.toContain("copy err");
  });
});

describe("AccountControl — English default + copy override", () => {
  it("signed-out: English Sign in by default; copy + signInLabel override", () => {
    const def = render(<AccountControl user={null} onLogin={() => {}} />);
    expect(def.container.textContent).toContain("Sign in");

    const zh = render(<AccountControl user={null} onLogin={() => {}} copy={{ signIn: "登录" }} />);
    expect(zh.container.textContent).toContain("登录");

    // explicit signInLabel wins over copy.signIn
    const explicit = render(
      <AccountControl user={null} onLogin={() => {}} signInLabel="GO" copy={{ signIn: "登录" }} />,
    );
    expect(explicit.container.textContent).toContain("GO");
    expect(explicit.container.textContent).not.toContain("登录");
  });

  it("signed-in: avatar trigger aria-label defaults to English; menu items localizable", () => {
    const def = render(<AccountControl user={{ email: "a@b.c" }} onLogout={() => {}} />);
    expect(def.getByLabelText("Account menu")).toBeTruthy();
    // open the menu → English Signed in / Sign out (DropdownMenu renders inline)
    fireEvent.click(def.getByLabelText("Account menu"));
    expect(def.container.textContent).toContain("Signed in");
    expect(def.container.textContent).toContain("Sign out");

    const zh = render(
      <AccountControl
        user={{ email: "a@b.c" }}
        onLogout={() => {}}
        copy={{ menuLabel: "账户菜单", signedIn: "已登录账户", signOut: "退出登录" }}
      />,
    );
    fireEvent.click(zh.getByLabelText("账户菜单"));
    expect(zh.container.textContent).toContain("已登录账户");
    expect(zh.container.textContent).toContain("退出登录");
  });
});

describe("SettingsSheet — crumb / navLabel default to English", () => {
  it("renders English Settings defaults when not overridden", () => {
    const { container } = render(
      <SettingsSheet open nav={[{ id: "a", label: "Section A", icon: "plug" }]} />,
    );
    // both the breadcrumb and the nav label default to "Settings"
    expect(container.textContent).toContain("Settings");
  });

  it("consumer can still localize crumb / navLabel", () => {
    const { container } = render(
      <SettingsSheet open crumb="设置" navLabel="设置" nav={[{ id: "a", label: "集成" }]} />,
    );
    expect(container.textContent).toContain("设置");
    expect(container.textContent).not.toContain("Settings");
  });
});
