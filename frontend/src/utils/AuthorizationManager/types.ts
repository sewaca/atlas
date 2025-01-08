export const AUTH_COOKIE_NAME = "authtoken";
export const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export enum Role {
  unauthorized = 0,
  user = 1,
  manager = 2,
  admin = 3,
}

export const mapUserDataRole: Record<string, Role> = {
  admin: Role.admin,
  manager: Role.manager,
  user: Role.user,
};

export type UserData = {
  id: string;
  role: Role;
  username: string;
};
