import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/types/tableType";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  BedDoubleIcon,
  Castle,
  Home,
  MountainSnow,
  Ship,
  Trees,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import AmenityItem from "./AmenityItem";

const roomCard = ({ room }: { room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 relative h-[55vw] sm:h-[30vw] xl:h-[20vw] max-h-[380px] mb-4">
          <Image
            fill
            src={room.image as string}
            alt={room.title as string}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" />
            {room.bedCount}
            Bed
          </AmenityItem>
          <AmenityItem>
            <Users className="h-4 w-4" />
            {room.guestCount}
            Guest
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" />
            {room.bathroomCount} Bathroom
          </AmenityItem>

          {room.kingBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" />
              {room.kingBed} King Bed
            </AmenityItem>
          )}
          {room.queenBed && (
            <AmenityItem>
              <BedDoubleIcon className="h-4 w-4" />
              {room.queenBed} Queen Bed
            </AmenityItem>
          )}
          {room.roomservice && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              {room.roomservice} Room service
            </AmenityItem>
          )}
          {room.TV && (
            <AmenityItem>
              <Bath className="h-4 w-4" />
              {room.TV} TV
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              {room.balcony} Balcony
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" />
              {room.freeWifi} Free Wifi
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              {room.cityView} City View
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" />
              {room.oceanView} Ocean View
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" />
              {room.forestView} Forest View
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              {room.mountainView} Mountain View
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" />
              {room.airCondition} Air Condition
            </AmenityItem>
          )}
          {room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" />
              {room.soundProofed} Sound Proofed
            </AmenityItem>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default roomCard;
