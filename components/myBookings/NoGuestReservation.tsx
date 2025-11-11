import { Hotel } from "lucide-react";
import { getTranslations } from "next-intl/server";
const NoGuestReservation = async () => {
  const t = await getTranslations("NoGuestReservation");
  return (
    <div className="col-span-full min-h-[400px] flex flex-col">
      <div className="relative w-full max-w-2xl ">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-3xl" />
        <div className="relative bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Hotel className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t("title")}
              </h2>
              <p className="text-muted-foreground max-w-md">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoGuestReservation;
