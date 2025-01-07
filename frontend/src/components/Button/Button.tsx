"use client";

import styles from "./Button.module.css";
import { cx } from "../../utils/cx";
import { ReactNode } from "react";

type Props = {
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: ReactNode;
};
export const Button = (
  ({ onClick, variant = "primary", disabled, children }: Props) => {
    return (
      <button
        className={cx(styles.button, styles[variant], {
          [styles.disabled]: disabled,
        })}
        onClick={() => onClick?.()}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
