"use client"

import { useSession } from "next-auth/react"
import { UserNav } from "@/components/containers"
import { roleLabels } from "src/app/(protected)/user/container/table/columns"
import type { RoleLabels } from "src/app/(protected)/user/container/interface"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui"

export function UserCard({ isCollapsed }: { isCollapsed?: boolean }) {
    const { data: session } = useSession()
    const { firstName, role, username } = session?.user ?? {}
    const getRoleLabel = roleLabels[role as keyof RoleLabels]

    return (
        <div className="hidden sm:block">
            {isCollapsed && (
                <div className="bg-card p-1 text-card-foreground pl-3">
                <UserNav />

                </div>
            )}
            {!isCollapsed && (
                <div>
                    <Separator/>
                    <div className="flex items-center justify-between w-full  bg-card p-1 text-card-foreground ">
                        <div className="flex items-center gap-3 m-1">
                            <div className="flex-shrink-0">
                                <UserNav />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="font-medium truncate">{firstName || "User"}</p>
                                <Badge variant={"outline"}>{role && <p className="text-xs text-muted-foreground mt-1 truncate">{username}: {getRoleLabel}</p>}</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

