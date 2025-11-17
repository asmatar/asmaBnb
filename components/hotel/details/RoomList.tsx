import RoomCard from "@/components/RoomCard";
import { Booking, Room } from "@/types/tableType";
import NoRoom from "./NoRoom";
type R = Room & { booking: Booking[] };
export const RoomList = ({
  rooms,
  hotelId,
  userId,
}: {
  rooms: R[];
  hotelId: string;
  userId: string;
}) => {
  if (rooms.length === 0) return <NoRoom id={hotelId} userId={userId} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} userId={userId} view="details" />
      ))}
    </div>
  );
};

export default RoomList;
