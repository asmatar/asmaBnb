"use client";
import AddRoomForm from "@/components/AddRoomForm";
import AmenityItem from "@/components/AmenityItem";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
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
import { deleteRoom } from "@/services/roomService";
import useBookingStore from "@/store/BookingStore";
import { Room } from "@/types/tableType";
import { useUser } from "@clerk/clerk-react";
import { eachDayOfInterval, format } from "date-fns";
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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TbReservedLine } from "react-icons/tb";
import { Input } from "./ui/input";

const RoomCard = ({ room }: { room: Room }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { addBooking, setPaymentStatus, setClientSecret } = useBookingStore();
  /*   const handleClick = () => {
    addBooking(newBooking);
  }; */
  console.log(room);
  const { user } = useUser();
  const [hasBreakfastIncluded, setHasBreakfastIncluded] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  console.log(date);
  const dateAlreadyBooked = room.booking?.flatMap((booking) => {
    return eachDayOfInterval({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    });
  });
  console.log("render");
  console.log(dateAlreadyBooked);
  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room }),
    });
    const intentPayement = await response.json();

    // const id = uuidv4();

    const newBooking = {
      //id,
      username: user!.firstName,
      user_email: user!.emailAddresses[0].emailAddress,
      user_id: user!.id,
      roomBooked: room.id,
      hotelBooked: room.hotel_id!,
      hotelOwnerId: room.user_id,
      startDate: format(date?.from ?? "", "LLL dd, y"),
      endDate: format(date?.to ?? "", "LLL dd, y"),
      totalPrice: intentPayement.paymentIntent.amount,
      currency: "usd",
      paymentStatus: intentPayement.paymentIntent.status,
      paymentIntentId: intentPayement.paymentIntent.id,
      breakfastIncluded: hasBreakfastIncluded,
    };
    /*await createBooking(newBooking); */

    setPaymentStatus(intentPayement.paymentIntent.status);
    setClientSecret(intentPayement.paymentIntent.client_secret);
    addBooking(newBooking);

    //router.push("/checkout");
  };
  return (
    <>
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
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <p className="dark:text-slate-400">
                    select days that you will spend in this room
                  </p>
                  <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    dateAlreadyBooked={dateAlreadyBooked}
                  />
                  <p>Do you want to include breakfast in the reservation ?</p>
                  <Input
                    type="checkbox"
                    checked={hasBreakfastIncluded}
                    onChange={() => setHasBreakfastIncluded((prev) => !prev)}
                  />
                </div>
                <p>
                  Total price: <span className="font-bold">200eur</span> for{" "}
                  <span className="font-bold">2 days</span>
                </p>
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={handleCheckout}
                >
                  <TbReservedLine className="h-4 w-4 mr-2" /> Book room
                </Button>
              </div>
            </>
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
    </>
  );
};

export default RoomCard;
