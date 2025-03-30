"use client";

import { useSession } from "next-auth/react";

export function getUserRole() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  return role;
}

export function getOfficeIds() {
  const { data: session } = useSession();
  const newUserOffice = session?.user.userOffice?.map((item) => item.officeId).join(",");
  return newUserOffice;
}

export function getOfficeId() {
  const { data: session } = useSession();
  const newOfficeId = Number(session?.user.officeId)
  return newOfficeId as number
}
