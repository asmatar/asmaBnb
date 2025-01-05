"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { InsertBooking, UpdateBooking } from "@/types/tableType";
import { revalidatePath } from "next/cache";

// HOTELS API
export const getHotels = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("hotel").select("*");

  if (error) {
    error.message;
    return [];
  }
  return data;
};

export const createHotel = async (newHotel: InsertBooking) => {
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/public/${newHotel.image}`;

  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("hotel")
    .insert([
      newHotel.image ? { ...newHotel, image: imagePath } : { ...newHotel },
    ]);
  if (error) {
    error.message;
  }
  return data;
};

export const getOneHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // attend 2 secondes

  const { data, error } = await supabase
    .from("hotel")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    error.message;
  }
  return data;
};
export const deleteHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("hotel").delete().eq("id", id);

  if (error) {
    error.message;
  }
};

export const updateHotel = async (hotel: UpdateBooking) => {
  const supabase = await createClerkSupabaseClient();
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/public/${hotel.image}`;

  const { data, error } = await supabase
    .from("hotel")
    .update({ ...hotel, image: imagePath })
    .eq("id", hotel.id!)
    .select();

  if (error) {
    error.message;
  }
  revalidatePath("/hotel/[hotelId]");
  return data;
};

export async function getFilteredHotels(filters: {
  title?: string;
  country?: string;
  state?: string;
  city?: string;
}) {
  const supabase = await createClerkSupabaseClient();
  const { country, state, city, title } = filters;

  let query = supabase.from("hotel").select("*");

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  if (country) {
    query = query.eq("country", country);
  }
  if (state) {
    query = query.eq("state", state);
  }
  if (city) {
    query = query.eq("city", city);
  }
  const { data, error } = await query;
  if (error) {
    error.message;
  }
  return data;
}
export const getHotelLocation = async () => {
  const supabase = createClerkSupabaseClient();

  const { data, error } = await supabase
    .from("hotel")
    .select("country, state, city");

  if (error) {
    error.message;
  }
  return data;
};
export async function getMyHotel(id: string) {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from("hotel")
    .select("*")
    .eq("user_id", id);
  if (error) {
    error.message;
  }
  return data;
}
