"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChefHat,
  Home,
  ShoppingBag,
  User,
  UtensilsCrossed,
  Settings,
  Users,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "user" | "caterer" | "admin"
}

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/user", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Browse Caterers", href: "/caterers", icon: <UtensilsCrossed className="h-5 w-5" /> },
  { label: "My Orders", href: "/dashboard/user/orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { label: "Profile", href: "/dashboard/user/profile", icon: <User className="h-5 w-5" /> },
]

const catererNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/caterer", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Menu Items", href: "/dashboard/caterer/menu", icon: <UtensilsCrossed className="h-5 w-5" /> },
  { label: "Orders", href: "/dashboard/caterer/orders", icon: <ShoppingBag className="h-5 w-5" /> },
  { label: "Settings", href: "/dashboard/caterer/settings", icon: <Settings className="h-5 w-5" /> },
]

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="h-5 w-5" /> },
  { label: "Caterers", href: "/dashboard/admin/caterers", icon: <UtensilsCrossed className="h-5 w-5" /> },
  { label: "Orders", href: "/dashboard/admin/orders", icon: <ShoppingBag className="h-5 w-5" /> },
]

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems =
    role === "admin" ? adminNavItems : role === "caterer" ? catererNavItems : userNavItems

  const roleLabel = role === "admin" ? "Admin" : role === "caterer" ? "Caterer" : "User"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">caterHub</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-sidebar transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="hidden h-16 items-center gap-2 border-b px-6 lg:flex">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">catersHub</span>
            </Link>
          </div>

          {/* Role Badge */}
          <div className="border-b px-6 py-4 lg:mt-0 mt-16">
            <div className="rounded-lg bg-primary/10 px-3 py-2 text-center">
              <span className="text-sm font-medium text-primary">{roleLabel} Dashboard</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Back to Home */}
          <div className="border-t p-4">
            <Button variant="outline" className="w-full gap-2" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0">
        <div className="container mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
