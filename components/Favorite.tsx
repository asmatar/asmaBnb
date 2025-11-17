import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
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
              <Heart className="w-5 h-5 fill-red-500" />
            </IconCTA>
          ) : (
            <IconCTA isFavorite={isFavorite} hotelId={id}>
              <Heart className="w-5 h-5 hover:fill-rose-500/20" />
            </IconCTA>
          )}
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-muted-foreground line-clamp-2 cursor-help">
                <span className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm transition-transform hover:scale-105">
                  <Heart className="w-5 h-5 hover:fill-red-500/20" />
                </span>
              </p>
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
