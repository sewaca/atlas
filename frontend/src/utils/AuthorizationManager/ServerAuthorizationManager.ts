import {
  hasAuthCookie,
  getAuthCookie,
  login,
  logout,
  _parseUserData,
  getUserRole,
  getUsername,
} from "./ServerAuthorizationManagerActions";

export class ServerAuthorizationManager {
  private static _parseUserData = _parseUserData;
  public static hasAuthCookie = hasAuthCookie;
  public static getAuthCookie = getAuthCookie;
  public static login = login;
  public static logout = logout;
  public static getUserRole = getUserRole;
  public static getUsername = getUsername;
}
