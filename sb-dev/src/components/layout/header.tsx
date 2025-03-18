"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { MainNav } from "@/components/layout/main-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { UserAccountNav } from "@/components/layout/user-account-nav"

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <MainNav className="mx-8" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
