import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart } from "lucide-react";

const NoFavoritesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background">
        <Heart className="w-6 h-6 text-gray-600" />
        <AlertTitle>Aucun Favoris trouvé</AlertTitle>
        <AlertDescription>
          Aucun favorites n&apos;a éte ajouter a votre liste
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoFavoritesFound;
