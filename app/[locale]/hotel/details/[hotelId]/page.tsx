import { getOneHotel } from "@/services/hotelService";
import { getRoomByHotel } from "@/services/roomService";

import { FeaturesSidebar } from "@/components/hotel/details/FeaturesSidebar";
import Hero from "@/components/hotel/details/Hero";
import RoomList from "@/components/hotel/details/RoomList";
import TextBlock from "@/components/hotel/details/TextBlock";
import Titles from "@/components/hotel/details/titles";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: { hotelId: string };
}) => {
  const hotel = await getOneHotel(params.hotelId ?? "");
  const t = await getTranslations("Metadata");
  return {
    title: `${t("hotelDetails.title")} - ${hotel?.title}`,
    description: `${hotel?.description}`,
  };
};
const HotelId = async ({ params }: { params: { hotelId: string } }) => {
  const hotel = await getOneHotel(params.hotelId ?? "");
  if (!hotel) return null;
  const rooms = await getRoomByHotel(params.hotelId ?? "");
  const t = await getTranslations("HotelDetails");
  return (
    <div className="min-h-screen bg-background">
      <Hero
        image={hotel.image}
        title={hotel.title}
        country={hotel.country}
        state={hotel.state}
        city={hotel.city}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <TextBlock title={t("location")}>{hotel.description}</TextBlock>

            <TextBlock title={t("location")}>
              {hotel.locationDescription}
            </TextBlock>

            <div className="block lg:hidden">
              <FeaturesSidebar
                mode="detail"
                swimingPool={hotel.swimingPool}
                gym={hotel.gym}
                spa={hotel.spa}
                bar={hotel.bar}
                restaurant={hotel.restaurant}
                freeWifi={hotel.freeWifi}
                freeParking={hotel.freeParking}
                shopping={hotel.shopping}
                bikeRental={hotel.bikeRental}
                laundry={hotel.laundry}
                movieNights={hotel.movieNights}
                coffeeShop={hotel.coffeeShop}
              />
            </div>
            <div className="space-y-6">
              <Titles>{t("availableRooms")}</Titles>
              <RoomList
                rooms={rooms}
                hotelId={hotel.id}
                userId={hotel.user_id}
              />
            </div>
          </div>

          <FeaturesSidebar
            mode="sidebar"
            swimingPool={hotel.swimingPool}
            gym={hotel.gym}
            spa={hotel.spa}
            bar={hotel.bar}
            restaurant={hotel.restaurant}
            freeWifi={hotel.freeWifi}
            freeParking={hotel.freeParking}
            shopping={hotel.shopping}
            bikeRental={hotel.bikeRental}
            laundry={hotel.laundry}
            movieNights={hotel.movieNights}
            coffeeShop={hotel.coffeeShop}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelId;
