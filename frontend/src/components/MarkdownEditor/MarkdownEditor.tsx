"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

type Props = {
  initialValue?: string;
  onChange?: (value: string) => void;
};
export const MarkdownEditor = ({ initialValue = "", onChange }: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <MDEditor
      value={value}
      onChange={(a) => {
        onChange?.(a || "");
        setValue(a || "");
      }}
      style={{ width: "100%", minHeight: "400px" }}
    />
  );
};
