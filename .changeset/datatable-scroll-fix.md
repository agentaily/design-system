---
"@agentaily/design-system": patch
---

DataTable 宽表横滚时分页脚/表头漂移修复:表头 `thead th` 改为 `position: sticky`(横滚列对齐、纵滚留顶),分页脚 `.ax-datatable__foot` 移出横向滚动容器(变为新增 `.ax-datatable-box` 外壳下、`.ax-datatable-wrap` 的兄弟节点)并加背景,横滚不再漂移。纯 CSS/DOM seam 修复,props/API 不变。
