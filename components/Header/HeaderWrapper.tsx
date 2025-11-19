"use client";
//import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  //const { small } = useScroll();
  return (
    <header
      className={cn(
        "left-0 right-0 mx-auto sticky top-6 bg-background/80 backdrop-blur-md border-b z-[60] py-3   transition-all duration-300",
        isMobile ? "hidden lg:block" : "",
        /*         small
          ? "py-2 rounded-full w-1/2 min-w-[500px] mx-auto origin-center"
          : "py-3 w-full origin-center", */
      )}
    >
      <div className="container max-w-screen-2xl mx-auto">{children}</div>
    </header>
  );
};

export default HeaderWrapper;
