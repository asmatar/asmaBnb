import {
  Car,
  Clapperboard,
  Dumbbell,
  MapPin,
  ShoppingBasket,
  Utensils,
  Wine,
} from "lucide-react";
import { FaSwimmer } from "react-icons/fa";
import { FaSpa } from "react-icons/fa6";
import { MdDryCleaning } from "react-icons/md";

// dynamic metadata
type Props = {
  params: {
    hotelId: string;
  };
};
export const generateMetadata = ({ params }: Props) => {
  return {
    title: `Hotel Details - ${params.hotelId}`,
    description: `Details about the hotel: ${params.hotelId}`,
  };
};

const HotelId = () => {
  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[200px] md:h-[400px] rounded-lg">
        {/*    <Image
          fill
          src="/hotel-placeholder.jpg"
          alt="Hotel title"
          className="object-cover"
        ></Image> */}
      </div>
      <div>
        <h3 className="font-semibold text-xl md:text-3xl">Hotel title</h3>
        <div className="font-semibold mt-4">
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> country, state, city
          </div>
        </div>
        {/* amenityitem */}
        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <p className="text-primary/90 mb-2">
          hotel location description hotel location description hotel location
          description hotel location description
        </p>
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">
          hotel description Un havre de luxe niché au cœur de la ville, offrant
          une combinaison exquise de confort moderne et délégance intemporelle.
          Avec des chambres somptueusement aménagées, des équipements haut de
          gamme et un service attentif, cest ladresse idéale pour une escapade
          inoubliable. Détendez-vous dans un cadre raffiné où chaque détail est
          pensé pour surpasser vos attentes et créer des souvenirs inoubliables.
        </p>
        <h3 className="font-semibold text-lg mt-4 mb-2">popular amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <FaSwimmer className="w-4 h-4" /> Pool
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Dumbbell className="w-4 h-4" /> Gym
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <FaSpa className="w-4 h-4" /> Spa
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Wine className="w-4 h-4" /> Bar
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <MdDryCleaning className="w-4 h-4" /> Laundry Facilities
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Utensils className="w-4 h-4" /> Restaurants
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <ShoppingBasket className="w-4 h-4" /> Shopping
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" /> free Parking
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Clapperboard className="w-4 h-4" /> Movie Nights
          </div>
          {/* amenityitem */}
          {/* amenityitem */}
          <div className="flex items-center gap-1">
            <Wine className="w-4 h-4" /> Coffee shop
          </div>
          {/* amenityitem */}
        </div>
      </div>
    </div>
  );
};

export default HotelId;
