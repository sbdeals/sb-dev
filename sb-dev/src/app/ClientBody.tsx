"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "sonner";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body className={`min-h-screen bg-background ${mounted ? "antialiased" : ""}`} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </body>
  );
}
