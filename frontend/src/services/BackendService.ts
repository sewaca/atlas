import { redirect } from "next/navigation";
import { AuthorizationManager } from "~/utils/AuthorizationManager";

type AuthProps = { username: string; password: string };

export type PostInfo = {
  id: number;
  title: string;
  body: string;
  image: string;
  author: string;
};

const BACKEND_HOST = process.env.BACKEND_HOST || "localhost";
const BACKEND_PORT = process.env.BACKEND_PORT || "5000";

export class BackendService {
  private static async _fetcher(path: string, options?: RequestInit) {
    const authcookie = await AuthorizationManager.getAuthCookie();

    const res = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/${path}`, {
      method: options?.method || "GET",
      body: options?.body,
      credentials: "include",
      headers: {
        ...(options?.headers || {}),
        Authorization: authcookie,
        "Content-Type": "application/json",
      } as HeadersInit,
    });

    if (res.ok) return await res.json();

    if (res.status === 401) {
      await AuthorizationManager.logout();
      redirect("/auth?redirected=true");
    }

    return res.status;
  }

  public static async login({ username, password }: AuthProps) {
    const token = await this._fetcher("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (token.includes("Bearer")) {
      await AuthorizationManager.login(token);
      return true;
    }
    return false;
  }

  public static async register({ username, password }: AuthProps) {
    const token = await this._fetcher("api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (token.includes("Bearer")) {
      await AuthorizationManager.login(token);
      return true;
    }
    return false;
  }

  public static async getPostById({ id }: { id: number }) {
    const res: PostInfo = await this._fetcher(`api/post/id/${id}`);
    return res;
  }

  public static async getPostsByAuthor({ author }: { author: string }) {
    const res: PostInfo[] | number = await this._fetcher(
      `api/post/author/${author}`
    );
    return res;
  }

  public static async getPostsPage({ page = 0 }) {
    const res: PostInfo[] | number = await this._fetcher(
      `api/post/get?page=${page}`
    );
    return res;
  }

  public static async editPost({
    body,
    postId,
  }: {
    postId: number;
    body: string;
  }) {
    return await this._fetcher(`api/post/edit/${postId}`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
  }

  public static async deletePost({ id }: { id: number }): Promise<boolean> {
    return await this._fetcher(`api/post/delete/${id}`, {
      method: "DELETE",
    });
  }

  public static async createPost({
    body,
    title,
    image,
  }: Omit<PostInfo, "id" | "author">) {
    return await this._fetcher(`api/post/create`, {
      method: "POST",
      body: JSON.stringify({ image, title, body }),
    });
  }
}
