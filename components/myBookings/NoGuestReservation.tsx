import { Hotel } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NoGuestReservation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-background shadow-sm">
      <Alert className="w-full max-w-md bg-background/50">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>Aucune réservation reçue pour vos hôtels</AlertTitle>
        <AlertDescription>
          Vos hôtels n'ont pas encore reçu de réservation.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoGuestReservation;
