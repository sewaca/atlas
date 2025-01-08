"use client";

import { Button } from "~/components/Button/Button";
import { deletePostAction } from "./action";

export const DeletePostButton = ({id}: {id: number}) => {
  
  const handleClick = async () => {
    const res = await deletePostAction(id);
    alert(res ? "success" : "fail");
    if (res) window.location.href = "/";
  }

  return <Button variant="secondary" onClick={handleClick}>Delete</Button>
}