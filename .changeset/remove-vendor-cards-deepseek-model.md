---
"@agentaily/design-system": minor
---

移除厂商专用连接卡并精简 DeepSeekCard —— **破坏性变更**(下游需迁移;`0.x` 约定故走 minor)。

- **移除 `FeishuCard`**(连同导出的 `parseFeishuLink` 助手):厂商专用、不通用。
- **移除 `IntegrationSettings`**(及其别名 `ServiceConnections`):把就绪栏 / 校验 / 持久化固化进组件,过度业务化。集成分区现由调用方自行组合(例如一个装着连接卡的 `<PageSection>`),保存归容器 footer 的 `<SettingsSaveBar>`。
- **`DeepSeekCard` 去掉「对话模型」选择**:移除 props `model` / `onModelChange` / `models` 与类型 `DeepSeekModelOption`,以及卡片内的 model `<Select>`。展开后从 API KEY 字段直接到「如何获取 DeepSeek API Key?」帮助。

下游迁移:用通用 `ConnectionCard` 组合自己的服务卡(`DeepSeekCard` 即如此),集成屏的就绪栏 / 保存 / 门禁由调用方拥有;不再传 `model` 相关 props 给 `DeepSeekCard`。
