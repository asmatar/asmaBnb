import HotelCard from "@/components/Home/HotelCard";
import { getAllFavorites } from "@/services/favoriteservice";
import { auth } from "@clerk/nextjs/server";
import NoFavoritesFound from "./NoFavoritesFound";

const favorites = async () => {
  const { userId } = await auth();
  const { data: favorites, error } = await getAllFavorites(userId as string);
  if (error) {
    console.error(error);
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite) => (
          <HotelCard
            key={favorite.id}
            id={favorite.id}
            title={favorite.hotel.title!}
            description={favorite.hotel.description!}
            gym={favorite.hotel.gym!}
            pool={favorite.hotel.swimingPool!}
            city={favorite.hotel.city!}
            country={favorite.hotel.country!}
            /* price={favorite.price!} */
            image={favorite.hotel.image}
          />
        ))
      ) : (
        <NoFavoritesFound />
      )}
    </section>
  );
};

export default favorites;
