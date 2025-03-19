"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get auth parameters from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const provider = hashParams.get("provider");

        if (accessToken || refreshToken) {
          // If tokens are present, store them and redirect
          await supabase.auth.setSession({
            access_token: accessToken || "",
            refresh_token: refreshToken || "",
          });

          // Get user details
          const { data } = await supabase.auth.getUser();

          if (data?.user) {
            // Create or update user profile in the database
            const { error: profileError } = await supabase
              .from("users")
              .upsert({
                id: data.user.id,
                email: data.user.email || "",
                name: data.user.user_metadata.name || data.user.user_metadata.full_name || "",
                avatar_url: data.user.user_metadata.avatar_url || null,
                created_at: new Date().toISOString(),
              }, { onConflict: 'id' });

            if (profileError) {
              console.error("Error creating user profile:", profileError);
            }
          }

          // Redirect to profile page
          router.push("/profile");
        } else {
          // If no tokens found, redirect to sign in page
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/auth/signin");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="container flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <h1 className="text-2xl font-bold mb-2">Completing your sign-in...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
