import React from "react";
import { FileTree } from "./FileTree.jsx";

export default {
  title: "Code/FileTree",
  component: FileTree,
};

const tree = [
  {
    name: "src",
    type: "dir",
    children: [
      {
        name: "components",
        type: "dir",
        children: [
          { name: "App.jsx", path: "src/components/App.jsx", status: "mod" },
          { name: "Composer.jsx", path: "src/components/Composer.jsx", status: "add" },
        ],
      },
      { name: "index.js", path: "src/index.js" },
      { name: "styles.css", path: "src/styles.css", status: "del" },
    ],
  },
  { name: "package.json", path: "package.json" },
  { name: "README.md", path: "README.md" },
];

export const Default = {
  render: () => {
    const [active, setActive] = React.useState("src/components/App.jsx");
    return (
      <div style={{ maxWidth: 300 }}>
        <FileTree tree={tree} activePath={active} onSelect={setActive} />
      </div>
    );
  },
};

export const GitStatusBadges = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <FileTree
        tree={[
          {
            name: "src",
            type: "dir",
            children: [
              { name: "App.jsx", path: "src/App.jsx", status: "mod" },
              { name: "VoicePanel.jsx", path: "src/VoicePanel.jsx", status: "add" },
              { name: "legacy.js", path: "src/legacy.js", status: "del" },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const CollapsedFolder = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <FileTree
        tree={[
          {
            name: "node_modules",
            type: "dir",
            defaultOpen: false,
            children: [{ name: "react", type: "dir", defaultOpen: false, children: [] }],
          },
          {
            name: "src",
            type: "dir",
            children: [{ name: "index.js", path: "src/index.js" }],
          },
        ]}
        activePath="src/index.js"
      />
    </div>
  ),
};
