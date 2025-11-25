import { getFilteredHotels } from "@/services/hotelService";

import HotelCard from "@/components/Home/HotelSection/HotelCard";
import NoHotelsFound from "@/components/Home/NoHotelsFound";
import HotelViewStyleContainer from "@/components/HotelViewStyleContainer";
import Pagination from "@/components/Pagination";
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
  const { data, count } = await getFilteredHotels(searchParams);

  const totalPages = count && Math.ceil(count / 12);

  if (!data || data.length === 0) return <NoHotelsFound />;

  return (
    <>
      <HotelViewStyleContainer>
        {data.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            minPrice={hotel.min_price ?? "N/A"}
            maxPrice={hotel.max_price ?? "N/A"}
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
            image={hotel.image}
            isFavorite={hotel.isFavorite ?? false}
          />
        ))}
      </HotelViewStyleContainer>
      <Pagination totalPages={totalPages ?? 0} />
    </>
  );
}

export default HotelList;
