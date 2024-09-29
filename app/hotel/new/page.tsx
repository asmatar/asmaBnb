import AddHotelForm from "@/components/AddHotelForm";
import RoomCard from "@/components/RoomCard";
import { getRoomByHotel } from "@/services/supabaseApi";

async function HotelNew({
  searchParams,
}: {
  searchParams: { hotelId: string };
}) {
  const hotelId = searchParams.hotelId ?? "";
  const rooms = hotelId ? await getRoomByHotel(hotelId) : [];

  return (
    <section>
      <AddHotelForm />
      {rooms.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold my-4 mb-4">Hotel Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default HotelNew;
