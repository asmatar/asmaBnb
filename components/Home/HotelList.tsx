import { getFilteredHotels } from "@/services/hotelService";

import HotelCard from "./HotelCard";
async function HotelList(searchParams: any) {
  const data = await getFilteredHotels(searchParams.searchParams);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {data &&
        data.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            title={hotel.title!}
            description={hotel.description!}
            gym={hotel.gym!}
            pool={hotel.swimingPool!}
            city={hotel.city!}
            country={hotel.country!}
            /* price={hotel.price!} */
            image={hotel.image!}
          />
        ))}
    </section>
  );
}

export default HotelList;
