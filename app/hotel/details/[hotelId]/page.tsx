import { getOneHotel } from "@/services/hotelService";
import { getRoomByHotel } from "@/services/roomService";

import RoomCard from "@/components/RoomCard";
import {
  Bike,
  Car,
  Clapperboard,
  Dumbbell,
  MapPin,
  ShoppingBasket,
  Utensils,
  Wine,
} from "lucide-react";
import Image from "next/image";
import { FaSwimmer } from "react-icons/fa";
import { FaSpa } from "react-icons/fa6";
import { MdDryCleaning, MdLocalLaundryService } from "react-icons/md";

const HotelId = async ({ params }: { params: { hotelId: string } }) => {
  const hotel = await getOneHotel(params.hotelId ?? "");

  const rooms = await getRoomByHotel(params.hotelId ?? "");

  return (
    <section className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[350px] md:h-[600px] rounded-lg">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        ></Image>
      </div>
      <section className="mb-8">
        <h1 className="font-semibold text-xl md:text-3xl">{hotel.title}</h1>
        {hotel.country || hotel.state || hotel.city ? (
          <div className="font-semibold mt-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {hotel.country}{" "}
              {hotel.state + ", "}
              {hotel.city}
            </div>
          </div>
        ) : null}

        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">popular amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {hotel.swimingPool && (
            <div className="flex items-center gap-1">
              <FaSwimmer className="w-4 h-4" /> Pool
            </div>
          )}

          {hotel.gym && (
            <div className="flex items-center gap-1">
              <Dumbbell className="w-4 h-4" /> Gym
            </div>
          )}

          {hotel.spa && (
            <div className="flex items-center gap-1">
              <FaSpa className="w-4 h-4" /> Spa
            </div>
          )}

          {hotel.bar && (
            <div className="flex items-center gap-1">
              <Wine className="w-4 h-4" /> Bar
            </div>
          )}

          {hotel.freeWifi && (
            <div className="flex items-center gap-1">
              <MdDryCleaning className="w-4 h-4" /> Laundry Facilities
            </div>
          )}

          {hotel.restaurant && (
            <div className="flex items-center gap-1">
              <Utensils className="w-4 h-4" /> Restaurants
            </div>
          )}

          {hotel.shopping && (
            <div className="flex items-center gap-1">
              <ShoppingBasket className="w-4 h-4" /> Shopping
            </div>
          )}
          {hotel.bikeRental && (
            <div className="flex items-center gap-1">
              <Bike className="w-4 h-4" /> free Parking
            </div>
          )}

          {hotel.freeParking && (
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4" /> free Parking
            </div>
          )}
          {hotel.laundry && (
            <div className="flex items-center gap-1">
              <MdLocalLaundryService className="w-4 h-4" /> Laundry Facilities
            </div>
          )}

          {hotel.movieNights && (
            <div className="flex items-center gap-1">
              <Clapperboard className="w-4 h-4" /> Movie Nights
            </div>
          )}

          {hotel.coffeeShop && (
            <div className="flex items-center gap-1">
              <Wine className="w-4 h-4" /> Coffee shop
            </div>
          )}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold my-4">Rooms availiable</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} params={params} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default HotelId;
