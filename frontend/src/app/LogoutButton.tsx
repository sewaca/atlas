"use client";

import Link from "next/link";
import { ClientAuthorizationManager } from "~/utils/AuthorizationManager/ClientAuthorizationManager";

export const LogoutButton = () => {
  const handleClick = async () => {
    await ClientAuthorizationManager.logout();
    window.location.reload();
  };

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      href="#"
    >
      Logout
    </Link>
  );
};
