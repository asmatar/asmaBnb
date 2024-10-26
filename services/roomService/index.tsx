"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { InsertRoom, UpdateRoom } from "@/types/tableType";
import { revalidatePath } from "next/cache";
export const updateRoom = async (room: UpdateRoom) => {
  const supabase = await createClerkSupabaseClient();
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/room/public/${room.image}`;

  const { data, error } = await supabase
    .from("room")
    .update({ ...room, image: imagePath })
    .eq("id", room.id!)
    .select();

  if (error) {
    throw new Error("room not found");
  }
  revalidatePath("/hotel/[hotelId]");
  return data;
};
export const getAllRooms = async () => {
  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase.from("room").select("*");

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
export const getRoomByHotel = async (id: string) => {
  const supabase = createClerkSupabaseClient();
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
  revalidatePath(`/hotel/${newRoom.id}`);
  return data;
};
export const deleteRoom = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase.from("room").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("hotel not found");
  }
};
