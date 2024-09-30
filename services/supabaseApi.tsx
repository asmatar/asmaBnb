"use server";

import { InsertBooking, InsertRoom } from "@/types/tableType";
import { createClerkSupabaseClient } from "../lib/supabase/supabaseClient";

// HOTELS API
export const getHotels = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("hotel").select("*");

  if (error) {
    console.error(error);
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
    throw new Error("hotel could not be created");
  }
  return data;
};
export const uploadImage = async (formData: FormData) => {
  const supabase = await createClerkSupabaseClient();
  const file = formData.get("image") as File;
  const { data, error } = await supabase.storage
    .from("hotels")
    .upload(`public/${file.name}`, file);
  if (error) {
    throw new Error("image could not be uploaded");
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
    throw new Error("hotel not found");
  }
  return data;
};
export const deleteHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("hotel").delete().eq("id", id);

  if (error) {
    throw new Error("hotel not found");
  }
};

/* ROOM API */

export const getAllRooms = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("room").select("*");

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
export const getRoomByHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("hotel_id", id);
  if (error) {
    throw new Error("room not found");
  }
  return data;
};
export const getOneRoom = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("hotel_id", id);
  if (error) {
    throw new Error("room not found");
  }
  return data;
};
export const createRoom = async (newRoom: InsertRoom) => {
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/room/public/${newRoom.image}`;

  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from("room")
    .insert([
      newRoom.image
        ? { ...newRoom, image: imagePath }
        : { ...newRoom, image: "" },
    ]);
  if (error) {
    console.log(error);
    throw new Error("room could not be created");
  }
  return data;
};
export const uploadImageRoom = async (formData: FormData) => {
  const supabase = await createClerkSupabaseClient();
  const file = formData.get("image") as File;

  const { data, error } = await supabase.storage
    .from("room")
    .upload(`public/${file.name}`, file);
  if (error) {
    throw new Error("image could not be uploaded");
  }
  return data;
};
export const deleteRoom = async (id: string) => {
  console.log("first", id);
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("room").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("hotel not found");
  }
};
