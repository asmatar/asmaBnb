"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import useGlobalStore from "@/store/Global";
import { Diff } from "lucide-react";
import { useTranslations } from "next-intl";

const ComparatorLink = () => {
  const { comparator } = useGlobalStore();
  const t = useTranslations("Header");

  return (
    <Link
      href={`/hotel/comparator?hotel1=${comparator[0]}&hotel2=${comparator[1]}`}
      className="w-full"
    >
      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
        <Diff className="h-3.5 w-3.5 text-rose-500" />
        <span className="text-sm">{t("comparator")}</span>
      </DropdownMenuItem>
    </Link>
  );
};

export default ComparatorLink;
