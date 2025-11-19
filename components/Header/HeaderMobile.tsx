"use client";

import { useActiveItem } from "@/hooks/useActiveItem";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";
import { FaHeart } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { LuHome } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import NavigationItem from "./NavigationItem";

function HeaderMobile() {
  const { activeListItem, setActiveListItem, handleClick } = useActiveItem<
    string | null
  >();
  const navigationListRef =
    useDetectOutsideClick<HTMLUListElement>(setActiveListItem);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const t = useTranslations("Header");
  const navigationConfig = [
    {
      href: "/",
      icon: <LuHome className="h-5 w-5 text-primary" />,
      title: t("home"),
    },
    {
      href: "/my-bookings",
      icon: <TbBrandBooking className="h-5 w-5 text-primary" />,
      title: t("myBookings"),
    },
    {
      href: "/favorites",
      icon: <FaHeart className="h-5 w-5 text-primary" />,
      title: t("savedProperties"),
    },
    {
      href: "/hotel/new",
      icon: <HiMiniPlus className="h-5 w-5 text-primary" />,
      title: t("addProperty"),
    },
  ];

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 right-6 h-16 z-[90]",
        isMobile ? "block" : "hidden",
      )}
    >
      <ul
        className="flex flex-col items-end justify-center gap-4 px-4"
        ref={navigationListRef}
      >
        {navigationConfig.map((item) => (
          <NavigationItem
            key={item.href}
            {...item}
            handleClick={(event) => handleClick(event, item.title)}
            isOpen={activeListItem === item.title}
          />
        ))}
      </ul>
    </div>
  );
}

export default HeaderMobile;
