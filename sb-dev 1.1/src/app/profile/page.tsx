"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  CreditCard as CreditCardIcon,
  LogOut,
  MailCheck,
  Edit,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCardSelector } from "@/components/profile/credit-card-selector";
import { useProfile } from "@/lib/contexts/profile-context";
import { supabase } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, isLoading, updateProfile, setPreference } = useProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // Redirect if not logged in
  if (!isLoading && !profile) {
    router.push("/auth/signin");
    return null;
  }

  // Start editing profile info
  const handleEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email
      });
      setEditing(true);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
  };

  // Save profile changes
  const handleSave = async () => {
    if (profile) {
      try {
        await updateProfile({
          name: formData.name,
          email: formData.email
        });
        setEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle notification preference toggle
  const handleNotificationToggle = async (checked: boolean) => {
    await setPreference("notifications", checked);
  };

  // Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U";

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <Button variant="destructive" onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile" className="flex items-center justify-center gap-2 py-3">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center justify-center gap-2 py-3">
            <CreditCardIcon className="h-4 w-4" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center justify-center gap-2 py-3">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatarUrl || ""} alt={profile?.name || "User"} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{profile?.name || "User"}</h3>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                </div>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="border rounded-md shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Credit Cards</CardTitle>
              <CardDescription>
                Select the credit cards you have to improve delivery platform recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CreditCardSelector />

              <div className="border rounded-md p-4 bg-muted/30 mt-6">
                <h4 className="font-medium flex items-center text-sm">
                  <MailCheck className="mr-2 h-4 w-4 text-green-600" />
                  Why we need this information
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  SwiftBurst uses your credit card information to recommend the best food delivery platforms
                  based on cashback and rewards. We never store your actual card numbers or details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about deals and promotions
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={profile?.preferences.notifications}
                  onCheckedChange={handleNotificationToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="price-alerts">Price Alert Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when prices drop on your favorite restaurants
                  </p>
                </div>
                <Switch id="price-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Default Platforms</CardTitle>
              <CardDescription>
                Choose which delivery platforms to include in your default comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="doordash" defaultChecked />
                  <Label htmlFor="doordash">DoorDash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ubereats" defaultChecked />
                  <Label htmlFor="ubereats">UberEats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="grubhub" defaultChecked />
                  <Label htmlFor="grubhub">Grubhub</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="postmates" />
                  <Label htmlFor="postmates">Postmates</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
