import { ClientAuthorizationManager } from "./ClientAuthorizationManager";
import { ServerAuthorizationManagerWrapper } from "./ServerAuthorizationManager";

// TODO: looks like this switch doesn't work properly
export const AuthorizationManager =
  typeof window === "undefined"
    ? await ServerAuthorizationManagerWrapper()
    : ClientAuthorizationManager;

export * from "./types";
