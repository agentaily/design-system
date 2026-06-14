---
"@agentaily/design-system": minor
---

ConversationThread 透传 `onModelClick` 给内部 Composer:新增可选 prop `onModelClick?: () => void`,直接转发到内部 `<Composer>` 的模型 pill 点击回调。下游可直接拿到模型 pill 的点击回调去开模型选择菜单,不必再用 wrapper 截内部类 `.ax-composer__model`。纯新增 optional prop,向后兼容,其余 API 不变。
