import { Database } from "@/types/supabase";

/* export type hHotel = Tables<"hotel">; */
/* export type Hotel = {
  bar?: boolean | null;
  bikeRental?: boolean | null;
  bookings?: string[] | null;
  city?: string | null;
  coffeeShop?: boolean | null;
  country?: string | null;
  created_at?: string;
  description?: string | null;
  freeParking?: boolean | null;
  freeWifi?: boolean | null;
  gym?: boolean | null;
  id?: number;
  image?: string | null;
  laundry?: boolean | null;
  locationDescription?: string | null;
  movieNights?: boolean | null;
  restaurant?: boolean | null;
  rooms?: string[] | null;
  shopping?: boolean | null;
  spa?: boolean | null;
  state?: string | null;
  swimingPool?: boolean | null;
  title?: string | null;
  update_at?: string | null;
  user_id?: string | null;
}; */
export type InsertData = Database["public"]["Tables"]["hotel"]["Insert"];
