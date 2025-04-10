import HotelCard from "@/components/Home/HotelCard";
import StyleContainer from "@/components/StyleContainer";
import ToggleViewLayout from "@/components/ToggleViewLayout";
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
    <>
      <ToggleViewLayout />
      <StyleContainer>
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
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
          ))
        ) : (
          <NoFavoritesFound />
        )}
      </StyleContainer>{" "}
    </>
  );
};

export default favorites;
