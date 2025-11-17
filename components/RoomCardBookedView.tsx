import { Link } from "@/i18n/navigation";
import { RoomBooked } from "@/types/room";
import { useTranslations } from "next-intl";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export const RoomCardBookedView = ({
  room,
  leftDays,
  numberOfNightsBooked,
  handleDeleteBooking,
}: {
  room: RoomBooked;
  leftDays: number;
  numberOfNightsBooked: number;
  handleDeleteBooking: (formData: FormData) => void;
}) => {
  const t = useTranslations("RoomCard");
  return (
    <div className="flex flex-col gap-2">
      <CardTitle>{t("bookingDetails")}</CardTitle>
      <div className="text-primary/90">
        <div className="">
          {t("roomBookedBy")} {room.username} {t("for")} {numberOfNightsBooked}{" "}
          {t("nights")} {t("in")} {leftDays} {t("days")}
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
  );
};
