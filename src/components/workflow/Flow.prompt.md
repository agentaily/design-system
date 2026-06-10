Node-graph workflow canvas. Position Nodes with x/y; draw links in Canvas's `edges` slot using Edge/Connection (Connection animates).

```jsx
<Canvas edges={<><Edge from={{x:140,y:60}} to={{x:220,y:120}} /><Connection from={{x:220,y:120}} to={{x:340,y:90}} label="stream" /></>}>
  <Node x={20} y={40} title="input" status="ok">User message</Node>
  <Node x={220} y={90} title="llm" status="warn">agentaily-2</Node>
  <Controls /><Panel position="top-right"><Toolbar><button>+</button></Toolbar></Panel>
</Canvas>
```

Exports: Canvas, Node, Edge, Connection, Controls, Panel, Toolbar.
