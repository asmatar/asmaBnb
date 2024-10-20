import AddHotelForm from "@/components/AddHotelForm";
import RoomCard from "@/components/RoomCard";
import { getAllCountries } from "@/services/Location";
import { getOneHotel, getRoomByHotel } from "@/services/supabaseApi";
async function page({ params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId ?? "";
  const rooms = hotelId ? await getRoomByHotel(hotelId) : [];
  const hotel = await getOneHotel(params.hotelId ?? "");
  /*   const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  }); */

  const countries = await getAllCountries();

  return (
    <>
      {/*      <HydrationBoundary state={dehydrate(queryClient)}>
        <AddHotelForm />
      </HydrationBoundary> */}
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
