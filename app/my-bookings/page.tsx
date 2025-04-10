import BookingTabs from "@/components/myBookings/BookingTabs";
import { checkRole } from "@/lib/clerk";
import { getBookedIMade, getRoomVisitorHaveMade } from "@/services/roomService";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = auth();

  const roomBooked = await getBookedIMade(userId as string);
  const roomVisitorHaveMade = await getRoomVisitorHaveMade(userId as string);
  const isHost = checkRole("host");

  return (
    <section className="container max-w-screen-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          My Bookings
        </h1>
        <BookingTabs
          roomBooked={roomBooked || []}
          roomVisitorHaveMade={roomVisitorHaveMade || []}
          userId={userId as string}
          isHost={isHost}
        />
      </div>
    </section>
  );
};

export default page;
