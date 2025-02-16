"use server";
import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { bookings } from "@/store/BookingStore";
import { revalidatePath } from "next/cache";

export const createBooking = async (booking: bookings) => {
  const supabase = await createClerkSupabaseClient();

  const { error, data } = await supabase.from("booking").insert({ ...booking });

  if (error) {
    console.log("error", error);
    error.message;
  }
  return data;
};

export const deleteBooking = async (formData: FormData) => {
  const id = formData.get("id");

  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("booking").delete().eq("id", id);

  revalidatePath("/my-bookings");
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
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("roomBooked", newBookingOne.roomBooked)
    .lte("startDate", newBookingOne.endDate)
    .gte("endDate", newBookingOne.startDate);

  return data;
};
