"use client";

import { addFavorite, removeFavorite } from "@/services/favoriteservice";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
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

  const handleFavorite = async (isFavorite: boolean) => {
    const favoriteHotel = {
      id: uuidv4(),
      hotelId,
      userId: user!.id,
    };
    try {
      if (!isFavorite) {
        const result = await addFavorite(favoriteHotel);
        if (result.success) {
          toast.success("Hôtel ajouté aux favoris");
        } else {
          toast.error("Erreur lors de l'ajout aux favoris");
        }
      } else {
        const result = await removeFavorite(hotelId, user!.id);
        if (result.success) {
          toast.success("Hôtel retiré des favoris");
        } else {
          toast.error("Erreur lors du retrait des favoris");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("L'hotel n'a pas pu etre ajouté aux favoris");
    }
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
