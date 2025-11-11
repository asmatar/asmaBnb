import { getUserCount } from "@/lib/clerk";

import { getHotelCount, getRoomCount } from "@/services/counterService";
import { getTranslations } from "next-intl/server";
import Counter from "./Counter";
const CounterFetchWrapper = async () => {
  const t = await getTranslations("Counter");
  const userCount = await getUserCount();
  const hotelCount = await getHotelCount();
  const roomCount = await getRoomCount();
  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <Counter maximum={hotelCount ?? 0} label={t("hotels")} />
      <Counter maximum={userCount ?? 0} label={t("users")} />
      <Counter maximum={roomCount ?? 0} label={t("rooms")} />
    </div>
  );
};

export default CounterFetchWrapper;
