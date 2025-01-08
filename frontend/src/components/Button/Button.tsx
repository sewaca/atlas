"use client";

import styles from "./Button.module.css";
import { cx } from "../../utils/cx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({
  variant = "primary",
  disabled,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={cx(styles.button, className, styles[variant], {
        [styles.disabled]: disabled,
      })}
    >
      {children}
    </button>
  );
};
