import NoRoom from "@/components/hotel/details/NoRoom";
import RoomCard from "@/components/RoomCard";
import { RoomCardProps } from "@/types/room";

export const RoomList = ({
  rooms,
  hotelId,
  userId,
}: {
  rooms: RoomCardProps[];
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
