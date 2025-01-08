"use server";

import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
  UserData,
  mapUserDataRole,
  Role
} from "./types";

const ServerAuthorizationManager = {
  async hasAuthCookie() {
    const cookieManager = await cookies();
    const token = cookieManager.get(AUTH_COOKIE_NAME)?.value;
    return Boolean(token);
  },

  async getAuthCookie() {
    const cookieManager = await cookies();
    return cookieManager.get(AUTH_COOKIE_NAME)?.value;
  },

  async login(token: string) {
    const cookieManager = await cookies();
    cookieManager.set(AUTH_COOKIE_NAME, token, {
      maxAge: AUTH_COOKIE_MAX_AGE,
    });
  },

  async logout() {
    try {
      const cookieManager = await cookies();
      cookieManager.delete(AUTH_COOKIE_NAME);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
    }
  },

  // TODO: возможно стоит добавить проверку валидности токена.
  async _parseUserData(): Promise<UserData | null> {
    const cookieManager = await cookies();
    const token = cookieManager.get(AUTH_COOKIE_NAME)?.value;
    
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
  },

  async getUserRole(): Promise<Role> {
    const userdata = await this._parseUserData();
    if (!userdata) return Role.unauthorized;
    return userdata.role;
  },

  async getUsername(): Promise<string> {
    const userdata = await this._parseUserData();
    if (!userdata) return "";
    return userdata.username;
  },
};

export const ServerAuthorizationManagerWrapper = async () =>
  ServerAuthorizationManager;
