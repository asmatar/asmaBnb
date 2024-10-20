import { Logo } from "@/components/Logo";

import { ModeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkRole } from "@/lib/clerk";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { FaHotel } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { LuChevronsUpDown } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";

const Header = async () => {
  const user = await currentUser();
  const username = user?.username;

  return (
    <>
      <header className="sticky top-0 border border-b-primary/10 bg-secondary z-40   py-4 ">
        {/* <Container> */}
        <div className="flex justify-between mx-auto max-w-[1920px] xl:px-20 w-full max-auto">
          <Link href="/" className="flex gap-2 items-center cursor-pointer">
            <Logo />
          </Link>
          <div className="flex gap-2 items-center">
            <div className="cursor-pointer">
              <ModeToggle />
            </div>
            {username ? (
              <>
                <div className="cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <LuChevronsUpDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {checkRole("host") && (
                        <>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Link href="/hotel/new">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <HiMiniPlus />
                                Add Hotel
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuItem>
                          <Link href="/my-hotels">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <FaHotel />
                              My Hotels
                            </DropdownMenuItem>{" "}
                          </Link>
                        </>
                      )}
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <TbBrandBooking />
                        My Bookings
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <UserButton afterSignOutUrl="/" showName />
              </>
            ) : (
              <div className="flex items-center gap-1">
                <Link href={"/sign-in"}>
                  <Button variant="secondary">Sign-in</Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button variant="default">Sign-up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/*  </Container> */}
      </header>
    </>
  );
};

export default Header;
