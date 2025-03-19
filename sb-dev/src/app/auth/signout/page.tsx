"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    };

    signOut();
  }, [router]);

  return (
    <div className="container flex items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Signing you out...</h1>
        <p className="text-muted-foreground">Please wait while we sign you out.</p>
      </div>
    </div>
  );
}
