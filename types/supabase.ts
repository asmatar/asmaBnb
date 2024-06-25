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
          endDate: string | null;
          hotelId: number | null;
          hotelOwnerId: string | null;
          id: string;
          paymentIntentId: string | null;
          paymentStatus: boolean | null;
          roomId: number | null;
          startDate: string | null;
          totalPrice: number | null;
          user_id: string | null;
          username: string | null;
        };
        Insert: {
          booked_At?: string | null;
          breakfastIncluded?: boolean | null;
          created_at?: string;
          currency?: string | null;
          endDate?: string | null;
          hotelId?: number | null;
          hotelOwnerId?: string | null;
          id?: string;
          paymentIntentId?: string | null;
          paymentStatus?: boolean | null;
          roomId?: number | null;
          startDate?: string | null;
          totalPrice?: number | null;
          user_id?: string | null;
          username?: string | null;
        };
        Update: {
          booked_At?: string | null;
          breakfastIncluded?: boolean | null;
          created_at?: string;
          currency?: string | null;
          endDate?: string | null;
          hotelId?: number | null;
          hotelOwnerId?: string | null;
          id?: string;
          paymentIntentId?: string | null;
          paymentStatus?: boolean | null;
          roomId?: number | null;
          startDate?: string | null;
          totalPrice?: number | null;
          user_id?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_booking_hotelId_fkey";
            columns: ["hotelId"];
            isOneToOne: false;
            referencedRelation: "hotel";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_booking_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
        ];
      };
      hotel: {
        Row: {
          bar: boolean;
          bikeRental: boolean;
          bookings: string[];
          city: string;
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
          rooms: string[];
          shopping: boolean;
          spa: boolean;
          state: string;
          swimingPool: boolean;
          title: string;
          update_at: string | null;
          user_id: string | null;
        };
        Insert: {
          bar?: boolean;
          bikeRental?: boolean;
          bookings?: string[];
          city?: string;
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
          rooms?: string[];
          shopping?: boolean;
          spa?: boolean;
          state?: string;
          swimingPool?: boolean;
          title?: string;
          update_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          bar?: boolean;
          bikeRental?: boolean;
          bookings?: string[];
          city?: string;
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
          rooms?: string[];
          shopping?: boolean;
          spa?: boolean;
          state?: string;
          swimingPool?: boolean;
          title?: string;
          update_at?: string | null;
          user_id?: string | null;
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
          description: string | null;
          forestView: boolean | null;
          freeWifi: boolean | null;
          guestCount: number | null;
          id: string;
          image: string | null;
          kingBed: number | null;
          mountainView: boolean | null;
          oceanView: boolean | null;
          queenBed: number | null;
          roomPrice: number | null;
          roomservice: boolean | null;
          soundProofed: boolean | null;
          title: string | null;
          TV: boolean | null;
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
          description?: string | null;
          forestView?: boolean | null;
          freeWifi?: boolean | null;
          guestCount?: number | null;
          id?: string;
          image?: string | null;
          kingBed?: number | null;
          mountainView?: boolean | null;
          oceanView?: boolean | null;
          queenBed?: number | null;
          roomPrice?: number | null;
          roomservice?: boolean | null;
          soundProofed?: boolean | null;
          title?: string | null;
          TV?: boolean | null;
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
          description?: string | null;
          forestView?: boolean | null;
          freeWifi?: boolean | null;
          guestCount?: number | null;
          id?: string;
          image?: string | null;
          kingBed?: number | null;
          mountainView?: boolean | null;
          oceanView?: boolean | null;
          queenBed?: number | null;
          roomPrice?: number | null;
          roomservice?: boolean | null;
          soundProofed?: boolean | null;
          title?: string | null;
          TV?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_room_id_fkey";
            columns: ["id"];
            isOneToOne: true;
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
