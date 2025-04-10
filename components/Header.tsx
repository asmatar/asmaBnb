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
import { checkRole } from "@/lib/clerk";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { FaHeart, FaHotel, FaRegUser } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { LuChevronsUpDown } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";

const Header = async () => {
  const user = await currentUser();
  const username = user?.username;
  const firstName = user?.firstName;
  const isHost = checkRole("host");

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b z-[60] py-3">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Logo />
          </Link>

          {/* Right side navigation */}
          <div className="flex items-center gap-3">
            {username ? (
              <div className="flex items-center gap-3">
                {/* User name */}
                <span className="hidden md:inline-block text-sm font-medium">
                  Hello, {firstName || username}
                </span>
                {/* User button */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-9 w-9 border-2 border-primary/20 hover:border-primary/50 transition-all",
                      userButtonBox: "max-w-[150px]",
                    },
                  }}
                />{" "}
                <ModeToggle />
                {/* Menu dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 px-3 h-9 hover:bg-primary/10 transition-colors"
                    >
                      <span className="hidden sm:inline">Menu</span>
                      <LuChevronsUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <Link href="/my-bookings" className="w-full">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md p-2 transition-colors">
                        <TbBrandBooking className="h-4 w-4 text-primary" />
                        <span>My Bookings</span>
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/favorites" className="w-full">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md p-2 transition-colors">
                        <FaHeart className="h-4 w-4 text-rose-500" />
                        <span>My Favorites</span>
                      </DropdownMenuItem>
                    </Link>

                    {isHost && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Host options</DropdownMenuLabel>

                        <Link href="/hotel/new" className="w-full">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md p-2 transition-colors">
                            <HiMiniPlus className="h-4 w-4 text-green-500" />
                            <span>Add Hotel</span>
                          </DropdownMenuItem>
                        </Link>

                        <Link href="/my-hotels" className="w-full">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 rounded-md p-2 transition-colors">
                            <FaHotel className="h-4 w-4 text-blue-500" />
                            <span>My Hotels</span>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FaRegUser className="h-3 w-3" />
                    <span>Sign in</span>
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="shadow-sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
