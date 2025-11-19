import { CalendarCheck, CalendarRange, CalendarX } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const Informations = async ({
  totalMyBookings,
  totalGuestBookings,
  totalUpcomingBooking,
  isHost,
}: {
  totalMyBookings: number;
  totalGuestBookings: number;
  totalUpcomingBooking: number;
  isHost: boolean;
}) => {
  const t = await getTranslations("BookingTabs");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
        <CalendarRange className="h-10 w-10 text-primary mb-3" />
        <h3 className="text-xl font-medium text-center">
          {t("totalBookings")}
        </h3>
        <p className="text-4xl font-bold">{totalMyBookings}</p>
        <p className="text-sm text-muted-foreground text-center">
          {t("yourReservedRooms")}
        </p>
      </div>

      {isHost && (
        <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
          <CalendarCheck className="h-10 w-10 text-green-500 mb-3" />
          <h3 className="text-xl font-medium text-center">
            {t("guestBookings")}
          </h3>
          <p className="text-4xl font-bold">{totalGuestBookings}</p>
          <p className="text-sm text-muted-foreground text-center">
            {t("bookingsOnYourProperties")}
          </p>
        </div>
      )}

      <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
        <CalendarX className="h-10 w-10 text-blue-500 mb-3" />
        <h3 className="text-xl font-medium text-center">{t("upcoming")}</h3>
        <p className="text-4xl font-bold">{totalUpcomingBooking}</p>
        <p className="text-sm text-muted-foreground text-center">
          {t("nextReservations")}
        </p>
      </div>
    </div>
  );
};
