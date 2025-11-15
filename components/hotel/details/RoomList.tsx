import RoomCard from "@/components/RoomCard";
import { Room } from "@/types/tableType";
import NoRoom from "./NoRoom";
export const RoomList = ({
  rooms,
  hotelId,
  userId,
}: {
  rooms: Room[];
  hotelId: string;
  userId: string;
}) => {
  if (rooms.length === 0) return <NoRoom id={hotelId} userId={userId} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} userId={userId} />
      ))}
    </div>
  );
};

export default RoomList;
