"use client";
import GridCardHotel from "@/components/Home/HotelSection/GridCardHotel";
import ListCardHotel from "@/components/Home/HotelSection/ListCardHotel";
import { Link } from "@/i18n/navigation";
import useGlobalStore from "@/store/Global";
import { HotelCardProps } from "@/types/types";

const HotelCard = ({
  title,
  description,
  image,
  country,
  gym,
  city,
  id,
  isFavorite,
  spa,
  bar,
  restaurant,
  freeWifi,
  freeParking,
  shopping,
  swimingPool,
}: HotelCardProps) => {
  const { isViewGrid } = useGlobalStore();

  if (isViewGrid) {
    return (
      <Link href={`/hotel/details/${id}`}>
        <GridCardHotel
          title={title}
          description={description}
          image={image}
          country={country}
          city={city}
          id={id}
          isFavorite={isFavorite}
          gym={gym}
          spa={spa}
          bar={bar}
          restaurant={restaurant}
          freeWifi={freeWifi}
          freeParking={freeParking}
          shopping={shopping}
          swimingPool={swimingPool}
        />
      </Link>
    );
  } else {
    return (
      <Link href={`/hotel/details/${id}`}>
        <ListCardHotel
          title={title}
          description={description}
          image={image}
          country={country}
          city={city}
          id={id}
          isFavorite={isFavorite}
          gym={gym}
          spa={spa}
          bar={bar}
          restaurant={restaurant}
          freeWifi={freeWifi}
          freeParking={freeParking}
          shopping={shopping}
          swimingPool={swimingPool}
        />
      </Link>
    );
  }
};

export default HotelCard;
