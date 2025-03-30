"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./components/containers";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const role = session?.user?.role;

  useEffect(() => {
    if (status !== "loading") {
      if (status === "unauthenticated") {
        router.push("/login");
      } else if (status === "authenticated" && role === "VERSIFICATION_OFFICER") {
        router.push("/barcode");
      }
      else if (status === "authenticated") {
        router.push("/dashboard");
      }
    }
  }, [status, role, router]);

  if (status === "loading") {
    return <Loading />;
  }
  return <></>;
}
