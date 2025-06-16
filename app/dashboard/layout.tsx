import type React from "react"
import {
  Calendar,
  Clock,
  LineChart,
  Plus,
  Settings,
  Share2,
  CreditCard,
  ImageIcon,
  BarChart2,
  Video,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <Share2 className="h-6 w-6" />
            <span className="font-bold">PostScheduler</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LineChart className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/calendar">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/queue">
                  <Clock className="h-4 w-4" />
                  <span>Queue</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/analytics">
                  <BarChart2 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/media">
                  <ImageIcon className="h-4 w-4" />
                  <span>Media</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/integrations">
                    <Share2 className="h-4 w-4" />
                    <span>Integrations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/billing">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/create-post">
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Text Post</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create-video-post">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Video Post</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="container">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
