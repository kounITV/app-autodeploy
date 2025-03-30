/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements-per-line */
/* eslint-disable complexity */
"use client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(30), 200)
    const timer2 = setTimeout(() => setProgress(60), 600)
    const timer3 = setTimeout(() => setProgress(90), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (status === "loading") { return; }

    const isTokenExpired = !status || status === "unauthenticated";

    if (status === "authenticated" && !session?.user?.accessToken) {
      router.push("/login");
    }

    if (isTokenExpired && !isPublicRoute) {
      router.push("/login");
    }
    const role = session?.user?.role;

    if (requireAuth) {
      if (status === "unauthenticated" && !isPublicRoute) {
        router.push(`/login`);
      } else if (status === "authenticated" && isPublicRoute && session?.user?.accessToken && role === "VERSIFICATION_OFFICER") {
        router.push("/scanner");
      } else if (status === "authenticated" && isPublicRoute && session?.user?.accessToken) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [pathname, status, requireAuth, isPublicRoute, session]);
  const getProgressMessage = (progress: number): string => {
    if (progress < 30) {
      return "ກຳລັງເຊື່ອມຕໍ່...";
    } else if (progress < 60) {
      return "ກຳລັງໂຫຼດຂໍ້ມູນ...";
    } else if (progress < 90) {
      return "ໃກ້ສຳເລັດແລ້ວ...";
    }
    return "ຈັດການສຸດທ້າຍ...";
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-6 max-w-[400px] text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">ກຳລັງໂຫຼດ ຂໍ້ມູນຂອງທ່ານ...</h3>
            <p className="text-sm text-muted-foreground">ກະລຸນາລໍຖ້າ ພວກເຮົາກຳລັງຈັດການທຸກຢ່າງໃຫ້ພ້ອມ!</p>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary animate-pulse" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {getProgressMessage(progress)}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
