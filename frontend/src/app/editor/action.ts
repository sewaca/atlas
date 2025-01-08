"use server";

import { BackendService, PostInfo } from "~/services/BackendService";


export const createPostAction = async (
  postdata: Omit<PostInfo, "id" | "author">
) => {
  return await BackendService.createPost(postdata);
};
