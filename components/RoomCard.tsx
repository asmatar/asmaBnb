"use client";
import { RoomCardBookedView } from "@/components/RoomCardBookedView";
import RoomCardDetailView from "@/components/RoomCardDetailView";
import { RoomCardHotelView } from "@/components/RoomCardHotelView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  createBooking,
  deleteBooking,
  existingBooking,
} from "@/services/bookingService";
import { deleteRoom } from "@/services/roomService";
import { RoomCardProps } from "@/types/room";
import { Booking } from "@/types/tableType";
import { View } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import {
  AirVent,
  Bath,
  BedDouble,
  Castle,
  Home,
  MountainSnow,
  Ship,
  Trees,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const RoomCard = ({
  room,
  view,
  userId,
}: {
  room: RoomCardProps;
  userId?: string;
  view?: View;
}) => {
  const router = useRouter();
  const t = useTranslations("RoomCard");
  const { user } = useUser();
  const [hasBreakfastIncluded, setHasBreakfastIncluded] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDeleteBooking = async (formData: FormData) => {
    const response = await deleteBooking(formData);
    if (response.success === true) {
      toast.success("Reservation deleted successfully");
    } else {
      return toast.error(response.error);
    }
  };

  const numberOfNights =
    differenceInDays(date?.to ?? new Date(), date?.from ?? new Date()) < 0
      ? 0
      : differenceInDays(date?.to ?? new Date(), date?.from ?? new Date());
  const totalPrice = hasBreakfastIncluded
    ? numberOfNights * (room.roomPrice ?? 0) +
      numberOfNights * (room.breakfastPrice ?? 0)
    : numberOfNights * (room.roomPrice ?? 0);

  const handleDeleteRoom = async (formData: FormData) => {
    const response = await deleteRoom(formData);
    if (response.success === true) {
      toast.success("Room deleted successfully");
    } else {
      return toast.error(response.error);
    }
  };

  const dateAlreadyBooked =
    "booking" in room
      ? room.booking?.flatMap((booking: Booking) => {
          return eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          });
        }) ?? []
      : [];

  const handleCheckout = async () => {
    const id = uuidv4();
    const newBookingOne = {
      id,
      username: user!.firstName ?? "",
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
    const { data } = await existingBooking(newBookingOne);
    if (data && data.length > 0) {
      return toast.error("Room already booked for this period");
    }
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newBookingOne }),
    });
    const intentPayement: { paymentIntent: Stripe.PaymentIntent } =
      await response.json();

    const newBooking = {
      ...newBookingOne,
      paymentStatus: intentPayement.paymentIntent.status,
      paymentIntentId: intentPayement.paymentIntent.id,
      clientSecret: intentPayement.paymentIntent.client_secret,
    };
    const createdBookingResponse = await createBooking(newBooking);
    if (createdBookingResponse.success === true) {
      toast.success("Room booked successfully");
      router.push(`/checkout/${intentPayement.paymentIntent.id}`);
    } else {
      return toast.error(createdBookingResponse.error);
    }
  };
  return (
    <>
      <Card>
        <CardHeader className="mb-4 flex flex-col gap-4">
          <CardTitle className="break-words whitespace-normal">
            {room.roomTitle}
          </CardTitle>{" "}
          <div className="flex flex-col gap-4 relative h-[200px]">
            <Image
              fill
              src={room.image as string}
              alt={room.roomTitle as string}
              className="object-cover rounded-lg"
            />
          </div>
          <CardDescription className="min-h-[120px] max-h-[120px] overflow-y-auto">
            {room.roomDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
              <BedDouble className="h-4 w-4" />
              {room.bedCount} {t("beds")}
            </div>
            {room.bathroomCount !== 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Bath className="h-4 w-4" />
                {room.bathroomCount} {t("bathroom")}
              </div>
            )}
            {room.kingBed !== 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <BedDouble className="h-4 w-4" />
                {t("kingBed")}
              </div>
            )}
            {room.queenBed !== 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <BedDouble className="h-4 w-4" />
                {t("queenBed")}
              </div>
            )}
            {room.roomService && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <UtensilsCrossed className="h-4 w-4" />
                {t("roomService")}
              </div>
            )}
            {room.TV && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Bath className="h-4 w-4" />
                {t("TV")}
              </div>
            )}
            {room.balcony && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Home className="h-4 w-4" />
                {t("balcony")}
              </div>
            )}
            {room.freeWifi && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Wifi className="h-4 w-4" />
                {t("freeWifi")}
              </div>
            )}
            {room.cityView && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Castle className="h-4 w-4" />
                {t("cityView")}
              </div>
            )}
            {room.oceanView && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Ship className="h-4 w-4" />
                {t("oceanView")}
              </div>
            )}
            {room.forestView && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <Trees className="h-4 w-4" />
                {t("forestView")}
              </div>
            )}
            {room.mountainView && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <MountainSnow className="h-4 w-4" />
                {t("mountainView")}
              </div>
            )}
            {room.airCondition && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <AirVent className="h-4 w-4" />
                {t("airCondition")}
              </div>
            )}
            {room.soundProofed && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-3 py-2 rounded-lg">
                <VolumeX className="h-4 w-4" />
                {t("soundProofed")}
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex gap-4 justify-between">
            <div>
              {t("roomPrice")}:{" "}
              <span className="font-bold"> {room.roomPrice} €</span>
              <span className="text-xs"> /24hrs</span>
            </div>
            {!!room.breakfastPrice && (
              <div>
                {t("breakfastPrice")}:
                <span className="font-bold">{room.breakfastPrice} €</span>
              </div>
            )}
          </div>
          <Separator className="my-4" />
        </CardContent>
        <CardFooter>
          {"totalPrice" in room && view === "booked" && (
            <RoomCardBookedView
              date={date}
              userId={userId ?? ""}
              room={room}
              handleDeleteBooking={handleDeleteBooking}
            />
          )}
          {view === "details" && (
            <RoomCardDetailView
              date={date}
              setDate={setDate}
              dateAlreadyBooked={dateAlreadyBooked}
              numberOfNights={numberOfNights}
              hasBreakfastIncluded={hasBreakfastIncluded}
              setHasBreakfastIncluded={setHasBreakfastIncluded}
              totalPrice={totalPrice}
              handleCheckout={handleCheckout}
            />
          )}
          {view === "hotel" && (
            <RoomCardHotelView
              room={room}
              handleDeleteRoom={handleDeleteRoom}
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default RoomCard;
