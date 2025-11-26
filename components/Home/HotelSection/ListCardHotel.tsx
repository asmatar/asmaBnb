import ActionLink from "@/components/ActionLink";
import ComparatorBadge from "@/components/ComparatorBadge";
import Favorites from "@/components/Favorite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { featuresConfig } from "@/helpers";
import { HotelCardProps } from "@/types/types";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FeaturesBadge from "./FeaturesBadge";

const ListCardHotel = ({
  title,
  description,
  image,
  country,
  city,
  id,
  isFavorite,
  minPrice,
  maxPrice,
  ...features
}: HotelCardProps) => {
  const t = useTranslations("HotelCard");

  type FeatureKey = keyof typeof featuresConfig;
  return (
    <div className="group h-full overflow-hidden bg-card rounded-xl border border-border/40 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-row h-64 relative">
        <div className="relative w-1/3 overflow-hidden transition-all duration-500 ">
          {image ? (
            <Image
              fill
              src={image}
              quality={85}
              alt={title}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground">
                {t("noImageAvailable")}
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3 z-10">
            <Favorites isFavorite={isFavorite} id={id} />
          </div>
        </div>

        <div className="p-4 w-2/3 transition-all duration-500 ">
          <div className="flex justify-between items-center">
            <div className="mb-2">
              <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
              {country || city ? (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {city && country ? `${city}, ${country}` : city || country}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="text-sm text-muted-foreground">
              {minPrice}€ - {maxPrice}€
            </div>
          </div>
          <div className="mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-muted-foreground line-clamp-2 cursor-help">
                    {description}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="w-[300px] p-3">
                  <p className="text-sm">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(Object.keys(featuresConfig) as FeatureKey[]).map((key) => {
              if (!features[key]) return null;

              const { icon: Icon, translationKey } = featuresConfig[key];

              return (
                <FeaturesBadge
                  key={key}
                  icon={<Icon className="w-3 h-3 flex-shrink-0" />}
                  translationKey={t(translationKey)}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4">
            <ComparatorBadge hotelId={id} />
            <ActionLink href={`/hotel/details/${id}`}>
              {t("viewDetails")} →
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCardHotel;
