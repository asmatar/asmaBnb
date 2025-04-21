import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
const NoFavoritesFound = () => {
  const t = useTranslations("Favorites");
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background">
        <Heart className="w-6 h-6 text-gray-600" />
        <AlertTitle>{t("title")}</AlertTitle>
        <AlertDescription>{t("description")}</AlertDescription>
      </Alert>
    </div>
  );
};

export default NoFavoritesFound;
