import { Copiright } from "@/components/Header/Copiright";
import { LoginView } from "@/components/Header/LoginView";
import { LogoutView } from "@/components/Header/LogoutView";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();

  return (
    <>
      <Copiright />
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
        </div>
      </header>
    </>
  );
};

export default Header;
