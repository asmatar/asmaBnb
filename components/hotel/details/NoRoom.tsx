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
          Cet hôtel n'a pas encore de chambres. Ajoutez-en une pour permettre
          les réservations.
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
/* 
  --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
*/
