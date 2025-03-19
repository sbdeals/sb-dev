"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValues) {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      // Redirect to dashboard
      router.push("/profile");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithSocial(provider: 'google' | 'facebook') {
    setSocialLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error.message || `Failed to sign in with ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  }

  // This component adds visual spacing between social login and email form
  const OrDivider = () => (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-2 text-sm text-muted-foreground">or continue with</span>
      </div>
    </div>
  );

  return (
    <div className="container max-w-xl py-16">
      <Card className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription className="text-base">
            Welcome back! Sign in to your SwiftBurst account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {error && (
            <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full py-6"
              onClick={() => signInWithSocial('google')}
              disabled={!!socialLoading}
            >
              {socialLoading === 'google' ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_13183_20548)">
                      <path d="M19.5401 10.2068C19.5401 9.56126 19.4906 8.93748 19.3969 8.333H10.2031V12.0937H15.4286C15.2024 13.325 14.5121 14.3688 13.4788 15.0687V17.5344H16.6443C18.5101 15.8063 19.5401 13.2344 19.5401 10.2068Z" fill="#4285F4" />
                      <path d="M10.2031 19.9994C12.891 19.9994 15.1635 19.1244 16.6482 17.5344L13.4826 15.0688C12.6001 15.6682 11.4695 16.0207 10.2069 16.0207C7.61553 16.0207 5.42472 14.2613 4.62587 11.8994H1.3667V14.4426C2.84197 17.7557 6.25378 19.9994 10.2031 19.9994Z" fill="#34A853" />
                      <path d="M4.62167 11.8995C4.17424 10.6683 4.17424 9.3339 4.62167 8.10272V5.55945H1.36665C-0.164426 8.00008 -0.164426 12.0021 1.36665 14.4427L4.62167 11.8995Z" fill="#FBBC04" />
                      <path d="M10.2031 3.97852C11.6159 3.95227 12.9802 4.47227 13.9929 5.45415L16.7943 2.6527C15.0317 0.999021 12.6636 0.034584 10.2031 0.0608335C6.25378 0.0608335 2.84197 2.30452 1.3667 5.61765L4.62173 8.16093C5.41643 5.79902 7.61143 3.97852 10.2031 3.97852Z" fill="#EA4335" />
                    </g>
                    <defs>
                      <clipPath id="clip0_13183_20548">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Google</span>
                </div>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full py-6"
              onClick={() => signInWithSocial('facebook')}
              disabled={!!socialLoading}
            >
              {socialLoading === 'facebook' ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z" fill="#1877F2" />
                    <path d="M13.8926 12.8906L14.3359 10H11.5625V8.125C11.5625 7.33418 11.95 6.5625 13.1922 6.5625H14.4531V4.10156C14.4531 4.10156 13.3088 3.90625 12.2146 3.90625C9.93047 3.90625 8.4375 5.29063 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8785C9.47287 20.0405 10.5272 20.0405 11.5625 19.8785V12.8906H13.8926Z" fill="white" />
                  </svg>
                  <span>Facebook</span>
                </div>
              )}
            </Button>
          </div>

          <OrDivider />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" className="h-12 text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Signing in..." : "Sign in with Email"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 pt-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
