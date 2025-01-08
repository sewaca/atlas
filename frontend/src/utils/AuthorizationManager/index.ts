import { ClientAuthorizationManager } from "./ClientAuthorizationManager";
import { ServerAuthorizationManager } from "./ServerAuthorizationManager";

export const AuthorizationManager =
  typeof window === "undefined"
    ? ServerAuthorizationManager
    : ClientAuthorizationManager;

export * from "./types";
