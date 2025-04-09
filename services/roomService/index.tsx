"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { InsertRoom, UpdateRoom } from "@/types/tableType";
import { revalidatePath } from "next/cache";
export const updateRoom = async (room: UpdateRoom) => {
  const supabase = await createClerkSupabaseClient();
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/room/public/${room.image}`;
  try {
    const { data, error } = await supabase
      .from("room")
      .update({ ...room, image: imagePath })
      .eq("id", room.id!)
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
    .select("*, booking(*)")
    .eq("hotel_id", id);
  if (error) {
    throw new Error("room not found");
  }
  console.log(data);
  return data;
};
export const getOneRoom = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("room").select("*").eq("id", id);
  if (error) {
    throw new Error("room not found");
  }
  return data;
};
export const createRoom = async (newRoom: InsertRoom) => {
  console.log("Creating room with data:", newRoom);

  try {
    const imagePath = newRoom.image
      ? `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/room/public/${newRoom.image}`
      : "";

    console.log("Image path constructed:", imagePath);
    const supabase = await createClerkSupabaseClient();
    console.log("Supabase client created for room creation");

    const roomData = newRoom.image
      ? { ...newRoom, image: imagePath }
      : { ...newRoom, image: "" };

    console.log("Final room data to insert:", roomData);

    const { data, error } = await supabase
      .from("room")
      .insert([roomData])
      .select();

    if (error) {
      console.error("Error inserting room:", error);
      return { success: false, error: error.message };
    }

    console.log("Room created successfully:", data);
    revalidatePath(`/hotel/${newRoom.hotel_id}`);
    return { success: true, data };
  } catch (error) {
    console.error("Exception in createRoom:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
export const deleteRoom = async (formData: FormData) => {
  const id = formData.get("id");
  const supabase = await createClerkSupabaseClient();
  console.log("deleteeeeeeeeee", id);
  try {
    const { error: deleteBookingError, data: hasBooked } = await supabase
      .from("booking")
      .select("*")
      .eq("roomBooked", id as string);

    if (deleteBookingError || hasBooked.length > 0) {
      return {
        success: false,
        error: "you can't delete a room if you've got a reservation",
      };
    }
    const { error } = await supabase.from("room").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/hotel/[hotelId]");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getBookedIMade = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase

    .from("booking")
    .select(
      `
      *,
      room (
        *
      )
    `,
    )
    .eq("user_id", id);

  const rooms =
    data &&
    data.map((booking) => {
      const { room, ...reservationDetails } = booking;

      return {
        ...room,
        ...reservationDetails,
      };
    });

  return rooms;
};
export const getOneRoomInBooking = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase

    .from("booking")
    .select(
      `
      *,
      room (
        *
      )
    `,
    )
    .eq("paymentIntentId", id);

  const rooms =
    data &&
    data.map((booking) => {
      const { room, ...reservationDetails } = booking;

      return {
        ...room,
        ...reservationDetails,
      };
    });

  return rooms;
};
export const getRoomVisitorHaveMade = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("booking")
    .select(
      `
      *,
      room (*) 
    `,
    )
    .eq("room.user_id", id)
    .neq("user_id", id);
  if (error) {
    throw new Error("hotel not found");
  }

  const rooms = data.map((booking) => {
    const { room, ...reservationDetails } = booking;

    return {
      ...room,
      ...reservationDetails,
    };
  });

  return rooms;
};
