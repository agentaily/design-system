import React from "react";
import { ButtonGroup } from "./ButtonGroup.jsx";
import { Button } from "./Button.jsx";

export default {
  title: "Buttons/ButtonGroup",
  component: ButtonGroup,
};

export const Horizontal = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const Vertical = {
  render: () => (
    <ButtonGroup vertical>
      <Button variant="secondary">Move up</Button>
      <Button variant="secondary">Move down</Button>
      <Button variant="secondary">Remove</Button>
    </ButtonGroup>
  ),
};
