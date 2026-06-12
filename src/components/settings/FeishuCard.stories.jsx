import React from "react";
import { FeishuCard } from "./FeishuCard.jsx";

export default {
  title: "Settings/FeishuCard",
  component: FeishuCard,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
  },
};

const Frame = ({ children }) => <div style={{ maxWidth: 560, margin: "0 auto" }}>{children}</div>;

const SAMPLE_LINK = "https://team.feishu.cn/base/bascnEXAMPLE?table=tblRSVP";

// Caller owns the config + drives status/result from a mock probe. The card only
// renders — including the App-Token / table read-out it parses from the link
// (pure display). No state, no localStorage, no save bar, no gating in the card.
function Host({ initial, masked = false }) {
  const [cfg, setCfg] = React.useState({
    appId: "",
    secret: "",
    link: "",
    fsStatus: "idle",
    fsResult: "",
    ...initial,
  });
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));
  const test = () => {
    set({ fsStatus: "testing", fsResult: "" });
    setTimeout(
      () => set({ fsStatus: "ok", fsResult: "已连接 ·「报名登记表」· 检测到 6 个字段" }),
      700,
    );
  };
  return (
    <Frame>
      <FeishuCard
        appId={cfg.appId}
        onAppIdChange={(v) => set({ appId: v, fsStatus: "idle", fsResult: "" })}
        secret={cfg.secret}
        onSecretChange={(v) => set({ secret: v, fsStatus: "idle", fsResult: "" })}
        link={cfg.link}
        onLinkChange={(v) => set({ link: v, fsStatus: "idle", fsResult: "" })}
        status={cfg.fsStatus}
        result={cfg.fsResult}
        onTest={test}
        masked={masked}
      />
    </Frame>
  );
}

export const Default = {
  render: () => <Host initial={{ appId: "cli_a1b2c3d4e5f6", link: SAMPLE_LINK }} />,
};

export const Connected = {
  render: () => (
    <Host
      initial={{
        appId: "cli_a1b2c3d4e5f6",
        secret: "demo-secret",
        link: SAMPLE_LINK,
        fsStatus: "ok",
        fsResult: "已连接 ·「报名登记表」· 检测到 6 个字段",
      }}
    />
  ),
};

export const Failed = {
  render: () => (
    <Host
      initial={{
        appId: "cli_a1b2c3d4e5f6",
        secret: "demo-secret",
        link: SAMPLE_LINK,
        fsStatus: "error",
        fsResult: "403 · 应用无该表格写入权限",
      }}
    />
  ),
};

// A secret is already stored server-side (`masked`): the secret field echoes
// masked and still counts as present for the Test button; never re-submitted.
export const MaskedStoredSecret = {
  render: () => (
    <Host
      masked
      initial={{
        appId: "cli_a1b2c3d4e5f6",
        link: SAMPLE_LINK,
        fsStatus: "ok",
        fsResult: "已连接 ·「报名登记表」· 检测到 6 个字段",
      }}
    />
  ),
};

export const Empty = { render: () => <Host /> };
