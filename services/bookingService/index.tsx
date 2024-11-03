import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { bookings } from "@/store/BookingStore";

export const createBooking = async (booking: bookings) => {
  const supabase = await createClerkSupabaseClient();
  console.log(booking);
  const { error, data } = await supabase.from("booking").insert({ ...booking });

  if (error) {
    console.log("error", error);
    error.message;
  }
  return data;
};

export const getBookingFromOneRoom = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("room_id", id);
  if (error) {
    error.message;
  }
  return data;
};
