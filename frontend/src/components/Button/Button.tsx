import { component$, Slot } from "@builder.io/qwik";

import styles from "./Button.module.css";
import { cx } from "../../utils/cx";

type Props = {
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};
export const Button = component$(
  ({ onClick, variant = "primary", disabled }: Props) => {
    return (
      <button
        class={cx(styles.button, styles[variant], {
          [styles.disabled]: disabled,
        })}
        onClick$={() => onClick?.()}
        disabled={disabled}
      >
        <Slot />
      </button>
    );
  }
);
