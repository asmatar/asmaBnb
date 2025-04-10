"use client";
import { Button } from "@/components/ui/button";
import { Hotel, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const NoReservationMade = () => {
  const router = useRouter();
  return (
    <div className="col-span-full min-h-[400px] flex flex-col ">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-3xl" />
        <div className="relative bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Hotel className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Aucune réservation effectuée
              </h2>
              <p className="text-muted-foreground max-w-md">
                Vous n&apos;avez pas encore réservé d&apos;hôtel. Découvrez nos
                meilleures offres et trouvez l&apos;hébergement parfait pour
                votre prochain séjour !
              </p>
            </div>

            <Button
              variant="default"
              size="lg"
              className="mt-4 px-8 py-6 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              onClick={() => router.push("/")}
            >
              <Search className="w-5 h-5 mr-2" />
              Explorer les hôtels
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoReservationMade;
