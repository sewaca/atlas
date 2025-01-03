import { component$, useSignal } from "@builder.io/qwik";

import "./app.css";
import { Button } from "./components/Button/Button";

export const App = component$(() => {
  const count = useSignal(0);

  return (
    <>
      <Button onClick={() => count.value++}> {count} </Button>
    </>
  );
});
