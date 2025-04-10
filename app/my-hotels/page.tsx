import MyHotelList from "@/components/myHotels/MyHotelList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

async function MyHotels() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Mes hôtels</h1>
          <p className="text-muted-foreground">
            Gérez vos hôtels, ajoutez de nouvelles chambres et mettez à jour les
            informations existantes.
          </p>
        </div>
        <Link href="/hotel/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un hôtel
          </Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        {/* Hotel List */}
        <MyHotelList />
      </Suspense>
    </div>
  );
}

export default MyHotels;
