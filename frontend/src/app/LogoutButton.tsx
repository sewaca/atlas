"use client";

import Link from "next/link";
import { AuthorizationManager } from "~/utils/AuthorizationManager";

export const LogoutButton = () => {
  const handleClick = async () => {
    await AuthorizationManager.logout();
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
