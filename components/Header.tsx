import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { checkRole } from "@/lib/clerk";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { FaHeart, FaHotel, FaRegUser } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "../i18n/navigation";
import LocaleSwitcher from "./i18n/LocaleSwitcher";

const Header = async () => {
  const user = await currentUser();
  const username = user?.username;
  const firstName = user?.firstName;
  const isHost = checkRole("host");
  const t = await getTranslations("Header");
  return (
    <>
      <div className="bg-secondary/80 border-b py-1 text-center text-xs font-medium">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
          <span className="gradient-text">
            {t("developer")}
            {"  "} Deruelle Arthur
          </span>
        </div>
      </div>

      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b z-[60] py-3">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-all hover:opacity-80"
            >
              <Logo />
            </Link>

            <div className="ml-auto flex items-center space-x-3">
              {username ? (
                <div className="flex items-center">
                  <span className="hidden lg:inline-block text-sm font-normal mr-3 text-muted-foreground">
                    {t("welcome")},{" "}
                    <span className="font-medium text-foreground">
                      {firstName || username}
                    </span>
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

                    <DropdownMenuContent
                      align="end"
                      className="w-56 p-2 mt-1.5 z-[70]"
                    >
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
                          <p className="text-sm font-medium truncate">
                            {firstName || username}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user?.emailAddresses[0]?.emailAddress}
                          </p>
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
                          <span className="text-sm">
                            {t("savedProperties")}
                          </span>
                        </DropdownMenuItem>
                      </Link>

                      {isHost && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1">
                            {t("hostOptions")}
                          </DropdownMenuLabel>

                          <Link href="/hotel/new" className="w-full">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
                              <HiMiniPlus className="h-4 w-4 text-green-500" />
                              <span className="text-sm">
                                {t("addProperty")}
                              </span>
                            </DropdownMenuItem>
                          </Link>

                          <Link href="/my-hotels" className="w-full">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md py-1.5 px-2">
                              <FaHotel className="h-3.5 w-3.5 text-blue-500" />
                              <span className="text-sm">
                                {t("manageProperties")}
                              </span>
                            </DropdownMenuItem>
                          </Link>
                        </>
                      )}

                      <DropdownMenuSeparator />
                      <div className="flex justify-between items-center px-2 py-1.5">
                        <span className="text-xs text-muted-foreground">
                          {t("theme")}
                        </span>
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
              ) : (
                <div className="flex items-center gap-2">
                  <LocaleSwitcher />
                  <ModeToggle />
                  <Separator orientation="vertical" className="h-6" />
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5"
                    >
                      <FaRegUser className="h-3 w-3" />
                      <span>{t("signIn")}</span>
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="gradient" size="sm" className="shadow-sm">
                      {t("joinNow")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
