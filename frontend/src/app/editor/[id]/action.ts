"use server";

import { BackendService } from "~/services/BackendService";

export const editPostRequest = async (id: number, body: string) => {
  const res = await BackendService.editPost({ body, postId: id });
  return res;
};
