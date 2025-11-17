import AddHotelForm from "@/components/AddHotelForm";
import RoomCard from "@/components/RoomCard";
import { getOneHotel } from "@/services/hotelService";
import { getAllCountries } from "@/services/locationService";
import { getRoomByHotel } from "@/services/roomService";
import { Hotel, Room } from "@/types/tableType";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export const generateMetadata = async ({
  params,
}: {
  params: { hotelId: string };
}): Promise<Metadata> => {
  const hotelId = params.hotelId ?? "";
  const hotel = await getOneHotel(hotelId);
  return {
    title: `Modifier ${hotel?.title ?? "Hôtel"}`,
    description:
      "Gérez les détails de votre hôtel, ajoutez, modifiez ou supprimez des chambres, et mettez à jour les informations de votre établissement.",
  };
};

async function page({ params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId ?? "";
  const t = await getTranslations("Hotel");
  const [rooms, hotel] = (await Promise.all([
    hotelId && getRoomByHotel(hotelId),
    getOneHotel(hotelId),
  ])) as [Room[], Hotel];

  const countries = await getAllCountries();

  return (
    <>
      <AddHotelForm countries={countries} hotel={hotel} />

      {rooms.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold my-4 mb-4">{t("hotelRooms")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} view="hotel" />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default page;
