export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      booking: {
        Row: {
          booked_At: string;
          breakfastIncluded: boolean;
          clientSecret: string;
          created_at: string;
          currency: string;
          endDate: string;
          hotelBooked: string;
          hotelOwnerId: string;
          id: string;
          paymentIntentId: string;
          paymentStatus: string;
          roomBooked: string;
          startDate: string;
          totalPrice: number;
          user_email: string;
          user_id: string;
          username: string;
        };
        Insert: {
          booked_At?: string;
          breakfastIncluded?: boolean;
          clientSecret?: string;
          created_at?: string;
          currency?: string;
          endDate: string;
          hotelBooked?: string;
          hotelOwnerId: string;
          id: string;
          paymentIntentId: string;
          paymentStatus: string;
          roomBooked: string;
          startDate: string;
          totalPrice: number;
          user_email: string;
          user_id?: string;
          username?: string;
        };
        Update: {
          booked_At?: string;
          breakfastIncluded?: boolean;
          clientSecret?: string;
          created_at?: string;
          currency?: string;
          endDate?: string;
          hotelBooked?: string;
          hotelOwnerId?: string;
          id?: string;
          paymentIntentId?: string;
          paymentStatus?: string;
          roomBooked?: string;
          startDate?: string;
          totalPrice?: number;
          user_email?: string;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "booking_hotelBooked_fkey";
            columns: ["hotelBooked"];
            isOneToOne: false;
            referencedRelation: "hotel";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_roomBooked_fkey";
            columns: ["roomBooked"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
        ];
      };
      favorite: {
        Row: {
          created_at: string;
          hotel_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          hotel_id: string;
          id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          hotel_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "favorite_hotel_id_fkey";
            columns: ["hotel_id"];
            isOneToOne: false;
            referencedRelation: "hotel";
            referencedColumns: ["id"];
          },
        ];
      };
      hotel: {
        Row: {
          bar: boolean;
          bikeRental: boolean;
          city: string | null;
          coffeeShop: boolean;
          country: string;
          created_at: string;
          description: string;
          freeParking: boolean;
          freeWifi: boolean;
          gym: boolean;
          id: string;
          image: string;
          laundry: boolean;
          locationDescription: string;
          movieNights: boolean;
          restaurant: boolean;
          shopping: boolean;
          spa: boolean;
          state: string | null;
          swimingPool: boolean;
          title: string;
          update_at: string | null;
          user_id: string;
        };
        Insert: {
          bar?: boolean;
          bikeRental?: boolean;
          city?: string | null;
          coffeeShop?: boolean;
          country: string;
          created_at?: string;
          description: string;
          freeParking?: boolean;
          freeWifi?: boolean;
          gym?: boolean;
          id: string;
          image: string;
          laundry?: boolean;
          locationDescription: string;
          movieNights?: boolean;
          restaurant?: boolean;
          shopping?: boolean;
          spa?: boolean;
          state?: string | null;
          swimingPool?: boolean;
          title: string;
          update_at?: string | null;
          user_id?: string;
        };
        Update: {
          bar?: boolean;
          bikeRental?: boolean;
          city?: string | null;
          coffeeShop?: boolean;
          country?: string;
          created_at?: string;
          description?: string;
          freeParking?: boolean;
          freeWifi?: boolean;
          gym?: boolean;
          id?: string;
          image?: string;
          laundry?: boolean;
          locationDescription?: string;
          movieNights?: boolean;
          restaurant?: boolean;
          shopping?: boolean;
          spa?: boolean;
          state?: string | null;
          swimingPool?: boolean;
          title?: string;
          update_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      room: {
        Row: {
          airCondition: boolean;
          balcony: boolean;
          bathroomCount: number | null;
          bedCount: number | null;
          breakfastPrice: number;
          cityView: boolean;
          created_at: string;
          forestView: boolean;
          freeWifi: boolean;
          guestCount: number | null;
          hotel_id: string;
          id: string;
          image: string;
          kingBed: number | null;
          mountainView: boolean;
          oceanView: boolean;
          queenBed: number | null;
          roomDescription: string;
          roomPrice: number;
          roomService: boolean;
          roomTitle: string;
          soundProofed: boolean;
          TV: boolean;
          user_id: string;
        };
        Insert: {
          airCondition?: boolean;
          balcony?: boolean;
          bathroomCount?: number | null;
          bedCount?: number | null;
          breakfastPrice: number;
          cityView?: boolean;
          created_at?: string;
          forestView?: boolean;
          freeWifi?: boolean;
          guestCount?: number | null;
          hotel_id: string;
          id: string;
          image: string;
          kingBed?: number | null;
          mountainView?: boolean;
          oceanView?: boolean;
          queenBed?: number | null;
          roomDescription: string;
          roomPrice: number;
          roomService?: boolean;
          roomTitle: string;
          soundProofed?: boolean;
          TV?: boolean;
          user_id?: string;
        };
        Update: {
          airCondition?: boolean;
          balcony?: boolean;
          bathroomCount?: number | null;
          bedCount?: number | null;
          breakfastPrice?: number;
          cityView?: boolean;
          created_at?: string;
          forestView?: boolean;
          freeWifi?: boolean;
          guestCount?: number | null;
          hotel_id?: string;
          id?: string;
          image?: string;
          kingBed?: number | null;
          mountainView?: boolean;
          oceanView?: boolean;
          queenBed?: number | null;
          roomDescription?: string;
          roomPrice?: number;
          roomService?: boolean;
          roomTitle?: string;
          soundProofed?: boolean;
          TV?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_hotel_id_fkey";
            columns: ["hotel_id"];
            isOneToOne: false;
            referencedRelation: "hotel";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
