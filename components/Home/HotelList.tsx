import { getFilteredHotels } from "@/services/hotelService";

import HotelCard from "./HotelCard";
import NoHotelsFound from "./NoHotelsFound";
type searchParams = {
  title: string;
  country: string;
  state: string;
  city: string;
  spa: string;
  gym: string;
  bar: string;
  restaurant: string;
  freeWifi: string;
  shopping: string;
  freeParking: string;
  swimingPool: string;
};
async function HotelList({ searchParams }: { searchParams: searchParams }) {
  const { data } = await getFilteredHotels(searchParams);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {data && data.length > 0 ? (
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
            image={hotel.image}
            isFavorite={hotel.isFavorite}
          />
        ))
      ) : (
        <NoHotelsFound />
      )}
    </section>
  );
}

export default HotelList;
