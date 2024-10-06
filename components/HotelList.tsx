import { getFilteredHotels } from "@/services/supabaseApi";

import HotelCard from "./HotelCard";
async function HotelList(searchParams: any) {
  //const hotels = await getHotels();

  const data = await getFilteredHotels(searchParams.searchParams);
  console.log(data);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {data.map((hotel) => (
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
