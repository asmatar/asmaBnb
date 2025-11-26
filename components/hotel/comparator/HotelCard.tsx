import { featuresConfig } from "@/helpers";
import { HotelCardProps } from "@/types/types";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type ComparatorHotelCardProps = Omit<HotelCardProps, "isFavorite" | "id">;

const HotelCard = ({
  title,
  description,
  image,
  country,
  city,
  minPrice,
  maxPrice,
  ...features
}: ComparatorHotelCardProps) => {
  const t = useTranslations("HotelCard");

  type FeaturesKeys = keyof typeof featuresConfig;

  return (
    <>
      <div className="relative bg-card rounded-xl border border-border/40 mt-12">
        {/* Image Section */}
        <div className="relative h-80 w-full">
          {image ? (
            <Image
              fill
              src={image}
              quality={85}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="h-full w-full bg-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground">
                {t("noImageAvailable")}
              </span>
            </div>
          )}
          {/* Hotel Number Badge */}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title and Location */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-accent-gradient">
              {title}
            </h3>
            {country || city ? (
              <div className="flex items-center gap-1.5 text-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {city && country ? `${city}, ${country}` : city || country}
                </span>
              </div>
            ) : null}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-md text-muted-foreground">Prix par nuit</p>
            <p className="text-2xl font-semibold text-purple-500">
              {minPrice}€ - {maxPrice}€
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-3">
            <h4 className="text-md text-foreground">Équipements</h4>
            <ul className="grid grid-cols-2 gap-2">
              {(Object.keys(featuresConfig) as FeaturesKeys[]).map((key) => {
                const { icon: Icon, translationKey } =
                  featuresConfig[key as FeaturesKeys];
                if (!features[key]) {
                  return (
                    <li
                      key={key}
                      className={`flex items-center gap-1.5 justify-start py-2 px-3 border border-border/40 rounded-md`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs">{key} non disponible</span>
                    </li>
                  );
                }

                return (
                  <li
                    key={key}
                    className={`flex items-center gap-1.5 justify-start py-2 px-3 border border-border/40 rounded-md`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs">{t(translationKey)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
