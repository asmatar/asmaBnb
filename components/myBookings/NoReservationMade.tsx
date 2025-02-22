"use client";
import { Button } from "@/components/ui/button";
import { Hotel, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NoReservationMade = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background/50">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>Aucune réservation effectuée</AlertTitle>
        <AlertDescription>
          Vous n'avez pas encore réservé d'hôtel. Découvrez nos meilleures
          offres !
        </AlertDescription>
      </Alert>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => router.push("/")}
      >
        <Search className="w-4 h-4 mr-2" />
        Explorer les hôtels
      </Button>
    </div>
  );
};

export default NoReservationMade;
