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
    .select("*, booking(*)")
    .eq("hotel_id", id);
  if (error) {
    throw new Error("room not found");
  }
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
  const { error: deleteBookingError, data: hasBooked } = await supabase
    .from("booking")
    .select("*")
    .eq("roomBooked", id);

  if (deleteBookingError || hasBooked.length > 0) {
    (deleteBookingError && deleteBookingError.message) ||
      console.log(
        "you can't delete a room if you've got a reservation",
        hasBooked,
      );
    return;
  }
  const { error } = await supabase.from("room").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("hotel not found");
  }
  revalidatePath("/hotel/[hotelId]");
};

export const getBookedIMade = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase

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
  const { data, error } = await supabase

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
    console.log(error);
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
