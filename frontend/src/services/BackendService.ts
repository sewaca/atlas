import { redirect } from "next/navigation";
import { AuthorizationManager } from "~/utils/AuthorizationManager/index";

type AuthProps = { username: string; password: string };
type PostInfo = {
  id: number;
  title: string;
  body: string;
  image: string;
  author: string;
};

export class BackendService {
  private static async _fetcher(path: string, options?: RequestInit) {
    const authcookie = await AuthorizationManager.getAuthCookie();

    const res = await fetch(`http://localhost:5000/${path}`, {
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
}
