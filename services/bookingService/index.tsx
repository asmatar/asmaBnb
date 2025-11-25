"use server";
import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { InsertBooking } from "@/types/tableType";
import { revalidatePath } from "next/cache";

export const createBooking = async (booking: InsertBooking) => {
  const supabase = await createClerkSupabaseClient();

  try {
    const { error, data } = await supabase
      .from("booking")
      .insert({ ...booking });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteBooking = async (formData: FormData) => {
  const id = formData.get("id");
  const supabase = await createClerkSupabaseClient();
  try {
    const { error } = await supabase
      .from("booking")
      .delete()
      .eq("id", id as string);
    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/my-bookings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
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

export const existingBooking = async (
  newBookingOne: Pick<
    InsertBooking,
    | "id"
    | "username"
    | "user_email"
    | "user_id"
    | "roomBooked"
    | "hotelBooked"
    | "hotelOwnerId"
    | "startDate"
    | "endDate"
    | "currency"
    | "totalPrice"
    | "breakfastIncluded"
  >,
) => {
  const supabase = await createClerkSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("booking")
      .select("*")
      .eq("roomBooked", newBookingOne.roomBooked)
      .lte("startDate", newBookingOne.endDate)
      .gte("endDate", newBookingOne.startDate);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
