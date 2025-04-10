import { getOneHotel } from "@/services/hotelService";
import { getRoomByHotel } from "@/services/roomService";

import NoRoom from "@/components/hotel/details/NoRoom";
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
  if (!hotel) return null;
  const rooms = await getRoomByHotel(params.hotelId ?? "");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {hotel.title}
          </h1>
          {hotel.country || hotel.state || hotel.city ? (
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">
                {hotel.country} {hotel.state && `${hotel.state},`} {hotel.city}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                À propos de l&apos;hôtel
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {hotel.description}
              </p>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Localisation</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {hotel.locationDescription}
              </p>
            </div>

            {/* Amenities - Visible on mobile/tablet */}
            <div className="lg:hidden space-y-6">
              <h2 className="text-2xl font-semibold">Équipements</h2>
              <div className="bg-card p-6 rounded-xl border border-primary/10">
                <div className="grid grid-cols-2 gap-4">
                  {hotel.swimingPool && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <FaSwimmer className="w-5 h-5 text-primary" />
                      <span>Piscine</span>
                    </div>
                  )}
                  {hotel.gym && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Dumbbell className="w-5 h-5 text-primary" />
                      <span>Salle de sport</span>
                    </div>
                  )}
                  {hotel.spa && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <FaSpa className="w-5 h-5 text-primary" />
                      <span>Spa</span>
                    </div>
                  )}
                  {hotel.bar && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Wine className="w-5 h-5 text-primary" />
                      <span>Bar</span>
                    </div>
                  )}
                  {hotel.freeWifi && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <MdDryCleaning className="w-5 h-5 text-primary" />
                      <span>WiFi gratuit</span>
                    </div>
                  )}
                  {hotel.restaurant && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span>Restaurant</span>
                    </div>
                  )}
                  {hotel.shopping && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <ShoppingBasket className="w-5 h-5 text-primary" />
                      <span>Boutiques</span>
                    </div>
                  )}
                  {hotel.bikeRental && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Bike className="w-5 h-5 text-primary" />
                      <span>Location de vélos</span>
                    </div>
                  )}
                  {hotel.freeParking && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Car className="w-5 h-5 text-primary" />
                      <span>Parking gratuit</span>
                    </div>
                  )}
                  {hotel.laundry && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <MdLocalLaundryService className="w-5 h-5 text-primary" />
                      <span>Service de blanchisserie</span>
                    </div>
                  )}
                  {hotel.movieNights && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Clapperboard className="w-5 h-5 text-primary" />
                      <span>Soirées cinéma</span>
                    </div>
                  )}
                  {hotel.coffeeShop && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Wine className="w-5 h-5 text-primary" />
                      <span>Cafétéria</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Chambres disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <RoomCard key={room.id} room={room} userId={room.user_id} />
                  ))
                ) : (
                  <NoRoom id={hotel.id} userId={hotel.user_id} />
                )}
              </div>
            </div>
          </div>

          {/* Amenities Sidebar - Visible on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-card p-6 rounded-xl border border-primary/10">
                <h2 className="text-2xl font-semibold mb-6">Équipements</h2>
                <div className="grid grid-cols-1 gap-4">
                  {hotel.swimingPool && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <FaSwimmer className="w-5 h-5 text-primary" />
                      <span>Piscine</span>
                    </div>
                  )}
                  {hotel.gym && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Dumbbell className="w-5 h-5 text-primary" />
                      <span>Salle de sport</span>
                    </div>
                  )}
                  {hotel.spa && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <FaSpa className="w-5 h-5 text-primary" />
                      <span>Spa</span>
                    </div>
                  )}
                  {hotel.bar && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Wine className="w-5 h-5 text-primary" />
                      <span>Bar</span>
                    </div>
                  )}
                  {hotel.freeWifi && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <MdDryCleaning className="w-5 h-5 text-primary" />
                      <span>WiFi gratuit</span>
                    </div>
                  )}
                  {hotel.restaurant && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span>Restaurant</span>
                    </div>
                  )}
                  {hotel.shopping && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <ShoppingBasket className="w-5 h-5 text-primary" />
                      <span>Boutiques</span>
                    </div>
                  )}
                  {hotel.bikeRental && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Bike className="w-5 h-5 text-primary" />
                      <span>Location de vélos</span>
                    </div>
                  )}
                  {hotel.freeParking && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Car className="w-5 h-5 text-primary" />
                      <span>Parking gratuit</span>
                    </div>
                  )}
                  {hotel.laundry && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <MdLocalLaundryService className="w-5 h-5 text-primary" />
                      <span>Service de blanchisserie</span>
                    </div>
                  )}
                  {hotel.movieNights && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Clapperboard className="w-5 h-5 text-primary" />
                      <span>Soirées cinéma</span>
                    </div>
                  )}
                  {hotel.coffeeShop && (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Wine className="w-5 h-5 text-primary" />
                      <span>Cafétéria</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelId;
