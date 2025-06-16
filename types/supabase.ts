export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          id: string
          post_platform_id: string
          likes: number | null
          comments: number | null
          shares: number | null
          impressions: number | null
          reach: number | null
          clicks: number | null
          raw_data: Json | null
          last_updated: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          post_platform_id: string
          likes?: number | null
          comments?: number | null
          shares?: number | null
          impressions?: number | null
          reach?: number | null
          clicks?: number | null
          raw_data?: Json | null
          last_updated?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          post_platform_id?: string
          likes?: number | null
          comments?: number | null
          shares?: number | null
          impressions?: number | null
          reach?: number | null
          clicks?: number | null
          raw_data?: Json | null
          last_updated?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_post_platform_id_fkey"
            columns: ["post_platform_id"]
            referencedRelation: "post_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_type: string
          file_size: number
          url: string
          thumbnail_url: string | null
          alt_text: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_type: string
          file_size: number
          url: string
          thumbnail_url?: string | null
          alt_text?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_type?: string
          file_size?: number
          url?: string
          thumbnail_url?: string | null
          alt_text?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          currency: string | null
          interval: string
          features: Json | null
          social_accounts_limit: number
          posts_per_month_limit: number | null
          team_members_limit: number | null
          stripe_price_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          currency?: string | null
          interval: string
          features?: Json | null
          social_accounts_limit?: number
          posts_per_month_limit?: number | null
          team_members_limit?: number | null
          stripe_price_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          currency?: string | null
          interval?: string
          features?: Json | null
          social_accounts_limit?: number
          posts_per_month_limit?: number | null
          team_members_limit?: number | null
          stripe_price_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      post_media: {
        Row: {
          post_id: string
          media_id: string
          display_order: number
          created_at: string | null
        }
        Insert: {
          post_id: string
          media_id: string
          display_order?: number
          created_at?: string | null
        }
        Update: {
          post_id?: string
          media_id?: string
          display_order?: number
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_media_media_id_fkey"
            columns: ["media_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_platforms: {
        Row: {
          id: string
          post_id: string
          social_account_id: string
          status: string
          platform_post_id: string | null
          error_message: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          social_account_id: string
          status: string
          platform_post_id?: string | null
          error_message?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          social_account_id?: string
          status?: string
          platform_post_id?: string | null
          error_message?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_platforms_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_platforms_social_account_id_fkey"
            columns: ["social_account_id"]
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          link: string | null
          scheduled_at: string | null
          published_at: string | null
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          link?: string | null
          scheduled_at?: string | null
          published_at?: string | null
          status: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          link?: string | null
          scheduled_at?: string | null
          published_at?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          platform: string
          account_name: string
          account_id: string | null
          access_token: string | null
          refresh_token: string | null
          token_expires_at: string | null
          is_active: boolean | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          platform: string
          account_name: string
          account_id?: string | null
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          platform?: string
          account_name?: string
          account_id?: string | null
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string | null
          status: string
          stripe_subscription_id: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          plan_id?: string | null
          status: string
          stripe_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string | null
          status?: string
          stripe_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          team_owner_id: string
          member_id: string
          role: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          team_owner_id: string
          member_id: string
          role: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          team_owner_id?: string
          member_id?: string
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_member_id_fkey"
            columns: ["member_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_owner_id_fkey"
            columns: ["team_owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
