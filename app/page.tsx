import HotelCard from "@/components/HotelCard";
import { getHotels } from "@/lib/supabase/supabaseApi";
/* import FramerDiv from "@/components/framer/div"; */
export const revalidate = 3600;
export default async function Home() {
  const hotels = await getHotels();
  return (
    <>
      {/*  <FramerDiv></FramerDiv> */}

      {/* hotel ul */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
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
      </div>
    </>
  );
}
