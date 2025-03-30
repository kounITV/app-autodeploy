"use client"

import { CircleUserRound } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "../../ui"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user_Icon.png" alt="@shadcn" />
            <AvatarFallback><CircleUserRound /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {UserInfoLabel()}
        {LogoutContainer()}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserInfoLabel() {
  const { data: session } = useSession()
  const { firstName, phone } = session?.user ?? {}
  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{firstName ?? ""}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {phone ?? ""}
        </p>
      </div>
    </DropdownMenuLabel>
  )
}

export default function LogoutContainer() {
  const loginPath = process.env.NEXT_PUBLIC_NEXTAUTH_URL || ""
  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      })
      window.location.href = `${loginPath}/login`;
    } catch (error) {
    }
  }
  return (
    <button onClick={handleLogout} className="w-full">
      <DropdownMenuItem>
        <span>Sign out</span>
        <DropdownMenuShortcut></DropdownMenuShortcut>
      </DropdownMenuItem>
    </button>
  )
}
