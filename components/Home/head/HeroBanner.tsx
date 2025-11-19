import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CounterFetchWrapper from "./CounterFetchWrapper";

const HeroBanner = async () => {
  const t = await getTranslations("Home");
  return (
    <section className="relative overflow-hidden mb-16">
      <div className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full">
                {t("servicePremium")}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="text-accent-gradient">{t("title")}</span>
              </h1>
            </div>

            <p className="text-lg text-foreground/90">{t("description")}</p>

            <p className="text-lg text-foreground/90">
              {t("reservationService")}
            </p>

            <CounterFetchWrapper />
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <Image
              src="/bahia_deluxe.jpg"
              alt="Chambre d'hôtel luxueuse"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-background/20 backdrop-blur-sm p-4 rounded-xl">
                <p className="text-lg font-semibold mb-1">{t("counter")}</p>
                <p className="text-sm text-foreground/90">{t("counter2")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
