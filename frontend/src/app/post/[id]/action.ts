"use server";

import { BackendService } from "~/services/BackendService";

export const deletePostAction = async (id: number) => {
  const res = await BackendService.deletePost({ id });
  return res;
};
