"use client";

import { useRef } from "react";
import { Button } from "~/components/Button/Button";
import { MarkdownEditor } from "~/components/MarkdownEditor/MarkdownEditor";
import { Spacer } from "~/components/Spacer/Spacer";
import { editPostRequest } from "./action";

type Props = { initvalue: string; id: number };
export const ClientPart = ({ id, initvalue }: Props) => {
  const userdata = useRef({ content: initvalue });

  const handleConfirmation = async () => {
    const res = (await editPostRequest(id, userdata.current.content)) === true;
    alert(res ? "success" : "fail");
    if (res) window.location.href = `/post/${id}`;
  };

  return (
    <>
      <MarkdownEditor
        initialValue={initvalue}
        onChange={(a) => (userdata.current.content = a)}
      />
      <Spacer size={7} />
      <Button onClick={handleConfirmation}>Save</Button>
    </>
  );
};
