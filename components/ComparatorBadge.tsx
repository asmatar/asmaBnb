"use client";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/store/Global";
import { Diff } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ComparatorBadge = ({ hotelId }: { hotelId: string }) => {
  const t = useTranslations("HotelCard");
  const { comparator, setComparator } = useGlobalStore();

  return comparator.length === 2 && !comparator.includes(hotelId) ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div>
            <Badge
              onClick={(event) => {
                event.preventDefault();
                toast.error(t("comparatorLimitReached"));
              }}
              className="bg-primary/10 text-gray-700  justify-start py-1 z-50 cursor-pointer flex gap-1 items-center"
            >
              <Diff className="w-4 h-4" />
              <span className="truncate text-xs">
                {comparator.includes(hotelId)
                  ? t("removeFromComparator")
                  : t("addToComparator")}
              </span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("comparatorLimitReached")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Badge
      className={cn(
        "bg-primary/10 text-primary hover:bg-primary/15 justify-start py-1 z-50 cursor-pointer flex gap-1 items-center",
        comparator.includes(hotelId) ? " text-red-600" : " text-green-600",
        comparator.length === 2 && !comparator.includes(hotelId)
          ? "text-gray-700"
          : "",
      )}
      onClick={(event) => {
        event.preventDefault();
        setComparator(hotelId);
      }}
    >
      <Diff className="w-4 h-4" />
      <span className="truncate text-xs">
        {comparator.includes(hotelId)
          ? t("removeFromComparator")
          : t("addToComparator")}
      </span>
    </Badge>
  );
};

export default ComparatorBadge;
