import React from "react";
import { Pagination } from "./Pagination.jsx";

export default {
  title: "Display/Pagination",
  component: Pagination,
  argTypes: {
    total: { control: { type: "number", min: 1 } },
  },
  args: { page: 1, total: 20 },
};

export const Default = {
  render: (args) => {
    const [page, setPage] = React.useState(args.page);
    return <Pagination {...args} page={page} onChange={setPage} />;
  },
};

export const FewPages = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return <Pagination page={page} total={5} onChange={setPage} />;
  },
};

export const MiddleTruncation = {
  render: () => {
    const [page, setPage] = React.useState(21);
    return <Pagination page={page} total={42} onChange={setPage} />;
  },
};

export const LastPage = {
  render: () => {
    const [page, setPage] = React.useState(20);
    return <Pagination page={page} total={20} onChange={setPage} />;
  },
};
