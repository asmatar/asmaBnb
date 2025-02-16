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
  try {
    const { data, error } = await supabase
      .from("hotel")
      .insert([
        newHotel.image ? { ...newHotel, image: imagePath } : { ...newHotel },
      ]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOneHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();

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
  try {
    const { error: deleteBookingError, data: hasBooked } = await supabase
      .from("booking")
      .select("*")
      .eq("hotelBooked", id);

    if (deleteBookingError || hasBooked.length > 0) {
      return {
        success: false,
        errorType: "hasBooking",
        error: "you can't delete an Hotel if you've got a reservation",
      };
    }
    const { error: deleteRoomError, data: roomData } = await supabase
      .from("room")
      .delete()
      .eq("hotel_id", id);
    if (deleteRoomError) {
      deleteRoomError.message;
    }
    const { error } = await supabase.from("hotel").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/my-hotels");
    return { success: true, roomData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateHotel = async (hotel: UpdateBooking) => {
  const supabase = await createClerkSupabaseClient();
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/public/${hotel.image}`;
  try {
    const { data, error } = await supabase
      .from("hotel")
      .update({ ...hotel, image: imagePath })
      .eq("id", hotel.id!)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/hotel/[hotelId]");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
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
