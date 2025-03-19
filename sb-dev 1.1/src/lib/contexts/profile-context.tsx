"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CreditCard } from "@/lib/credit-cards-data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  creditCards: string[]; // Array of credit card IDs
  preferences: {
    notifications: boolean;
    theme: "light" | "dark" | "system";
    defaultPlatforms: string[];
  };
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  addCreditCard: (cardId: string) => Promise<void>;
  removeCreditCard: (cardId: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  setPreference: <K extends keyof UserProfile["preferences"]>(
    key: K,
    value: UserProfile["preferences"][K]
  ) => Promise<void>;
}

const defaultProfile: UserProfile = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@swiftburst.com",
  avatarUrl: null,
  creditCards: [],
  preferences: {
    notifications: true,
    theme: "system",
    defaultPlatforms: ["doordash", "ubereats", "grubhub"],
  },
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
  addCreditCard: async () => {},
  removeCreditCard: async () => {},
  updateProfile: async () => {},
  setPreference: async () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSupabaseReady = isSupabaseConfigured();

  // Load user profile on initial render and on auth change
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      // Use demo profile if Supabase is not configured
      if (!isSupabaseReady) {
        // Get demo profile from localStorage if available
        const storedProfile = localStorage.getItem('demoProfile');
        if (storedProfile) {
          try {
            const parsedProfile = JSON.parse(storedProfile);
            setProfile(parsedProfile);
          } catch (e) {
            console.error('Error parsing stored profile:', e);
            setProfile(defaultProfile);
            localStorage.setItem('demoProfile', JSON.stringify(defaultProfile));
          }
        } else {
          setProfile(defaultProfile);
          localStorage.setItem('demoProfile', JSON.stringify(defaultProfile));
        }
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated
      const { data: authData } = await supabase.auth.getSession();

      if (authData.session?.user) {
        const userId = authData.session.user.id;

        // Fetch user profile from database
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        } else if (data) {
          // Transform database record to profile format
          setProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatar_url,
            creditCards: data.preferences?.creditCards || [],
            preferences: {
              notifications: data.preferences?.notifications ?? defaultProfile.preferences.notifications,
              theme: data.preferences?.theme ?? defaultProfile.preferences.theme,
              defaultPlatforms: data.preferences?.defaultPlatforms ?? defaultProfile.preferences.defaultPlatforms,
            },
          });
        } else {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    };

    fetchProfile();

    // Set up auth state change listener if Supabase is configured
    let subscription: { subscription: { unsubscribe: () => void } } | undefined;

    if (isSupabaseReady) {
      const { data: authListener } = supabase.auth.onAuthStateChange(() => {
        fetchProfile();
      });
      subscription = authListener;
    }

    return () => {
      if (subscription) {
        subscription.subscription.unsubscribe();
      }
    };
  }, [isSupabaseReady]);

  // Update the stored profile in localStorage (for demo mode)
  const updateStoredProfile = (updatedProfile: UserProfile) => {
    if (!isSupabaseReady && updatedProfile) {
      localStorage.setItem('demoProfile', JSON.stringify(updatedProfile));
    }
  };

  const updatePreferences = async (preferences: any) => {
    if (!profile) return;

    if (!isSupabaseReady) {
      // In demo mode, just update the local state
      const updatedProfile = {
        ...profile,
        preferences: {
          ...profile.preferences,
          ...preferences
        }
      };
      setProfile(updatedProfile);
      updateStoredProfile(updatedProfile);
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          preferences,
        })
        .eq("id", profile.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating preferences:", error);
      throw error;
    }
  };

  const addCreditCard = async (cardId: string) => {
    if (!profile) return;

    // Check if the card is already in the array to prevent duplicates
    if (profile.creditCards.includes(cardId)) {
      return; // Card already exists
    }

    const updatedCards = [...profile.creditCards, cardId];

    if (!isSupabaseReady) {
      // In demo mode, update directly
      const updatedProfile = {
        ...profile,
        creditCards: updatedCards,
      };
      setProfile(updatedProfile);
      updateStoredProfile(updatedProfile);
      return;
    }

    // If Supabase is ready, update preferences in the database
    const updatedPreferences = {
      ...profile.preferences,
      creditCards: updatedCards,
    };

    await updatePreferences(updatedPreferences);

    setProfile({
      ...profile,
      creditCards: updatedCards,
    });
  };

  const removeCreditCard = async (cardId: string) => {
    if (!profile) return;

    const updatedCards = profile.creditCards.filter(id => id !== cardId);

    if (!isSupabaseReady) {
      // In demo mode, update directly
      const updatedProfile = {
        ...profile,
        creditCards: updatedCards,
      };
      setProfile(updatedProfile);
      updateStoredProfile(updatedProfile);
      return;
    }

    // If Supabase is ready, update preferences in the database
    const updatedPreferences = {
      ...profile.preferences,
      creditCards: updatedCards,
    };

    await updatePreferences(updatedPreferences);

    setProfile({
      ...profile,
      creditCards: updatedCards,
    });
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!profile) return;

    if (!isSupabaseReady) {
      // In demo mode, just update the local state
      const updatedProfile = {
        ...profile,
        ...data,
        preferences: {
          ...profile.preferences,
          ...(data.preferences || {}),
        },
        creditCards: data.creditCards || profile.creditCards,
      };
      setProfile(updatedProfile);
      updateStoredProfile(updatedProfile);
      return;
    }

    // Convert profile data to database format
    const dbData: any = {};

    if (data.name !== undefined) dbData.name = data.name;
    if (data.email !== undefined) dbData.email = data.email;
    if (data.avatarUrl !== undefined) dbData.avatar_url = data.avatarUrl;

    if (Object.keys(dbData).length > 0) {
      try {
        const { error } = await supabase
          .from("users")
          .update(dbData)
          .eq("id", profile.id);

        if (error) throw error;

        setProfile({
          ...profile,
          ...data,
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    }

    // Update preferences if included
    if (data.preferences || data.creditCards) {
      const updatedPreferences = {
        ...profile.preferences,
        ...(data.preferences || {}),
        creditCards: data.creditCards || profile.creditCards,
      };

      await updatePreferences(updatedPreferences);

      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          ...(data.preferences || {}),
        },
        creditCards: data.creditCards || profile.creditCards,
      });
    }
  };

  const setPreference = async <K extends keyof UserProfile["preferences"]>(
    key: K,
    value: UserProfile["preferences"][K]
  ) => {
    if (!profile) return;

    const updatedPreferences = {
      ...profile.preferences,
      [key]: value,
    };

    await updatePreferences(updatedPreferences);

    setProfile({
      ...profile,
      preferences: updatedPreferences,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        addCreditCard,
        removeCreditCard,
        updateProfile,
        setPreference,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
