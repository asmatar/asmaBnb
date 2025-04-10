"use client";

import { addFavorite, removeFavorite } from "@/services/favoriteservice";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
const IconCTA = ({
  children,
  isFavorite,
  hotelId,
}: {
  children: React.ReactNode;
  isFavorite: boolean;
  hotelId: string;
}) => {
  const { user } = useUser();
  console.log("isFavorite----------------------", isFavorite);
  const handleFavorite = (isFavorite: boolean) => {
    const favoriteHotel = {
      id: uuidv4(),
      hotelId,
      userId: user!.id,
    };
    !isFavorite
      ? addFavorite(favoriteHotel)
      : removeFavorite(hotelId, user!.id);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault(), handleFavorite(isFavorite);
      }}
      className="cursor-pointer"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log("clicked");
        }
      }}
    >
      {isFavorite}
      {children}
    </div>
  );
};

export default IconCTA;
