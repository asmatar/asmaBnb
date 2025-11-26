import { IsHostView } from "@/components/Header/IsHostView";
import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";
import { ModeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { checkRole } from "@/lib/clerk";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { FaHeart } from "react-icons/fa6";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import ComparatorLink from "./ComparatorLink";

export const LoginView = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const isHost = checkRole("host");
  const t = await getTranslations("Header");

  return (
    <div className="flex items-center">
      <span className="hidden lg:inline-block text-sm font-normal mr-3 text-muted-foreground">
        {t("welcome")},{" "}
        <span className="font-medium text-foreground">{username}</span>
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9 rounded-full border-primary/20 hover:border-primary/40"
          >
            <LuLayoutDashboard className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline text-sm font-medium">
              {t("dashboard")}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-2 mt-1.5 z-[70]">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonBox: "w-full flex items-center gap-2",
                },
              }}
            />
            <div className="ml-2 flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{username}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <Link href="/my-bookings" className="w-full">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
              <TbBrandBooking className="h-4 w-4 text-primary" />
              <span className="text-sm">{t("myBookings")}</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/favorites" className="w-full">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
              <FaHeart className="h-3.5 w-3.5 text-rose-500" />
              <span className="text-sm">{t("savedProperties")}</span>
            </DropdownMenuItem>
          </Link>

          <ComparatorLink />

          {isHost && <IsHostView />}

          <DropdownMenuSeparator />
          <div className="flex justify-between items-center px-2 py-1.5">
            <span className="text-xs text-muted-foreground">{t("theme")}</span>
            <ModeToggle />
          </div>
          <LocaleSwitcher />

          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-red-50 text-red-600 rounded-md py-1.5 px-2">
              <LuLogOut className="h-4 w-4" />
              <span className="text-sm">{t("signOut")}</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
