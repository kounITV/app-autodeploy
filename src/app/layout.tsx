"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

import AuthGuard from "./lib/ability/guard";

import { Toaster, ToastProvider } from "./components/ui";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ToastProvider>
            <Toaster />
            <AuthGuard>{children}</AuthGuard>
          </ToastProvider>
        </body>
      </html>
    </SessionProvider>
  );
}