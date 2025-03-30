"use client";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { type Actions, type Subjects } from "../../setting/interface";
import { useAbility } from "./context";
interface RoleBasedGuardProps {
  children: ReactNode;
  subject: Subjects;
  action: Actions;
  fallback?: ReactNode;
}
export function RoleBasedGuard({ children, subject, action, fallback }: RoleBasedGuardProps) {
  const ability = useAbility();
  if (!ability.can(action, subject)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect("/unauthorized");
  }
  return <>{children}</>;
}
