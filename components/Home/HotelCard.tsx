"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGlobalStore from "@/store/Global";
import { HotelCardProps } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import {
  Bath,
  Car,
  Dumbbell,
  MapPin,
  ShoppingBag,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../../i18n/navigation";
import Favorites from "../Favorite";

const HotelCard = async ({
  title,
  description,
  image,
  country,
  gym,
  pool,
  city,
  id,
  isFavorite,
  spa,
  bar,
  restaurant,
  freeWifi,
  freeParking,
  shopping,
  swimingPool,
}: HotelCardProps) => {
  const hasPool = pool || swimingPool;
  const { isViewGrid } = useGlobalStore();
  const { user } = useUser();
  const t = useTranslations("HotelCard");
  if (isViewGrid) {
    return (
      <Link href={`/hotel/details/${id}`}>
        <div className="group relative h-full overflow-hidden bg-card rounded-xl border border-border/40 transition-all duration-300 hover:shadow-lg">
          <div className="relative h-64 w-full overflow-hidden">
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="font-semibold text-xl text-white mb-1 line-clamp-1">
                {title}
              </h3>
              {country || city ? (
                <div className="flex items-center gap-1 text-white/90 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {city && country ? `${city}, ${country}` : city || country}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="p-4">
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
              {hasPool && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Waves className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("pool")}</span>
                </Badge>
              )}

              {gym && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Dumbbell className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("gym")}</span>
                </Badge>
              )}

              {spa && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Bath className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("spa")}</span>
                </Badge>
              )}

              {bar && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Wine className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("bar")}</span>
                </Badge>
              )}

              {restaurant && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <UtensilsCrossed className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("restaurant")}</span>
                </Badge>
              )}

              {freeWifi && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Wifi className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("freeWifi")}</span>
                </Badge>
              )}

              {freeParking && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <Car className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("freeParking")}</span>
                </Badge>
              )}

              {shopping && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                >
                  <ShoppingBag className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{t("shopping")}</span>
                </Badge>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <div className="text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors duration-200">
                {t("viewDetails")} →
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/hotel/details/${id}`} className="w-full">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                <h3 className="font-semibold text-xl text-white mb-1 line-clamp-1">
                  {title}
                </h3>
                {country || city ? (
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {city && country
                        ? `${city}, ${country}`
                        : city || country}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="p-4 w-2/3 transition-all duration-500 ">
              <div className="mb-2">
                <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
                {country || city ? (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {city && country
                        ? `${city}, ${country}`
                        : city || country}
                    </span>
                  </div>
                ) : null}
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
                {hasPool && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Waves className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("pool")}</span>
                  </Badge>
                )}

                {gym && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Dumbbell className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("gym")}</span>
                  </Badge>
                )}

                {spa && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Bath className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("spa")}</span>
                  </Badge>
                )}

                {bar && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Wine className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("bar")}</span>
                  </Badge>
                )}

                {restaurant && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <UtensilsCrossed className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("restaurant")}</span>
                  </Badge>
                )}

                {freeWifi && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Wifi className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("freeWifi")}</span>
                  </Badge>
                )}

                {freeParking && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <Car className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("freeParking")}</span>
                  </Badge>
                )}

                {shopping && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
                  >
                    <ShoppingBag className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{t("shopping")}</span>
                  </Badge>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <div className="text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors duration-200">
                  {t("viewDetails")} →
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default HotelCard;
