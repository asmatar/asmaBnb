import { Copiright } from "@/components/Header/Copiright";
import HeaderWrapper from "@/components/Header/HeaderWrapper";
import { LoginView } from "@/components/Header/LoginView";
import { LogoutView } from "@/components/Header/LogoutView";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { currentUser } from "@clerk/nextjs/server";
import HeaderMobile from "./HeaderMobile";

const Header = async () => {
  const user = await currentUser();

  return (
    <>
      <Copiright />
      <HeaderWrapper>
        <div className="flex items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-all hover:opacity-80"
          >
            <Logo />
          </Link>

          <div className="ml-auto flex items-center space-x-3">
            {user ? (
              <LoginView
                username={user.username ?? user.firstName!}
                email={user.emailAddresses[0].emailAddress}
              />
            ) : (
              <LogoutView />
            )}
          </div>
        </div>
      </HeaderWrapper>
      <HeaderMobile />
    </>
  );
};

export default Header;
