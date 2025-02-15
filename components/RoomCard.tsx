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
import {
  createBooking,
  deleteBooking,
  existingBooking,
} from "@/services/bookingService";
import { deleteRoom } from "@/services/roomService";
import { Room } from "@/types/tableType";
import { useUser } from "@clerk/clerk-react";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TbReservedLine } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import SubmitButton from "./SubmitButton";
import { Input } from "./ui/input";

const RoomCard = ({ room }: { room: Room }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUser();
  const [hasBreakfastIncluded, setHasBreakfastIncluded] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  const numberOfNights =
    differenceInDays(date?.to ?? new Date(), date?.from ?? new Date()) < 0
      ? 0
      : differenceInDays(date?.to ?? new Date(), date?.from ?? new Date());

  const leftDays = differenceInDays(date?.from ?? room.startDate, new Date());
  const numberOfNightsBooked = differenceInDays(
    date?.to ?? room.endDate,
    date?.from ?? room.startDate,
  );

  const totalPrice = hasBreakfastIncluded
    ? numberOfNights * (room.roomPrice ?? 0) +
      numberOfNights * (room.breakfastPrice ?? 0)
    : numberOfNights * (room.roomPrice ?? 0);
  const dateAlreadyBooked = room.booking?.flatMap((booking) => {
    return eachDayOfInterval({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    });
  });

  const handleCheckout = async () => {
    const id = uuidv4();
    const newBookingOne = {
      id,
      username: user!.firstName,
      user_email: user!.emailAddresses[0].emailAddress,
      user_id: user!.id,
      roomBooked: room.id,
      hotelBooked: room.hotel_id!,
      hotelOwnerId: room.user_id,
      startDate: format(date?.from ?? "", "LLL dd, y"),
      endDate: format(date?.to ?? "", "LLL dd, y"),
      currency: "usd",
      totalPrice: totalPrice,
      breakfastIncluded: hasBreakfastIncluded,
    };
    const existedBooking = await existingBooking(newBookingOne);
    if (existedBooking?.length > 0) {
      return;
    }
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newBookingOne }),
    });
    const intentPayement = await response.json();

    const newBooking = {
      ...newBookingOne,
      paymentStatus: intentPayement.paymentIntent.status,
      paymentIntentId: intentPayement.paymentIntent.id,
      clientSecret: intentPayement.paymentIntent.client_secret,
    };
    await createBooking(newBooking);

    router.push(`/checkout/${intentPayement.paymentIntent.id}`);
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
          <Separator className="my-4" />
        </CardContent>
        <CardFooter>
          {pathname.includes("my-bookings") && (
            <div className="flex flex-col gap-2">
              <CardTitle>Booking Details</CardTitle>
              <div className="text-primary/90">
                <div className="">
                  Room booked by {room.username} for {numberOfNightsBooked}{" "}
                  nuit(s) - dans {leftDays} jour(s)
                </div>
                <div className="">Check-in: {room.startDate} at 11am</div>
                <div className="">Check-out: {room.endDate} at 17pm</div>
                {room.breakfastIncluded && <p>breakfast will be served</p>}
                {room.paymentStatus === "requires_payment_method" ? (
                  <span className="text-red-600">
                    not paid ${room.totalPrice} - room not reserved
                  </span>
                ) : (
                  <span className="text-green-600">
                    Paid ${room.totalPrice} - room Reserved
                  </span>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-4 justify-between">
                <Link href={`/hotel/details/${room.hotel_id}`}>
                  <Button
                    variant="outline"
                    type="button"
                    className=" text-primary py-2 px-4 rounded-lg w-full"
                  >
                    View Hotel
                  </Button>
                </Link>
                {room.paymentStatus === "requires_payment_method" ? (
                  <>
                    <Link href={`/checkout/${room.paymentIntentId}`}>
                      <Button
                        variant="outline"
                        type="button"
                        className=" text-primary py-2 px-4 rounded-lg w-full"
                      >
                        Pay now
                      </Button>
                    </Link>

                    <form action={deleteBooking}>
                      <input type="hidden" name="id" value={room.id} />
                      <SubmitButton
                        variant="outline"
                        className="bg-secondary"
                        text="Delete reservation"
                        loadingText="deleting reservation..."
                      />
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          )}
          {pathname.includes("details") && (
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

                  {numberOfNights > 0 && (
                    <>
                      <p className="mt-2">
                        Do you want to include breakfast in the reservation ?
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <Input
                          type="checkbox"
                          checked={hasBreakfastIncluded}
                          onChange={() =>
                            setHasBreakfastIncluded((prev) => !prev)
                          }
                          className="w-4 h-4"
                        />
                        Include Breakfast
                      </div>
                    </>
                  )}
                </div>
                <p className="mb-4">
                  Total price:{" "}
                  <span className="font-bold">
                    {totalPrice}
                    eur
                  </span>{" "}
                  for <span className="font-bold">{numberOfNights} days</span>
                </p>
                <form action={handleCheckout}>
                  <SubmitButton
                    variant="default"
                    className="w-full"
                    text="Book room"
                    loadingText="Booking room..."
                    disabled={numberOfNights < 1}
                  >
                    <TbReservedLine className="h-4 w-4 mr-2" />
                  </SubmitButton>
                </form>
              </div>
            </>
          )}
          {pathname.includes("hotel") && !pathname.includes("details") && (
            <div className="flex w-full justify-between">
              <form action={() => deleteRoom(room.id)}>
                <SubmitButton
                  type="button"
                  variant="ghost"
                  className="bg-secondary"
                  text="Delete room"
                  loadingText="deleting room..."
                >
                  <Trash className="h-4 w-4 mr-2" />
                </SubmitButton>
              </form>
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
