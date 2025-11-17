"use client";
import GridCardHotel from "@/components/Home/HotelSection/GridCardHotel";
import ListCardHotel from "@/components/Home/HotelSection/ListCardHotel";
import { Link } from "@/i18n/navigation";
import useGlobalStore from "@/store/Global";
import { HotelCardProps } from "@/types/types";
import { useLocale } from "next-intl";

const HotelCard = ({
  title,
  description,
  image,
  country,
  city,
  id,
  isFavorite,
  ...features
}: HotelCardProps) => {
  const { isViewGrid } = useGlobalStore();
  const locale = useLocale();
  if (isViewGrid) {
    return (
      <Link href={`/${locale}/hotel/details/${id}`}>
        <GridCardHotel
          title={title}
          description={description}
          image={image}
          country={country}
          city={city}
          id={id}
          isFavorite={isFavorite}
          {...features}
        />
      </Link>
    );
  } else {
    return (
      <Link href={`/${locale}/hotel/details/${id}`}>
        <ListCardHotel
          title={title}
          description={description}
          image={image}
          country={country}
          city={city}
          id={id}
          isFavorite={isFavorite}
          {...features}
        />
      </Link>
    );
  }
};

export default HotelCard;
