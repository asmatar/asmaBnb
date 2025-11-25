import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import IconCTA from "./IconCTA";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Favorites = ({ isFavorite, id }: { isFavorite: boolean; id: string }) => {
  const { user } = useUser();
  const t = useTranslations("HotelCard");

  return (
    <>
      {user ? (
        <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm transition-transform hover:scale-110">
          {isFavorite ? (
            <IconCTA isFavorite={isFavorite} hotelId={id}>
              <Heart
                className="w-5 h-5 fill-rose-500"
                stroke="none"
                strokeWidth={0}
              />
            </IconCTA>
          ) : (
            <IconCTA isFavorite={isFavorite} hotelId={id}>
              <Heart
                className="w-5 h-5 stroke-rose-500 hover:fill-rose-500/20 transition-colors"
                fill="none"
                strokeWidth={2}
              />
            </IconCTA>
          )}
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="bg-background rounded-full shadow-sm transition-transform hover:scale-105 z-50 p-1"
                onClick={(event) => {
                  event.preventDefault();
                  toast.error(t("favorites.isFavoriteAllowed"));
                }}
              >
                <Heart
                  className="w-5 h-5 stroke-rose-500 hover:fill-rose-500/20 transition-colors"
                  fill="none"
                  strokeWidth={2}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-fit p-3">
              {t("favorites.isFavoriteAllowed")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default Favorites;
