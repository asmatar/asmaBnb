"use server";
import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { bookings } from "@/store/BookingStore";

export const createBooking = async (booking: bookings) => {
  const supabase = await createClerkSupabaseClient();

  const { error, data } = await supabase.from("booking").insert({ ...booking });

  if (error) {
    console.log("error", error);
    error.message;
  }
  return data;
};

export const deleteBooking = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("booking").delete().eq("id", id);
  if (error) {
    error.message;
  }
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
export const updateBooking = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("booking")
    .update({ paymentStatus: "succeeded" })
    .eq("paymentIntentId", id);
  if (error) {
    error.message;
  }
};
export const existingBooking = async (newBookingOne: any) => {
  const supabase = await createClerkSupabaseClient();
  console.log("room id----", newBookingOne.roomBooked);
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("roomBooked", newBookingOne.roomBooked)
    .lte("startDate", newBookingOne.endDate)
    .gte("endDate", newBookingOne.startDate);

  return data;
};
