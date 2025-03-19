export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
          preferences: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          image: string | null
          cuisine: string[]
          rating: number
          platforms: string[]
          address: string | null
          distance: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          image?: string | null
          cuisine: string[]
          rating: number
          platforms: string[]
          address?: string | null
          distance?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          image?: string | null
          cuisine?: string[]
          rating?: number
          platforms?: string[]
          address?: string | null
          distance?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          restaurant_id: string
          platform: string
          items: Json[]
          total: number
          status: string
          saved_amount: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          restaurant_id: string
          platform: string
          items: Json[]
          total: number
          status: string
          saved_amount?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          restaurant_id?: string
          platform?: string
          items?: Json[]
          total?: number
          status?: string
          saved_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      promo_codes: {
        Row: {
          id: string
          created_at: string
          code: string
          description: string
          platform: string
          expiry_date: string
          discount_amount: number | null
          discount_percentage: number | null
          restaurant_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          code: string
          description: string
          platform: string
          expiry_date: string
          discount_amount?: number | null
          discount_percentage?: number | null
          restaurant_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          code?: string
          description?: string
          platform?: string
          expiry_date?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
