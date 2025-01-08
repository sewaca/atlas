"use client"

import { useRef } from "react";
import { Button } from "~/components/Button/Button";
import { MarkdownEditor } from "~/components/MarkdownEditor/MarkdownEditor";
import { Spacer } from "~/components/Spacer/Spacer";

const INITIAL_TEXT = "**Nice day to share something with the world!**";

export default function Page() {
  const userdata = useRef({ content: INITIAL_TEXT });

  return (
    <>
      <h1>Editor: </h1>
      <Spacer size={12} />
      <MarkdownEditor initialValue={INITIAL_TEXT} onChange={(a) => (userdata.current.content = a)} />
      <Spacer size={7} />
      <Button onClick={() => console.log(userdata.current)}>Save</Button>
    </>
  );
}
