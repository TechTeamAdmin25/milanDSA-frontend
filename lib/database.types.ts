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
      events: {
        Row: {
          id: string
          name: string
          description: string | null
          event_type: event_type
          venue: string | null
          event_date: string | null
          duration_minutes: number | null
          max_capacity: number | null
          price: number | null
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          event_type?: event_type
          venue?: string | null
          event_date?: string | null
          duration_minutes?: number | null
          max_capacity?: number | null
          price?: number | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          event_type?: event_type
          venue?: string | null
          event_date?: string | null
          duration_minutes?: number | null
          max_capacity?: number | null
          price?: number | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          ticket_number: string
          status: ticket_status
          price: number
          seat_section: string | null
          seat_row: string | null
          seat_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          ticket_number: string
          status?: ticket_status
          price: number
          seat_section?: string | null
          seat_row?: string | null
          seat_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          ticket_number?: string
          status?: ticket_status
          price?: number
          seat_section?: string | null
          seat_row?: string | null
          seat_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          college_name: string | null
          student_id: string | null
          year_of_study: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          college_name?: string | null
          student_id?: string | null
          year_of_study?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          college_name?: string | null
          student_id?: string | null
          year_of_study?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          ticket_id: string
          booking_reference: string
          total_amount: number
          payment_status: string
          payment_method: string | null
          payment_id: string | null
          booking_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          ticket_id: string
          booking_reference: string
          total_amount: number
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          booking_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          ticket_id?: string
          booking_reference?: string
          total_amount?: number
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          booking_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      student_database: {
        Row: {
          id: string
          email: string
          password: string
          full_name: string | null
          registration_number: string | null
          program: string | null
          department: string | null
          specialization: string | null
          semester: string | null
          batch: string | null
          phone_number: string | null
          personal_email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          full_name?: string | null
          registration_number?: string | null
          program?: string | null
          department?: string | null
          specialization?: string | null
          semester?: string | null
          batch?: string | null
          phone_number?: string | null
          personal_email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          full_name?: string | null
          registration_number?: string | null
          program?: string | null
          department?: string | null
          specialization?: string | null
          semester?: string | null
          batch?: string | null
          phone_number?: string | null
          personal_email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      explore_posts_manager: {
        Row: {
          id: string
          image_url: string
          posted_by: string
          hashtags: Json
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          posted_by: string
          hashtags?: Json
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          posted_by?: string
          hashtags?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_trending_hashtags: {
        Args: {
          limit_count?: number
        }
        Returns: {
          hashtag: string
          count: number
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
