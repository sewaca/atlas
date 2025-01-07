"use client";

import { InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";
import { cx } from "~/utils/cx";

type Props = {
  label?: string;
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;
export const Input = ({ label, onChange, className, ...rest }: Props) => {

  const [value, setValue] = useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.inputBase}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input
        {...rest}
        className={cx(styles.input, className)}
        onChange={(e) => handleChange(e.currentTarget.value)}
        value={value}
      />
    </div>
  );
};
