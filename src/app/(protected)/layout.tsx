"use client";

import React from "react";
import { AppShell, Layout, ThemeProvider, UserNav } from "@/components/containers";
import AuthGuard from "@/lib/ability/guard";
import { queryClient } from "@/lib/interface";
import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider } from "../lib/ability/provider";
import { ChangelogVersion } from "@/components/containers/layout/changelog-version";

export default function ProtectedLayout({ children }: { children: React.ReactNode; }) {
  return (
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <AbilityProvider>
          <ThemeProvider defaultTheme="light" storageKey="ui-theme">
            <AppShell >
              <Layout className="">
                <Layout.Header className="">
                  <div className="flex flex-col sm:flex-row justify-between w-full">
                    <ChangelogVersion/>
                    <div className="flex items-center gap-x-2 ">
                      <UserNav />
                    </div>
                  </div>
                </Layout.Header>
                <Layout.Body>
                  {children}
                </Layout.Body>
              </Layout>
            </AppShell>
          </ThemeProvider>
        </AbilityProvider>
      </QueryClientProvider>
    </AuthGuard>
  );
}

