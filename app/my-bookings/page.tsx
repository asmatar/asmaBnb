import RoomCard from "@/components/RoomCard";
import { getBookedIMade, getRoomVisitorHaveMade } from "@/services/roomService";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = auth();

  const roomBooked = await getBookedIMade(userId as string);
  const roomVisitorHaveMade = await getRoomVisitorHaveMade(userId as string);

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
        Here are bookings you have made
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {roomBooked &&
          roomBooked.length > 0 &&
          roomBooked.map((room) => <RoomCard key={room.id} room={room} />)}
      </ul>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
        Here are bookings visitros have made on your properties
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {roomVisitorHaveMade &&
          roomVisitorHaveMade.length > 0 &&
          roomVisitorHaveMade.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
      </ul>
    </section>
  );
};

export default page;
