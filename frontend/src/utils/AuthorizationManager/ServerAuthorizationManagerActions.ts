"use server";

import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
  UserData,
  mapUserDataRole,
  Role,
} from "./types";

export const hasAuthCookie = async () => {
  const cookieManager = await cookies();
  const token = cookieManager.get(AUTH_COOKIE_NAME)?.value;
  return Boolean(token);
};

export const getAuthCookie = async () => {
  const cookieManager = await cookies();
  return cookieManager.get(AUTH_COOKIE_NAME)?.value;
};

export const login = async (token: string) => {
  const cookieManager = await cookies();
  cookieManager.set(AUTH_COOKIE_NAME, token, {
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
};

export const logout = async () => {
  try {
    const cookieManager = await cookies();
    cookieManager.delete(AUTH_COOKIE_NAME);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {}
};

// TODO: возможно стоит добавить проверку валидности токена.
export const _parseUserData = async (): Promise<UserData | null> => {
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
    await logout();
    return null;
  }
};

export const getUserRole = async (): Promise<Role> => {
  const userdata = await _parseUserData();
  if (!userdata) return Role.unauthorized;
  return userdata.role;
};

export const getUsername = async (): Promise<string> => {
  const userdata = await _parseUserData();
  if (!userdata) return "";
  return userdata.username;
};
