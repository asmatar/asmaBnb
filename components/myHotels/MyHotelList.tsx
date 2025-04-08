import { getMyHotel } from "@/services/hotelService";
import { auth } from "@clerk/nextjs/server";

import MyHotelCard from "@/components/myHotels/MyHotelCard";
import { Hotel } from "@/types/tableType";
type hotelPrice = Hotel & { room: { roomPrice: number }[] };
async function MyHotelList() {
  const { userId } = auth();

  const hotels = await getMyHotel(userId as string);
  if (hotels.length < 1) {
    return <div className="w-full h-[200px]">no hotel</div>;
  }

  const getPriceRange = (hotel: hotelPrice) => {
    return hotel.room.map((room: { roomPrice: number }) => {
      return room.roomPrice;
    });
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {hotels &&
        hotels.map(
          (hotel) => (
            console.log("hotelllll", hotel.room),
            (
              <MyHotelCard
                key={hotel.id}
                id={hotel.id}
                title={hotel.title}
                description={hotel.description!}
                image={hotel.image}
                price={getPriceRange(hotel)}
              />
            )
          ),
        )}
    </section>
  );
}

export default MyHotelList;
