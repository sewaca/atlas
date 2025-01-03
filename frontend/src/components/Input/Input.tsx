import { $, component$, useSignal } from "@builder.io/qwik";
import styles from "./Input.module.css";

type Props = {
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
};
export const Input = component$(({ label, name, onChange }: Props) => {
  const value = useSignal("");

  const handleChange = $((_: InputEvent, element: HTMLInputElement) => {
    value.value = element.value;
    onChange?.(element.value);
  });

  return (
    <div class={styles.inputBase}> 
        {label ? <label class={styles.label}>{label}</label> : null}
      <input class={styles.input} onInput$={handleChange} name={name} />
    </div>
  );
});
