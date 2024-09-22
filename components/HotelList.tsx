import { getHotels } from "@/lib/supabase/supabaseApi";

import HotelCard from "./HotelCard";
async function HotelList() {
  const hotels = await getHotels();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          id={hotel.id}
          title={hotel.title!}
          description={hotel.description!}
          gym={hotel.gym!}
          pool={hotel.swimingPool!}
          city={hotel.city!}
          country={hotel.country!}
          image={hotel.image!}
        />
      ))}
    </section>
  );
}

export default HotelList;
