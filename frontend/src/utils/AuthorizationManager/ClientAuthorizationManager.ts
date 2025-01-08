import cookieCutter from "@boiseitguru/cookie-cutter";
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  mapUserDataRole,
  Role,
  UserData,
} from "./types";

export class ClientAuthorizationManager {
  public static async hasAuthCookie() {
    return Boolean(cookieCutter.get("AUTH_COOKIE_NAME"));
  }

  public static async getAuthCookie() {
    return cookieCutter.get("AUTH_COOKIE_NAME");
  }

  public static async login(token: string) {
    cookieCutter.set(AUTH_COOKIE_NAME, token, {
      expires: new Date(Date.now() + AUTH_COOKIE_MAX_AGE * 1000),
    });
  }

  public static async logout() {
    cookieCutter.set(AUTH_COOKIE_NAME, "");
  }

  // TODO: возможно стоит добавить проверку валидности токена.
  private static async _parseUserData(): Promise<UserData | null> {
    const token = cookieCutter.get(AUTH_COOKIE_NAME);

    try {
      const userdata = JSON.parse(atob((token || "").split(".")[1]));
      return {
        id: userdata.id,
        role:
          userdata.role in mapUserDataRole
            ? mapUserDataRole[userdata.role]
            : Role.unauthorized,
        username: userdata.username,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      await this.logout();
      return null;
    }
  }

  public static async getUserRole(): Promise<Role> {
    const userdata = await this._parseUserData();
    if (!userdata) return Role.unauthorized;
    return userdata.role;
  }

  public static async getUsername(): Promise<string> {
    const userdata = await this._parseUserData();
    if (!userdata) return "";
    return userdata.username;
  }
}
