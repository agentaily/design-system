import React from "react";
import { Badge } from "./Badge.jsx";

// StatusPill — connection/health status mapped onto the DS Badge.
// Four states: idle (未连接) · testing (测试中) · ok (已连接) · error (连接失败).
// Labels are overridable for non-connection uses.
export function StatusPill({ status = "idle", labels = {}, ...rest }) {
  const L = { idle: "未连接", testing: "测试中", ok: "已连接", error: "连接失败", ...labels };
  if (status === "ok")
    return (
      <Badge variant="ok" dot {...rest}>
        {L.ok}
      </Badge>
    );
  if (status === "error")
    return (
      <Badge variant="danger" dot {...rest}>
        {L.error}
      </Badge>
    );
  if (status === "testing")
    return (
      <Badge variant="neutral" dot {...rest}>
        {L.testing}
      </Badge>
    );
  return (
    <Badge variant="neutral" {...rest}>
      {L.idle}
    </Badge>
  );
}
