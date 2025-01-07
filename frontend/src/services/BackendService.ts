import { cookies } from "next/headers";
import { CookieManager } from "../utils/CookieManager";

type AuthProps = { username: string; password: string };
type PostInfo = {
  id: number;
  title: string;
  body: string;
  image: string;
  author: string;
};

export class BackendService {
  private async _fetcher(path: string, options?: RequestInit) {
    const cookieStore = await cookies();
    const authcookie = cookieStore.get("authtoken")?.value;

    return fetch(`http://localhost:5000/${path}`, {
      method: options?.method || "GET",
      body: options?.body,
      credentials: "include",
      headers: {
        ...(options?.headers || {}),
        Authorization: authcookie,
        "Content-Type": "application/json",
      } as HeadersInit,
    }).then((res) => (res.ok ? res.json() : res.status));
    // TODO: Добавить общий обработчик для 401 ошибок
  }

  public async login({ username, password }: AuthProps) {
    const res = await this._fetcher("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (res.includes("Bearer")) {
      CookieManager.setCookie("authtoken", res);
      return true;
    }
    return false;
  }

  public async register({ username, password }: AuthProps) {
    const res = await this._fetcher("api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (res.includes("Bearer")) {
      CookieManager.setCookie("authtoken", res);
      return true;
    }
    return false;
  }

  public async getPostById({ id }: { id: number }) {
    const res: PostInfo = await this._fetcher(`api/post/id/${id}`);
    return res;
  }

  public async getPostsByAuthor({ author }: { author: string }) {
    const res: PostInfo[] | number = await this._fetcher(
      `api/post/author/${author}`
    );
    return res;
  }

  public async getPostsPage({ page = 0 }) {
    const res: PostInfo[] | number = await this._fetcher(
      `api/post/get?page=${page}`
    );
    return res;
  }
}
