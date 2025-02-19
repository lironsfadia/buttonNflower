[?25l
    Select a project:                                                                              
                                                                                                   
  >  1. lkiwhdhzswqzqnxqaodc [name: buttonNflower, org: ehnongryrxfcknwchhps, region: eu-central-1]
    2. ypogmygjvpqtrewhcoog [name: events-app, org: ehnongryrxfcknwchhps, region: us-east-2]       
                                                                                                   
                                                                                                   
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                 
                                                                                                   [0D[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[0D[2K [0D[2K[?25h[?1002l[?1003l[?1006lexport type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string | null
          report_id: number
        }
        Insert: {
          created_at?: string | null
          report_id: number
        }
        Update: {
          created_at?: string | null
          report_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_report"
            columns: ["report_id"]
            isOneToOne: true
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      flower_report_plants: {
        Row: {
          created_at: string
          id: number
          plant_id: number | null
          report_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          plant_id?: number | null
          report_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          plant_id?: number | null
          report_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "flower_report_plants_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flower_report_plants_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          bloomingSeason: string | null
          created_at: string
          distributionaArea: string | null
          id: number
          inExtinction: boolean | null
          name: string
          type: string | null
        }
        Insert: {
          bloomingSeason?: string | null
          created_at?: string
          distributionaArea?: string | null
          id?: never
          inExtinction?: boolean | null
          name: string
          type?: string | null
        }
        Update: {
          bloomingSeason?: string | null
          created_at?: string
          distributionaArea?: string | null
          id?: never
          inExtinction?: boolean | null
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          content: string | null
          created_at: string
          id: number
          items_count: number | null
          like_count: number | null
          location: string | null
          location_point: unknown | null
          name: string
          pics: string[] | null
          plant_ids: number[] | null
          seen_at: string | null
          status: string | null
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          items_count?: number | null
          like_count?: number | null
          location?: string | null
          location_point?: unknown | null
          name: string
          pics?: string[] | null
          plant_ids?: number[] | null
          seen_at?: string | null
          status?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          items_count?: number | null
          like_count?: number | null
          location?: string | null
          location_point?: unknown | null
          name?: string
          pics?: string[] | null
          plant_ids?: number[] | null
          seen_at?: string | null
          status?: string | null
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_reports: {
        Args: {
          lat: number
          long: number
        }
        Returns: {
          id: number
          name: string
          created_at: string
          content: string
          items_count: number
          like_count: number
          pics: string[]
          plant_ids: number[]
          seen_at: string
          status: string
          user_id: string
          view_count: number
          location: string
          lat: number
          long: number
          dist_meters: number
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
