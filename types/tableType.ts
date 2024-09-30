import { Database } from "@/types/supabase";
//bookings
export type Booking = Database["public"]["Tables"]["booking"]["Row"];
export type InsertBooking = Database["public"]["Tables"]["booking"]["Insert"];
export type UpdateBooking = Database["public"]["Tables"]["booking"]["Update"];

//hotel
export type Hotel = Database["public"]["Tables"]["hotel"]["Row"];
export type InsertHotel = Database["public"]["Tables"]["hotel"]["Insert"];
export type UpdateHotel = Database["public"]["Tables"]["hotel"]["Update"];

// room
export type Room = Database["public"]["Tables"]["room"]["Row"];
export type InsertRoom = Database["public"]["Tables"]["room"]["Insert"];
export type UpdateRoom = Database["public"]["Tables"]["room"]["Update"];
