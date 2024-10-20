"use client";
import AmenityItem from "@/components/AmenityItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { deleteRoom } from "@/services/supabaseApi";
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
  Plus,
  Ship,
  Trash,
  Trees,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AddRoomForm from "./AddRoomForm";
const RoomCard = ({ room }: { room: Room }) => {
  const pathname = usePathname();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.roomTitle}</CardTitle>
        <CardDescription className="min-h-[120px]">
          {room.roomDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 relative h-[55vw] sm:h-[30vw] xl:h-[20vw] max-h-[380px] mb-4">
          <Image
            fill
            src={room.image as string}
            alt={room.roomTitle as string}
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
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              {room.roomService} Room service
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
        <Separator className="my-4" />
        <div className="flex gap-4 justify-between">
          <div className="">
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs"> /24hrs</span>
          </div>
          {!!room.breakfastPrice && (
            <div>
              Breakfast Price:{" "}
              <span className="font-bold">${room.breakfastPrice}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {pathname.includes("details") ? (
          <div className="">detail</div>
        ) : (
          <div className="flex w-full justify-between">
            <Button
              type="button"
              variant="ghost"
              className="bg-secondary"
              onClick={() => deleteRoom(room.id)}
            >
              <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
            <Dialog>
              <DialogTrigger className="px-2 bg-secondary rounded-md flex items-center">
                <Plus className="w-4 h-4 mr-3" />
                Edit
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%]">
                <DialogHeader className="px-2">
                  <DialogTitle>Update your room</DialogTitle>
                  <DialogDescription>
                    Make changes to this room
                  </DialogDescription>
                </DialogHeader>
                <AddRoomForm room={room} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
