//"use client";
import AddHotelForm from "@/components/AddHotelForm";
import RoomCard from "@/components/RoomCard";
import { getRoomByHotel } from "@/lib/supabase/supabaseApi";
//import { useEffect, useState } from "react";
//import { ReadonlyURLSearchParams } from "next/navigation";
async function HotelNew({
  searchParams,
}: {
  searchParams: { hotelId: string };
}) {
  const hotelId = searchParams.hotelId;
  const rooms = await getRoomByHotel(hotelId as string);

  return (
    <section>
      <AddHotelForm />
      <div className="">
        <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelNew;
