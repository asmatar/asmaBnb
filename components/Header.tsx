import { Logo } from "@/components/logo";

import { ModeToggle } from "@/components/theme";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHotel } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { LuChevronsUpDown } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  const username = user?.username;
  return (
    <>
      <header className="sticky top-0 border-b-primary/10 bg-secondary">
        <Container>
          <div className="flex justify-between">
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
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Link href="/hotel-new">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <HiMiniPlus />
                              Add Hotel
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FaHotel />
                          My Hotels
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
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
        </Container>
      </header>
    </>
  );
};

export default Header;
