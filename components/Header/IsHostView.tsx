import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { getTranslations } from "next-intl/server";
import { FaHotel } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";

export const IsHostView = async () => {
  const t = await getTranslations("Header");
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1">
        {t("hostOptions")}
      </DropdownMenuLabel>

      <Link href="/hotel/new" className="w-full">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
          <HiMiniPlus className="h-4 w-4 text-green-500" />
          <span className="text-sm">{t("addProperty")}</span>
        </DropdownMenuItem>
      </Link>

      <Link href="/my-hotels" className="w-full">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
          <FaHotel className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-sm">{t("manageProperties")}</span>
        </DropdownMenuItem>
      </Link>
    </>
  );
};
