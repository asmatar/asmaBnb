import HotelCard from "@/components/Home/HotelCard";
import StyleContainer from "@/components/StyleContainer";
import ToggleViewLayout from "@/components/ToggleViewLayout";
import { getAllFavorites } from "@/services/favoriteservice";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaHeart } from "react-icons/fa6";
import NoFavoritesFound from "./NoFavoritesFound";
export const metadata: Metadata = {
  title: "Vos favoris",
  description: "Retrouvez tous vos hôtels préférés à un seul endroit",
};

const favorites = async () => {
  const { userId } = await auth();
  const t = await getTranslations("Favorites");
  const { data: favorites, error } = await getAllFavorites(userId as string);
  if (error) {
    console.error(error);
  }

  return (
    <>
      {/* Header section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 mb-8 w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left w-full">
              <div className="flex items-center justify-center md:justify-between gap-2">
                <div className="flex items-center gap-4">
                  <FaHeart className="w-5 h-5 text-rose-500" />
                  <h1 className="text-3xl font-bold">
                    <span className="text-accent-gradient">{t("title")}</span>
                  </h1>{" "}
                </div>
                {favorites && favorites.length > 0 && (
                  <div className="inline-block bg-background px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {favorites.length}{" "}
                    {favorites.length > 1 ? t("hotels") : t("hotel")}
                    {favorites.length > 1 ? t("saved") : ""}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground max-w-md">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToggleViewLayout />

      <div className="container mx-auto px-4 mb-16">
        {favorites && favorites.length > 0 ? (
          <>
            <StyleContainer>
              {favorites.map((favorite) => (
                <HotelCard
                  key={favorite.id}
                  id={favorite.hotel_id ?? favorite.id}
                  title={favorite.hotel.title!}
                  description={favorite.hotel.description!}
                  gym={favorite.hotel.gym!}
                  pool={favorite.hotel.swimingPool!}
                  city={favorite.hotel.city!}
                  country={favorite.hotel.country!}
                  /* price={favorite.price!} */
                  image={favorite.hotel.image}
                  isFavorite={true}
                />
              ))}
            </StyleContainer>
          </>
        ) : (
          <NoFavoritesFound />
        )}
      </div>
    </>
  );
};

export default favorites;
