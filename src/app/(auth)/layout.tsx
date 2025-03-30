import AuthGuard from "@/lib/ability/guard";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>;
}
