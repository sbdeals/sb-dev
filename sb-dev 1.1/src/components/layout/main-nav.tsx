"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/restaurants",
      label: "Restaurants",
      active: pathname.startsWith("/restaurants"),
    },
    {
      href: "/deals",
      label: "Deals",
      active: pathname === "/deals",
    },
    {
      href: "/profile",
      label: "My Account",
      active: pathname.startsWith("/profile"),
    },
  ]

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors whitespace-nowrap min-w-[100px] text-center px-2 py-1",
            route.active
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
