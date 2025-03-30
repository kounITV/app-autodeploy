"use client"
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useAbility } from "@/lib/ability"
import { type IResources, resources } from "@/setting/resources"
import { Button } from "../button"
import { Layout } from "../layout"
import Nav from "./nav"
import { UserCard } from "./user-card";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

function useNavState() {
  const [navOpened, setNavOpened] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", navOpened)
  }, [navOpened])

  return { navOpened, setNavOpened }
}

function useFilteredResources(ability: any, resources: IResources[]) {
  const filterLinks = (links: IResources[]): IResources[] => {
    return links
      .map((link) => {
        const filteredSub = link.sub ? filterLinks(link.sub) : undefined;
        const canAccessParent = ability.can("read", link.subject);
        const canAccessSub = filteredSub && filteredSub.length > 0;
        return canAccessParent || canAccessSub
          ? { ...link, sub: filteredSub }
          : null;
      })
      .filter(Boolean) as IResources[];
  };
  return filterLinks(resources);
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {

  const ability = useAbility()
  const { navOpened, setNavOpened } = useNavState()
  const filteredLinks = useFilteredResources(ability, resources)
  return (
    <aside
      className={cn(
        `fixed left-0  right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh  ${isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className,
      )}
    >
      {navOpened && (
        <div
          onClick={() => { setNavOpened(false); }}
          className="absolute  inset-0 h-svh w-full bg-black opacity-50 transition-[opacity] duration-700 md:hidden "
        />
      )}
      <Layout fixed className={navOpened ? "h-svh" : ""}>
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4 "
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <Image
              src="/police_logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? "invisible w-0" : "visible w-auto"
                }`}
            >
              <span className="font-medium">ບັດຢັ້ງຢືນການພັກເຊົາຊົ່ວຄາວ</span>
              <span className="text-xs">LIT Solution</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => { setNavOpened((prev) => !prev); }}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>
        <Nav
          id="sidebar-menu"
          className={`text- z-40 h-full flex-1 overflow-auto ${navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"}`}
          closeNav={() => { setNavOpened(false); }}
          isCollapsed={isCollapsed}
          links={filteredLinks}
        />
        <Button
          onClick={() => { setIsCollapsed((prev) => !prev); }}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
        <UserCard isCollapsed={isCollapsed}/>
      </Layout>
    </aside>
  )
}
