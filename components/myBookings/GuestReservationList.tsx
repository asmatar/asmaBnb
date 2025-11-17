import RoomCard from "@/components/RoomCard";
import { RoomCardProps } from "@/types/room";
export const GuestReservationList = ({
  roomVisitorHaveMade,
  userId,
}: {
  roomVisitorHaveMade: RoomCardProps[];
  userId: string;
}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {roomVisitorHaveMade.map((room) => (
        <RoomCard
          view="booked"
          key={room.id as string}
          room={room}
          userId={userId as string}
        />
      ))}
    </ul>
  );
};
