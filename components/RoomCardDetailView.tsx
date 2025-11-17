import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { DateRange } from "react-day-picker";
import { TbReservedLine } from "react-icons/tb";
import { DatePickerWithRange } from "./DatePickerWithRange";
import SubmitButton from "./SubmitButton";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const RoomCardDetailView = ({
  numberOfNights,
  hasBreakfastIncluded,
  setHasBreakfastIncluded,
  totalPrice,
  handleCheckout,
  date,
  setDate,
  dateAlreadyBooked,
}: {
  numberOfNights: number;
  hasBreakfastIncluded: boolean;
  setHasBreakfastIncluded: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  handleCheckout: () => void;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  dateAlreadyBooked: Date[];
}) => {
  const t = useTranslations("RoomCard");
  const { user } = useUser();
  console.log("---------user----------", user);
  return (
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
                onChange={() => setHasBreakfastIncluded((prev) => !prev)}
                className="w-4 h-4"
              />
              {t("includeBreakfast")}
            </div>
          </>
        )}
      </div>
      <p className="mb-4">
        {t("totalPrice")}: <span className="font-bold">{totalPrice}€</span>{" "}
        {t("for")}{" "}
        <span className="font-bold">
          {numberOfNights} {t("days")}
        </span>
      </p>
      <form action={handleCheckout}>
        {!user ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-not-allowed">
                  <SubmitButton
                    variant="default"
                    className="w-full"
                    text={t("bookRoom")}
                    loadingText={t("bookingRoom")}
                    disabled={numberOfNights < 1}
                  >
                    <TbReservedLine className="h-4 w-4 mr-2" />
                  </SubmitButton>
                </div>
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
  );
};

export default RoomCardDetailView;
