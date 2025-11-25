"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { InsertHotel, UpdateHotel } from "@/types/tableType";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getHotels = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("hotel").select("*, favorite(*)");
  // const { data, error } = await supabase.from("hotel").select("*");
  if (error) {
    error.message;
    return [];
  }
  return data;
};

export const createHotel = async (newHotel: InsertHotel) => {
  const imagePath = `https://fdnpxniupfpqpzwhongp.supabase.co/storage/v1/object/public/hotels/public/${newHotel.image}`;
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
    return { success: false, error: "error" /* error.message */ };
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
    return { success: true, roomData: roomData || [] };
  } catch (error) {
    return { success: false, error: error as string };
  }
};

export const updateHotel = async (hotel: UpdateHotel) => {
  const supabase = await createClerkSupabaseClient();
  const imagePath = `https://fdnpxniupfpqpzwhongp.supabase.co/storage/v1/object/public/hotels/public/${hotel.image}`;
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
    return { success: false, error: "error" /* error.message */ };
  }
};

export async function getFilteredHotels(filters: {
  title?: string;
  country?: string;
  state?: string;
  city?: string;
  spa?: string;
  gym?: string;
  bar?: string;
  restaurant?: string;
  freeWifi?: string;
  shopping?: string;
  freeParking?: string;
  swimingPool?: string;
  minPrice?: number;
  maxPrice?: number;
  from: number;
  to: number;
}) {
  const supabase = await createClerkSupabaseClient();
  const {
    country,
    state,
    city,
    title,
    spa,
    gym,
    bar,
    restaurant,
    freeWifi,
    shopping,
    freeParking,
    swimingPool,
    minPrice,
    maxPrice,
    from = filters.from ?? 0,
    to = filters.to ?? 11,
  } = filters;
  let query = supabase.from("hotel").select("*", { count: "exact" });
  console.log("filters", filters);
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
  if (minPrice) {
    query = query.gte("max_price", minPrice);
  }
  if (maxPrice) {
    query = query.lte("min_price", maxPrice);
  }
  if (spa === "true") {
    query = query.eq("spa", true);
  }
  if (gym === "true") {
    query = query.eq("gym", true);
  }
  if (bar === "true") {
    query = query.eq("bar", true);
  }
  if (restaurant === "true") {
    query = query.eq("restaurant", true);
  }
  if (freeWifi === "true") {
    query = query.eq("freeWifi", true);
  }
  if (shopping === "true") {
    query = query.eq("shopping", true);
  }
  if (freeParking === "true") {
    query = query.eq("freeParking", true);
  }
  if (swimingPool === "true") {
    query = query.eq("swimingPool", true);
  }

  const { data, error, count } = await query.range(from, to);
  if (error) {
    error.message;
  }

  const { userId } = await auth();

  const { data: favorites } = await supabase
    .from("favorite")
    .select("hotel_id")
    .eq("user_id", userId as string);

  const hotelsWithFavorites =
    data &&
    data.map((hotel) => {
      const isFavorite =
        favorites && favorites.some((fav) => fav.hotel_id === hotel.id);
      return { ...hotel, isFavorite };
    });
  return { data: hotelsWithFavorites, count };
}

export const getHotelLocation = async () => {
  const supabase = await createClerkSupabaseClient();

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
    .select(`*, room(id, roomPrice)`)
    .eq("user_id", id);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data || [];
}
export async function getMinMaxRoomPrice() {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.rpc("get_hotel_price_range");

  if (error) {
    console.error("Error fetching price range:", error.message);
    return { min: 0, max: 0 };
  }
  if (Array.isArray(data) && data.length > 0) {
    return {
      min: data[0].min_price ?? 0,
      max: data[0].max_price ?? 0,
    };
  }
  return { min: 0, max: 0 };
}
