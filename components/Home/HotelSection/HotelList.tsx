import { getFilteredHotels } from "@/services/hotelService";

import HotelCard from "@/components/Home/HotelSection/HotelCard";
import NoHotelsFound from "@/components/Home/NoHotelsFound";
import HotelViewStyleContainer from "@/components/HotelViewStyleContainer";
import Pagination from "@/components/Pagination";
import { getHotelCount } from "@/services/counterService";
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
  from: number;
  to: number;
};
async function HotelList({ searchParams }: { searchParams: searchParams }) {
  const { data } = await getFilteredHotels(searchParams);
  const containsFilters: boolean = Object.keys(searchParams).some(
    (value) =>
      value === "title" ||
      value === "country" ||
      value === "state" ||
      value === "city" ||
      value === "spa" ||
      value === "gym" ||
      value === "bar" ||
      value === "restaurant" ||
      value === "freeWifi" ||
      value === "shopping" ||
      value === "freeParking" ||
      value === "swimingPool",
  );
  // filtre qui ne fonctionne pas correctement----------------------------------
  const hotelCount = await getHotelCount();
  const totalPages = containsFilters
    ? data && data.length / 12
    : hotelCount && Math.ceil(hotelCount / 12);

  return (
    <>
      <HotelViewStyleContainer>
        {data && data.length > 0 ? (
          data.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              title={hotel.title!}
              description={hotel.description!}
              gym={hotel.gym!}
              city={hotel.city!}
              spa={hotel.spa!}
              bar={hotel.bar!}
              restaurant={hotel.restaurant!}
              freeWifi={hotel.freeWifi!}
              swimingPool={hotel.swimingPool!}
              shopping={hotel.shopping!}
              freeParking={hotel.freeParking!}
              country={hotel.country!}
              /* price={hotel.price!} */
              image={hotel.image}
              isFavorite={hotel.isFavorite ?? false}
            />
          ))
        ) : (
          <NoHotelsFound />
        )}
      </HotelViewStyleContainer>
      <Pagination totalPages={totalPages ?? 0} />
    </>
  );
}

export default HotelList;
