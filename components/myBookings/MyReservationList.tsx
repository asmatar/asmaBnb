import RoomCard from "@/components/RoomCard";
import { RoomCardProps } from "@/types/room";

export const MyReservationList = ({
  roomBooked,
  userId,
}: {
  roomBooked: RoomCardProps[];
  userId: string;
}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
      {roomBooked.map((room) => (
        <RoomCard
          view="booked"
          key={room.id}
          room={room}
          userId={userId as string}
        />
      ))}
    </ul>
  );
};
