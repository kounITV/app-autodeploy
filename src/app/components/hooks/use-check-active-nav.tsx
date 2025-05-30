"use client";
import { usePathname } from "next/navigation";

export default function useCheckActiveNav() {
  const pathname = usePathname();

  const checkActiveNav = (nav: string) => {
    if (!pathname) return false;

    if (nav === "/" && pathname === "/") {
      return true;
    }

    if (pathname.match(/^\/application\/create\/\d+\/NEW$/)) {
      return nav === "/application";
    }

    if (pathname.match(/^\/application\/create\/\d+\/RENEW$/)) {
      return nav === "/renew";
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const cleanNav = nav.replace(/^\//, "");

    return pathSegments[0] === cleanNav;
  };

  return { checkActiveNav };
}
