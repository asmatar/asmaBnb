import { Hotel } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NoHotelsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>Aucun hôtel trouvé</AlertTitle>
        <AlertDescription>
          Aucun hôtel ne correspond à votre recherche. Essayez d’ajuster vos
          filtres ou explorez d’autres options.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoHotelsFound;
