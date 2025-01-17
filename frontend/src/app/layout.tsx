import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";
import { AuthorizationManager, Role } from "~/utils/AuthorizationManager";
import { LogoutButton } from "./LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple posts",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await AuthorizationManager.getUserRole();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <Link href="/">Main page</Link>
          {role === Role.unauthorized ? (
            <Link href="/auth">Sign In / Sign Up</Link>
          ) : (
            <>
              <Link href="/editor">Create post</Link>
              <LogoutButton />
            </>
          )}
        </header>
        <div className={styles.page}>{children}</div>
      </body>
    </html>
  );
}
