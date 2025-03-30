import { type ReactNode } from "react"
import useIsCollapsed from "../../hooks/use-is-collapsed"
import Sidebar from "./sidebar"
import SkipToMain from "./skip-to-main"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className="relative h-full overflow-hidden ">
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 bg-white ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full `}
      >
        {children}
      </main>
    </div>
  )
}
