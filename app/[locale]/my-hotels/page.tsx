import MyHotelList from "@/components/myHotels/MyHotelList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Link } from "../../../i18n/navigation";
import Loading from "./loading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("myHotels.title"),
    description: t("myHotels.description"),
  };
}

async function MyHotels() {
  const t = await getTranslations("MyHotels");

  return (
    <div className="mx-auto py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t("myHotels")}</h1>
          <p className="text-muted-foreground">{t("addHotelDescription")}</p>
        </div>
        <Link href="/hotel/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t("addHotel")}
          </Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <MyHotelList />
      </Suspense>
    </div>
  );
}

export default MyHotels;
