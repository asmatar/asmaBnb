import { getTranslations } from "next-intl/server";
import { FaHeart } from "react-icons/fa";

const Banner = async ({ nbFavorites }: { nbFavorites: number }) => {
  const t = await getTranslations("Favorites");

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 mb-8 w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <FaHeart className="w-5 h-5 text-rose-500" />
            <h1 className="text-3xl font-bold">
              <span className="text-accent-gradient">{t("title")}</span>
            </h1>{" "}
          </div>
          {nbFavorites > 0 && (
            <div className="inline-block bg-background px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              {nbFavorites} {nbFavorites > 1 ? t("hotels") : t("hotel")}{" "}
              {nbFavorites > 1 ? t("saved") : ""}
            </div>
          )}
        </div>
        <p className="text-muted-foreground max-w-md">{t("description")}</p>
      </div>
    </div>
  );
};

export default Banner;
