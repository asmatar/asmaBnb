import NoFavoritesFound from "@/app/[locale]/favorites/NoFavoritesFound";
import Banner from "@/app/[locale]/favorites/banner";
import HotelCard from "@/components/Home/HotelSection/HotelCard";
import HotelViewStyleContainer from "@/components/HotelViewStyleContainer";
import ToggleViewLayout from "@/components/ToggleViewLayout";
import { getAllFavorites } from "@/services/favoriteservice";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("favorites.title"),
    description: t("favorites.description"),
  };
}

const Favorites = async () => {
  const { userId } = auth();
  const { data: favorites, error } = await getAllFavorites(userId ?? "");
  if (error) {
    console.error(error);
  }
  const nbFavorites = favorites?.length ?? 0;

  if (nbFavorites === 0 || !favorites) return <NoFavoritesFound />;

  return (
    <>
      <Banner nbFavorites={nbFavorites} />
      <ToggleViewLayout />
      <div className="container mx-auto px-4 mb-16">
        <HotelViewStyleContainer>
          {favorites.map((favorite) => (
            <HotelCard
              key={favorite.id}
              id={favorite.hotel_id ?? favorite.id}
              title={favorite.hotel.title}
              description={favorite.hotel.description}
              gym={favorite.hotel.gym}
              swimingPool={favorite.hotel.swimingPool}
              city={favorite.hotel.city ?? ""}
              country={favorite.hotel.country}
              spa={favorite.hotel.spa}
              bar={favorite.hotel.bar}
              restaurant={favorite.hotel.restaurant}
              freeWifi={favorite.hotel.freeWifi}
              shopping={favorite.hotel.shopping}
              freeParking={favorite.hotel.freeParking}
              /* price={favorite.price!} */
              image={favorite.hotel.image}
              isFavorite={true}
            />
          ))}
        </HotelViewStyleContainer>
      </div>
    </>
  );
};

export default Favorites;
