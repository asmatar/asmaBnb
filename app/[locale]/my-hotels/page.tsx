import MyHotelList from "@/components/myHotels/MyHotelList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "My Hotels ",
  description:
    "Gérez vos hôtels, ajoutez de nouvelles chambres et mettez à jour les informations existantes. Créez et gérez votre portefeuille d'hôtels en un seul endroit.",
};

async function MyHotels() {
  const t = await getTranslations("MyHotels");
  return (
    <div className="container mx-auto px-4 py-12">
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
