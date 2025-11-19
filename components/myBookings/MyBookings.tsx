import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkRole } from "@/lib/clerk";
import { cn } from "@/lib/utils";
import { getBookedIMade, getRoomVisitorHaveMade } from "@/services/roomService";
import { RoomBooked } from "@/types/room";
import { auth } from "@clerk/nextjs/server";
import { CalendarCheck, CalendarRange } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Separator } from "../ui/separator";
import { GuestReservationList } from "./GuestReservationList";
import { Informations } from "./Informations";
import { MyReservationList } from "./MyReservationList";
import NoGuestReservation from "./NoGuestReservation";
import NoReservationMade from "./NoReservationMade";

export default async function MyBookings() {
  const { userId } = auth();
  const t = await getTranslations("BookingTabs");

  const roomBooked: RoomBooked[] | null = await getBookedIMade(userId ?? "");
  const roomVisitorHaveMade = await getRoomVisitorHaveMade(userId ?? "");
  const isHost = checkRole("host");
  const totalMyBookings = roomBooked && roomBooked.length;
  const totalGuestBookings = roomVisitorHaveMade && roomVisitorHaveMade.length;
  const totalUpcomingBooking =
    roomBooked &&
    roomBooked.filter((booking) => booking.paymentStatus !== "succeeded")
      .length;

  return (
    <div className="space-y-8 w-full mx-auto">
      <Informations
        totalMyBookings={totalMyBookings ?? 0}
        totalGuestBookings={totalGuestBookings ?? 0}
        totalUpcomingBooking={totalUpcomingBooking ?? 0}
        isHost={isHost}
      />
      <div className="bg-background rounded-lg shadow-sm p-2 mb-6">
        <Tabs defaultValue="my-bookings" className="w-full">
          <TabsList className="w-full mb-8 grid grid-cols-2 p-1 bg-muted/30">
            <TabsTrigger
              value="my-bookings"
              className={cn(
                "py-4 transition-all duration-200",
                "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium",
                "data-[state=active]:border-b-2 data-[state=active]:border-primary",
                "data-[state=inactive]:bg-background data-[state=inactive]:hover:bg-muted/20",
              )}
            >
              <span className="flex items-center gap-3">
                <CalendarRange className="h-5 w-5 hidden sm:block" />
                <span className="text-base">{t("myBookings")}</span>
              </span>
            </TabsTrigger>
            {isHost ? (
              <TabsTrigger
                value="guest-bookings"
                disabled={!isHost}
                className={cn(
                  "py-4 transition-all duration-200",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium",
                  "data-[state=active]:border-b-2 data-[state=active]:border-primary",
                  "data-[state=inactive]:bg-background data-[state=inactive]:hover:bg-muted/20",
                  !isHost && "opacity-50",
                )}
              >
                <span className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 hidden sm:block" />
                  <span className="text-base">{t("guestBookings")}</span>
                </span>
              </TabsTrigger>
            ) : null}
          </TabsList>

          <TabsContent
            value="my-bookings"
            className="space-y-6 animate-in fade-in-50"
          >
            <div className="bg-card py-6 px-2 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  <span className="text-accent-gradient">
                    {t("yourBookings")}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("total")}: {totalMyBookings} {t("bookings")}
                </p>
              </div>

              <Separator className="mb-8" />

              {roomBooked && roomBooked.length > 0 ? (
                <MyReservationList
                  roomBooked={roomBooked}
                  userId={userId as string}
                />
              ) : (
                <NoReservationMade />
              )}
            </div>
          </TabsContent>

          {isHost && (
            <TabsContent
              value="guest-bookings"
              className="space-y-6 animate-in fade-in-50"
            >
              <div className="bg-card py-6 px-2 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    <span className="text-accent-gradient">
                      {t("guestBookingsOnYourProperties")}
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("total")}: {totalGuestBookings} {t("bookings")}
                  </p>
                </div>

                <Separator className="mb-8" />

                {roomVisitorHaveMade && roomVisitorHaveMade.length > 0 ? (
                  <GuestReservationList
                    roomVisitorHaveMade={roomVisitorHaveMade}
                    userId={userId as string}
                  />
                ) : (
                  <NoGuestReservation />
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
