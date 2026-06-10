import React from "react";
import { Canvas, Node, Edge, Connection, Controls, Panel, Toolbar } from "./Flow.jsx";

export default {
  title: "Workflow/Flow",
  component: Canvas,
};

const Plus = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"></path>
  </svg>
);
const Minus = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
  </svg>
);
const Frame = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"></path>
  </svg>
);

export const Pipeline = {
  render: () => (
    <div style={{ width: 640 }}>
      <Canvas
        style={{ height: 400 }}
        edges={
          <React.Fragment>
            <Edge from={{ x: 154, y: 181 }} to={{ x: 210, y: 91 }} />
            <Edge from={{ x: 154, y: 181 }} to={{ x: 210, y: 271 }} />
            <Edge from={{ x: 340, y: 91 }} to={{ x: 420, y: 181 }} label="12 docs" />
            <Connection from={{ x: 340, y: 271 }} to={{ x: 420, y: 181 }} label="stream" />
          </React.Fragment>
        }
      >
        <Node x={24} y={150} title="input" status="ok">
          User message
        </Node>
        <Node x={210} y={60} title="retrieve" status="ok">
          12 docs · 0.2s
        </Node>
        <Node x={210} y={240} title="llm" status="warn">
          agentaily-2
        </Node>
        <Node x={420} y={150} title="output">
          Streamed reply
        </Node>
        <Controls />
        <Panel position="top-right">
          <Toolbar>
            <button className="ax-flow-toolbar__btn" aria-label="Add node">{Plus}</button>
            <button className="ax-flow-toolbar__btn" aria-label="Remove node">{Minus}</button>
            <span className="ax-flow-toolbar__sep"></span>
            <button className="ax-flow-toolbar__btn" aria-label="Fit view">{Frame}</button>
          </Toolbar>
        </Panel>
      </Canvas>
    </div>
  ),
};

export const NodeStates = {
  render: () => (
    <div style={{ width: 640 }}>
      <Canvas>
        <Node x={24} y={40} title="ok" status="ok">
          Finished in 0.4s
        </Node>
        <Node x={200} y={40} title="warn" status="warn">
          Retrying, attempt 2 of 3
        </Node>
        <Node x={400} y={40} title="no status">
          Queued
        </Node>
        <Node x={24} y={160} title="selected" status="ok" selected>
          Click target
        </Node>
        <Node x={200} y={160} title="no ports" ports={false}>
          Annotation only
        </Node>
      </Canvas>
    </div>
  ),
};

export const EdgesAndConnections = {
  render: () => (
    <div style={{ width: 640 }}>
      <Canvas
        edges={
          <React.Fragment>
            <Edge from={{ x: 154, y: 91 }} to={{ x: 420, y: 91 }} label="static" />
            <Connection from={{ x: 154, y: 211 }} to={{ x: 420, y: 211 }} label="animated" />
          </React.Fragment>
        }
      >
        <Node x={24} y={60} title="a">
          Done
        </Node>
        <Node x={420} y={60} title="b">
          Done
        </Node>
        <Node x={24} y={180} title="c" status="warn">
          In progress
        </Node>
        <Node x={420} y={180} title="d">
          Waiting
        </Node>
      </Canvas>
    </div>
  ),
};

export const InteractiveSelection = {
  render: () => {
    const [selected, setSelected] = React.useState("plan");
    const nodes = [
      { id: "plan", x: 24, y: 60, title: "plan", body: "3 steps" },
      { id: "execute", x: 220, y: 130, title: "execute", body: "Step 2 of 3", status: "warn" },
      { id: "report", x: 420, y: 60, title: "report", body: "Pending" },
    ];
    return (
      <div style={{ width: 640 }}>
        <Canvas
          edges={
            <React.Fragment>
              <Edge from={{ x: 154, y: 91 }} to={{ x: 220, y: 161 }} />
              <Connection from={{ x: 350, y: 161 }} to={{ x: 420, y: 91 }} />
            </React.Fragment>
          }
        >
          {nodes.map((n) => (
            <Node
              key={n.id}
              x={n.x}
              y={n.y}
              title={n.title}
              status={n.status}
              selected={selected === n.id}
              onClick={() => setSelected(n.id)}
              style={{ cursor: "pointer" }}
            >
              {n.body}
            </Node>
          ))}
          <Controls orientation="horizontal" />
          <Panel position="top-left">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
              selected: {selected}
            </span>
          </Panel>
        </Canvas>
      </div>
    );
  },
};
