"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Hotel, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const NoRoom = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-card shadow-sm">
      <Alert className="w-full max-w-md bg-background/50">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>Aucune chambre disponible</AlertTitle>
        <AlertDescription>
          Cet hôtel n&apos;a pas encore de chambres. Ajoutez-en une pour
          permettre les réservations.
        </AlertDescription>
      </Alert>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => router.push(`/hotel/${id}`)}
      >
        <Plus className="w-4 h-4 mr-2" /> Ajouter une chambre
      </Button>
    </div>
  );
};

export default NoRoom;
