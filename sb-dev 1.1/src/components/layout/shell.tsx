import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface ShellProps {
  children: React.ReactNode
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export function Shell({ children, user }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
