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
          booked_At: string | null;
          breakfastIncluded: boolean | null;
          created_at: string;
          currency: string | null;
          endDate: string;
          hotelOwnerId: string;
          id: string;
          paymentIntentId: string;
          paymentStatus: boolean;
          startDate: string;
          totalPrice: number;
          user_email: string;
          user_id: string;
          username: string;
        };
        Insert: {
          booked_At?: string | null;
          breakfastIncluded?: boolean | null;
          created_at?: string;
          currency?: string | null;
          endDate: string;
          hotelOwnerId: string;
          id: string;
          paymentIntentId: string;
          paymentStatus?: boolean;
          startDate: string;
          totalPrice: number;
          user_email: string;
          user_id?: string;
          username: string;
        };
        Update: {
          booked_At?: string | null;
          breakfastIncluded?: boolean | null;
          created_at?: string;
          currency?: string | null;
          endDate?: string;
          hotelOwnerId?: string;
          id?: string;
          paymentIntentId?: string;
          paymentStatus?: boolean;
          startDate?: string;
          totalPrice?: number;
          user_email?: string;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "booking_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "hotel";
            referencedColumns: ["id"];
          },
        ];
      };
      hotel: {
        Row: {
          bar: boolean;
          bikeRental: boolean;
          bookings: string[] | null;
          city: string | null;
          coffeeShop: boolean | null;
          country: string | null;
          created_at: string;
          description: string | null;
          freeParking: boolean;
          freeWifi: boolean;
          gym: boolean;
          id: string;
          image: string | null;
          laundry: boolean;
          locationDescription: string | null;
          movieNights: boolean;
          restaurant: boolean;
          shopping: boolean;
          spa: boolean;
          state: string | null;
          swimingPool: boolean;
          title: string | null;
          update_at: string | null;
          user_id: string;
        };
        Insert: {
          bar?: boolean;
          bikeRental?: boolean;
          bookings?: string[] | null;
          city?: string | null;
          coffeeShop?: boolean | null;
          country?: string | null;
          created_at?: string;
          description?: string | null;
          freeParking?: boolean;
          freeWifi?: boolean;
          gym?: boolean;
          id: string;
          image?: string | null;
          laundry?: boolean;
          locationDescription?: string | null;
          movieNights?: boolean;
          restaurant?: boolean;
          shopping?: boolean;
          spa?: boolean;
          state?: string | null;
          swimingPool?: boolean;
          title?: string | null;
          update_at?: string | null;
          user_id?: string;
        };
        Update: {
          bar?: boolean;
          bikeRental?: boolean;
          bookings?: string[] | null;
          city?: string | null;
          coffeeShop?: boolean | null;
          country?: string | null;
          created_at?: string;
          description?: string | null;
          freeParking?: boolean;
          freeWifi?: boolean;
          gym?: boolean;
          id?: string;
          image?: string | null;
          laundry?: boolean;
          locationDescription?: string | null;
          movieNights?: boolean;
          restaurant?: boolean;
          shopping?: boolean;
          spa?: boolean;
          state?: string | null;
          swimingPool?: boolean;
          title?: string | null;
          update_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      room: {
        Row: {
          airCondition: boolean | null;
          balcony: boolean | null;
          bathroomCount: number | null;
          bedCount: number | null;
          booking: string[] | null;
          breakfastPrice: number | null;
          cityView: boolean | null;
          created_at: string;
          forestView: boolean | null;
          freeWifi: boolean | null;
          guestCount: number | null;
          hotel_id: string | null;
          id: string;
          image: string | null;
          kingBed: number | null;
          mountainView: boolean | null;
          oceanView: boolean | null;
          queenBed: number | null;
          roomDescription: string | null;
          roomPrice: number | null;
          roomService: boolean | null;
          roomTitle: string | null;
          soundProofed: boolean | null;
          TV: boolean | null;
          user_id: string;
        };
        Insert: {
          airCondition?: boolean | null;
          balcony?: boolean | null;
          bathroomCount?: number | null;
          bedCount?: number | null;
          booking?: string[] | null;
          breakfastPrice?: number | null;
          cityView?: boolean | null;
          created_at?: string;
          forestView?: boolean | null;
          freeWifi?: boolean | null;
          guestCount?: number | null;
          hotel_id?: string | null;
          id: string;
          image?: string | null;
          kingBed?: number | null;
          mountainView?: boolean | null;
          oceanView?: boolean | null;
          queenBed?: number | null;
          roomDescription?: string | null;
          roomPrice?: number | null;
          roomService?: boolean | null;
          roomTitle?: string | null;
          soundProofed?: boolean | null;
          TV?: boolean | null;
          user_id?: string;
        };
        Update: {
          airCondition?: boolean | null;
          balcony?: boolean | null;
          bathroomCount?: number | null;
          bedCount?: number | null;
          booking?: string[] | null;
          breakfastPrice?: number | null;
          cityView?: boolean | null;
          created_at?: string;
          forestView?: boolean | null;
          freeWifi?: boolean | null;
          guestCount?: number | null;
          hotel_id?: string | null;
          id?: string;
          image?: string | null;
          kingBed?: number | null;
          mountainView?: boolean | null;
          oceanView?: boolean | null;
          queenBed?: number | null;
          roomDescription?: string | null;
          roomPrice?: number | null;
          roomService?: boolean | null;
          roomTitle?: string | null;
          soundProofed?: boolean | null;
          TV?: boolean | null;
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

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
