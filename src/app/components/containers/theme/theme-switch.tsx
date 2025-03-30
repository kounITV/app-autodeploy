"use client";

import { cn } from "@/lib/utils";
import { IconCheck, IconMoon, IconSun } from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Switch
} from "../../ui";
import { Button } from "../button";
import { useTheme } from "./theme-provider";

export function ThemeSwitchDropdown() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const themeColor = theme === "light" ? "#fff" : "#020817";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="scale-95 rounded-full">
            <IconSun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IconMoon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light{" "}
            <IconCheck
              size={14}
              className={cn("ml-auto", theme !== "light" && "hidden")}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
            <IconCheck
              size={14}
              className={cn("ml-auto", theme !== "dark" && "hidden")}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
            <IconCheck
              size={14}
              className={cn("ml-auto", theme !== "system" && "hidden")}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  );
}

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeColor = theme === "light" ? "#fff" : "#020817";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  const isDarkMode = theme === "dark";

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div>
      <div className="relative inline-grid h-8 w-16 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id="switch-13"
          checked={isDarkMode}
          onCheckedChange={handleThemeChange}
          className="peer absolute inset-0 h-[inherit] w-auto data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <Moon size={16} strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <Sun size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor="switch-13" className="sr-only">
        Labeled switch
      </Label>
    </div>

  );
}


export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeColor = theme === "light" ? "#fff" : "#020817";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  const isDarkMode = theme === "dark";

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };


  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id="switch-14"
          checked={isDarkMode}
          onCheckedChange={handleThemeChange}
          className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">Light</span>
        </span>
        <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <span className="text-[10px] font-medium uppercase">Dark</span>
        </span>
      </div>
      <Label htmlFor="switch-14" className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
