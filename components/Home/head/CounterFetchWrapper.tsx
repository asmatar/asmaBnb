import { getUserCount } from "@/lib/clerk";

import { getHotelCount, getRoomCount } from "@/services/counterService";
import Counter from "./Counter";

const CounterFetchWrapper = async () => {
  const userCount = await getUserCount();
  const hotelCount = await getHotelCount();
  const roomCount = await getRoomCount();
  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <Counter maximum={hotelCount ?? 0} label="Hôtels" />
      <Counter maximum={userCount ?? 0} label="Users" />
      <Counter maximum={roomCount ?? 0} label="Rooms" />
    </div>
  );
};

export default CounterFetchWrapper;
