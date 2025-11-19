"use client";

import { useActiveItem } from "@/hooks/useActiveItem";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FaHeart, FaUser } from "react-icons/fa";
import { FaBars, FaHotel, FaUserPlus } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { LuHome, LuLogOut, LuMoon, LuSun } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import { Button } from "../ui/button";
import NavigationItem from "./NavigationItem";

function HeaderMobile() {
  const { activeListItem, setActiveListItem, handleClick } = useActiveItem<
    string | null
  >();
  const { setTheme, theme } = useTheme();
  const navigationListRef =
    useDetectOutsideClick<HTMLUListElement>(setActiveListItem);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useUser();
  const isHost = "host"; //user && user.publicMetadata.role === "host";
  const t = useTranslations("Header");
  const navigationConfig = [
    {
      key: "home",
      href: "/",
      icon: <LuHome className="h-5 w-5 text-primary" />,
      title: t("home"),
    },
    ...(!user
      ? [
          {
            key: "signIn",
            href: "/sign-in",
            icon: <FaUser className="h-5 w-5 text-primary" />,
            title: t("signIn"),
          },
          {
            key: "signUp",
            href: "/sign-up",
            icon: <FaUserPlus className="h-5 w-5 text-primary" />,
            title: t("signUp"),
          },
        ]
      : []),

    ...(user && isHost === "host"
      ? [
          {
            key: "addProperty",
            href: "/hotel/new",
            icon: <HiMiniPlus className="h-5 w-5 text-primary" />,
            title: t("addProperty"),
          },
          {
            key: "manageProperties",
            href: "/my-hotels",
            icon: <FaHotel className="h-5 w-5 text-primary" />,
            title: t("manageProperties"),
          },
        ]
      : []),
    ...(user
      ? [
          {
            key: "myBookings",
            href: "/my-bookings",
            icon: <TbBrandBooking className="h-5 w-5 text-primary" />,
            title: t("myBookings"),
          },
          {
            key: "savedProperties",
            href: "/favorites",
            icon: <FaHeart className="h-5 w-5 text-primary" />,
            title: t("savedProperties"),
          },
          {
            key: "signOut",
            href: "/",
            icon: <LuLogOut className="h-5 w-5 text-primary" />,
            title: t("signOut"),
            Element: <SignOutButton />,
          },
        ]
      : []),
    {
      key: "theme",
      icon:
        theme === "light" ? (
          <LuMoon
            className="h-5 w-5 text-primary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        ) : (
          <LuSun
            className="h-5 w-5 text-primary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        ),
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-6 -translate-y-1/2 right-4 h-16 z-[90]",
        isMobile ? "block" : "hidden",
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary border border-primary animate-pulse cursor-pointer"
          >
            <FaBars className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <ul
            className="flex flex-col items-end justify-center gap-4 px-4 pb-4"
            ref={navigationListRef}
          >
            {navigationConfig.map((item) => (
              <NavigationItem
                key={item.key}
                handleClick={(event) => handleClick(event, item.key)}
                isOpen={activeListItem === item.key}
                href={item.href}
                icon={item.icon}
                title={item.title}
                Element={item.Element}
              />
            ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderMobile;
