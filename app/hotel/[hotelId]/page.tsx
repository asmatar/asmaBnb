import AddHotelForm from "@/components/AddHotelForm";
import RoomCard from "@/components/RoomCard";
import { getOneHotel } from "@/services/hotelService";
import { getAllCountries } from "@/services/locationService";
import { getRoomByHotel } from "@/services/roomService";
import { Hotel, Room } from "@/types/tableType";

async function page({ params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId ?? "";

  const [rooms, hotel] = (await Promise.all([
    hotelId && getRoomByHotel(hotelId),
    getOneHotel(hotelId),
  ])) as [Room[], Hotel];

  const countries = await getAllCountries();

  return (
    <>
      <AddHotelForm countries={countries} hotel={hotel} />

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
    </>
  );
}

export default page;
