"use client";

import { InputHTMLAttributes } from "react";
import styles from "./FileInput.module.css";
import { cx } from "~/utils/cx";

type Props = {
  label?: string;
  onChange?: (value: File | null) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;
export const FileInput = ({ label, onChange, className, ...rest }: Props) => {
  return (
    <div className={styles.inputBase}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <div className={styles.inputWrapper}>
        <input
        {...rest}
        type="file"
        className={cx(styles.input, className)}
        onChange={(e) => onChange?.(e.target.files ? e.target.files[0] : null)}
      /></div>
    </div>
  );
};
