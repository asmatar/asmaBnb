"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
export type OneFavoriteHotel = {
  id: string;
  hotelId: string;
  userId: string;
};
export const addFavorite = async (favoriteHotel: OneFavoriteHotel) => {
  const supabase = await createClerkSupabaseClient();
  console.log("add fav", favoriteHotel);
  try {
    const { error } = await supabase.from("favorite").insert([
      {
        hotel_id: favoriteHotel.hotelId,
        user_id: favoriteHotel.userId,
        id: favoriteHotel.id,
      },
    ]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const removeFavorite = async (hotelId: string, userId: string) => {
  console.log("removeFavorite", hotelId, userId);
  const supabase = await createClerkSupabaseClient();
  try {
    const { data } = await supabase.from("favorite").select("*");
    console.log("existingFavorite", data);
    const { error } = await supabase
      .from("favorite")
      .delete()
      //.filter("hotel_id", "eq", hotelId)
      .eq("hotel_id", hotelId)
      .eq("user_id", userId);
    if (error) {
      console.log("first");
      return { success: false, error: error.message };
    }
    console.log("second");
    return { success: true };
  } catch (error) {
    console.log("third");
    return { success: false, error: error.message };
  }
};
export const getAllFavorites = async (userId: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("favorite")
    .select("*, hotel(*)")
    .eq("user_id", userId);
  console.log("fav data", data);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, data };
};
