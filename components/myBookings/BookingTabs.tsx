import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkRole } from "@/lib/clerk";
import { cn } from "@/lib/utils";
import { getBookedIMade, getRoomVisitorHaveMade } from "@/services/roomService";
import { auth } from "@clerk/nextjs/server";
import { CalendarCheck, CalendarRange, CalendarX } from "lucide-react";
import RoomCard from "../RoomCard";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import NoGuestReservation from "./NoGuestReservation";
import NoReservationMade from "./NoReservationMade";

export default async function BookingTabs() {
  const { userId } = auth();

  const roomBooked = await getBookedIMade(userId as string);
  const roomVisitorHaveMade = await getRoomVisitorHaveMade(userId as string);
  const isHost = checkRole("host");
  // Get some stats for the summary cards
  const totalMyBookings = roomBooked && roomBooked.length;
  const totalGuestBookings = roomVisitorHaveMade && roomVisitorHaveMade.length;
  const totalUpcomingBooking =
    roomBooked &&
    roomBooked.filter((booking) => booking.paymentStatus !== "succeeded")
      .length;
  console.log(roomBooked);

  return (
    <div className="space-y-8 w-full mx-auto">
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
          <CalendarRange className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-xl font-medium">Total Bookings</h3>
          <p className="text-4xl font-bold">{totalMyBookings}</p>
          <p className="text-sm text-muted-foreground">Your reserved rooms</p>
        </div>

        {isHost && (
          <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
            <CalendarCheck className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-xl font-medium">Guest Bookings</h3>
            <p className="text-4xl font-bold">{totalGuestBookings}</p>
            <p className="text-sm text-muted-foreground">
              Bookings on your properties
            </p>
          </div>
        )}

        <div className="bg-primary/5 rounded-lg p-8 border flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow">
          <CalendarX className="h-10 w-10 text-blue-500 mb-3" />
          <h3 className="text-xl font-medium">Upcoming</h3>
          <p className="text-4xl font-bold">{totalUpcomingBooking}</p>
          <p className="text-sm text-muted-foreground">Next reservations</p>
        </div>
      </div>

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
                <CalendarRange className="h-5 w-5" />
                <span className="text-base">My Bookings</span>
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
                  <CalendarCheck className="h-5 w-5" />
                  <span className="text-base">Guest Bookings</span>
                </span>
              </TabsTrigger>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
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
                        <CalendarCheck className="h-5 w-5" />
                        <span className="text-base">Guest Bookings</span>
                      </span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="w-[300px]">
                    vous devez etre host pour avoir acces a ces informations
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </TabsList>

          <TabsContent
            value="my-bookings"
            className="space-y-6 animate-in fade-in-50"
          >
            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  <span className="text-accent-gradient">Your Bookings</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Total: {totalMyBookings} bookings
                </p>
              </div>

              <Separator className="mb-8" />

              {roomBooked && roomBooked.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {roomBooked.map((room) => (
                    <RoomCard
                      key={room.id as string}
                      room={room as any}
                      userId={userId as string}
                    />
                  ))}
                </ul>
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
              <div className="bg-card p-8 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    <span className="text-accent-gradient">
                      Guest Bookings on Your Properties
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Total: {totalGuestBookings} bookings
                  </p>
                </div>

                <Separator className="mb-8" />

                {roomVisitorHaveMade.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {roomVisitorHaveMade.map((room) => (
                      <RoomCard
                        key={room.id as string}
                        room={room as any}
                        userId={userId as string}
                      />
                    ))}
                  </ul>
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
