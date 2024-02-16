export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          "Blog Name": string
          content: string | null
          "Cover Image": string | null
          created_at: string
          Date: string | null
          id: string
          "In Carousel": boolean
          notion_id: string
          Published: boolean
          Slug: string
          Tags: string[] | null
        }
        Insert: {
          "Blog Name": string
          content?: string | null
          "Cover Image"?: string | null
          created_at?: string
          Date?: string | null
          id?: string
          "In Carousel"?: boolean
          notion_id: string
          Published?: boolean
          Slug: string
          Tags?: string[] | null
        }
        Update: {
          "Blog Name"?: string
          content?: string | null
          "Cover Image"?: string | null
          created_at?: string
          Date?: string | null
          id?: string
          "In Carousel"?: boolean
          notion_id?: string
          Published?: boolean
          Slug?: string
          Tags?: string[] | null
        }
        Relationships: []
      }
      info_articles: {
        Row: {
          article_name: string
          category: string
          content: string | null
          cover_image: string | null
          created_at: string
          desc_hero: string | null
          id: string
          img_path_hero: string | null
          notion_id: string
          seo_keywords: string | null
          slug: string | null
          sub_category: string
          tags: string[] | null
          title_hero: string | null
        }
        Insert: {
          article_name: string
          category: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          desc_hero?: string | null
          id?: string
          img_path_hero?: string | null
          notion_id: string
          seo_keywords?: string | null
          slug?: string | null
          sub_category: string
          tags?: string[] | null
          title_hero?: string | null
        }
        Update: {
          article_name?: string
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          desc_hero?: string | null
          id?: string
          img_path_hero?: string | null
          notion_id?: string
          seo_keywords?: string | null
          slug?: string | null
          sub_category?: string
          tags?: string[] | null
          title_hero?: string | null
        }
        Relationships: []
      }
      info_persons: {
        Row: {
          banner_content: string | null
          banner_title: string | null
          big_title: string | null
          created_at: string
          id: number
          image_path: string | null
          image_path_2: string | null
          path: string | null
          questions_section: string | null
          title_subtext: string | null
        }
        Insert: {
          banner_content?: string | null
          banner_title?: string | null
          big_title?: string | null
          created_at?: string
          id?: number
          image_path?: string | null
          image_path_2?: string | null
          path?: string | null
          questions_section?: string | null
          title_subtext?: string | null
        }
        Update: {
          banner_content?: string | null
          banner_title?: string | null
          big_title?: string | null
          created_at?: string
          id?: number
          image_path?: string | null
          image_path_2?: string | null
          path?: string | null
          questions_section?: string | null
          title_subtext?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      surveys: {
        Row: {
          created_at: string
          id: string
          json: Json
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          json: Json
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          json?: Json
          name?: string | null
        }
        Relationships: []
      }
      surveys_answers: {
        Row: {
          answer: Json
          created_at: string
          id: number
          respondent: string | null
          survey: string | null
        }
        Insert: {
          answer: Json
          created_at?: string
          id?: number
          respondent?: string | null
          survey?: string | null
        }
        Update: {
          answer?: Json
          created_at?: string
          id?: number
          respondent?: string | null
          survey?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "surveys_answers_respondent_fkey"
            columns: ["respondent"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "surveys_answers_survey_fkey"
            columns: ["survey"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_has_role: {
        Args: {
          p_user_id: string
          p_role_name: string
        }
        Returns: boolean
      }
      user_has_role_remix: {
        Args: {
          p_user_id: string
          p_role_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
