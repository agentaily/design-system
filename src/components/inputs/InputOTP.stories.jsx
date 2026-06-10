import React from "react";
import { InputOTP } from "./InputOTP.jsx";

export default {
  title: "Inputs/InputOTP",
  component: InputOTP,
};

export const Default = {
  render: () => {
    const [code, setCode] = React.useState("");
    return <InputOTP length={6} groupSize={3} value={code} onChange={setCode} />;
  },
};

export const FourDigits = {
  render: () => {
    const [code, setCode] = React.useState("");
    return <InputOTP length={4} value={code} onChange={setCode} />;
  },
};

export const Prefilled = {
  render: () => {
    const [code, setCode] = React.useState("402");
    return <InputOTP length={6} groupSize={3} value={code} onChange={setCode} />;
  },
};
