import { Hotel } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NoHotelsFound = async () => {
  const t = await getTranslations("NoHotelsFound");
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>{t("title")}</AlertTitle>
        <AlertDescription>{t("description")}</AlertDescription>
      </Alert>
    </div>
  );
};

export default NoHotelsFound;
