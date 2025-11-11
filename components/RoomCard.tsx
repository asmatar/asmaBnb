"use client";
import AddRoomForm from "@/components/AddRoomForm";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import SubmitButton from "@/components/SubmitButton";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import {
  createBooking,
  deleteBooking,
  existingBooking,
} from "@/services/bookingService";
import { deleteRoom } from "@/services/roomService";
import { RoomBooked } from "@/types/types";
import { useUser } from "@clerk/clerk-react";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import {
  AirVent,
  Bath,
  BedDouble,
  Castle,
  Home,
  MountainSnow,
  Plus,
  Ship,
  Trash,
  Trees,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TbReservedLine } from "react-icons/tb";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
const RoomCard = ({ room }: { room: RoomBooked; userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const leftDays = differenceInDays(date?.from ?? room.startDate, new Date());
  const numberOfNightsBooked = differenceInDays(
    date?.to ?? room.endDate,
    date?.from ?? room.startDate,
  );
  const handleDeleteRoom = async (formData: FormData) => {
    const response = await deleteRoom(formData);
    if (response.success === true) {
      toast.success("Room deleted successfully");
    } else {
      return toast.error(response.error);
    }
  };
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
    const { data } = await existingBooking(newBookingOne);
    if (data && data.length > 0) {
      return toast.error("Room already booked for this period");
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
            <div className="">
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
          {pathname.includes("my-bookings") && (
            <div className="flex flex-col gap-2">
              <CardTitle>{t("bookingDetails")}</CardTitle>
              <div className="text-primary/90">
                <div className="">
                  {t("roomBookedBy")} {room.username} {t("for")}{" "}
                  {numberOfNightsBooked} {t("nights")} {t("in")} {leftDays}{" "}
                  {t("days")}
                </div>
                <div className="">{t("checkIn")}</div>
                <div className="">{t("checkOut")}</div>
                {room.breakfastIncluded && <p>{t("breakfast")}</p>}
                {room.paymentStatus === "requires_payment_method" ? (
                  <span className="text-red-600">
                    {t("notPaid")} ${room.totalPrice} - {t("roomNotReserved")}
                  </span>
                ) : (
                  <span className="text-green-600">
                    {t("paid")} ${room.totalPrice} - {t("roomReserved")}
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
                    {t("viewHotel")}
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
                        {t("payNow")}
                      </Button>
                    </Link>

                    <form action={handleDeleteBooking}>
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
                  <p className="dark:text-slate-400">{t("selectDays")}</p>
                  <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    dateAlreadyBooked={dateAlreadyBooked}
                  />

                  {numberOfNights > 0 && (
                    <>
                      <p className="mt-2">{t("includeBreakfastTooltip")}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Input
                          type="checkbox"
                          checked={hasBreakfastIncluded}
                          onChange={() =>
                            setHasBreakfastIncluded((prev) => !prev)
                          }
                          className="w-4 h-4"
                        />
                        {t("includeBreakfast")}
                      </div>
                    </>
                  )}
                </div>
                <p className="mb-4">
                  {t("totalPrice")}:{" "}
                  <span className="font-bold">{totalPrice}€</span> {t("for")}{" "}
                  <span className="font-bold">
                    {numberOfNights} {t("days")}
                  </span>
                </p>

                <form action={handleCheckout}>
                  {!user ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <SubmitButton
                            variant="default"
                            className="w-full"
                            text={t("bookRoom")}
                            loadingText={t("bookingRoom")}
                            disabled={numberOfNights < 1}
                          >
                            <TbReservedLine className="h-4 w-4 mr-2" />
                          </SubmitButton>
                        </TooltipTrigger>
                        <TooltipContent>{t("bookRoomTooltip")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <SubmitButton
                      variant="default"
                      className="w-full"
                      text={t("bookRoom")}
                      loadingText={t("bookingRoom")}
                      disabled={numberOfNights < 1}
                    >
                      <TbReservedLine className="h-4 w-4 mr-2" />
                    </SubmitButton>
                  )}
                </form>
              </div>
            </>
          )}
          {pathname.includes("hotel") && !pathname.includes("details") && (
            <div className="flex w-full justify-between">
              <form action={handleDeleteRoom}>
                <input type="hidden" name="id" value={room.id} />
                <SubmitButton
                  type="submit"
                  variant="ghost"
                  className="bg-secondary"
                  text={t("deleteRoom")}
                  loadingText={t("deletingRoom")}
                >
                  <Trash className="h-4 w-4 mr-2" />
                </SubmitButton>
              </form>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="px-2 bg-secondary rounded-md flex items-center">
                  <Plus className="w-4 h-4 mr-3" />
                  {t("editRoom")}
                </DialogTrigger>
                <DialogContent className="max-w-[900px] w-[90%]">
                  <DialogHeader className="px-2">
                    <DialogTitle>{t("updateRoom")}</DialogTitle>
                    <DialogDescription>
                      {t("updateRoomDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <AddRoomForm room={room} setFormOpen={setIsDialogOpen} />
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
