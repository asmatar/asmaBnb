"use client";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <header
      className={cn(
        "left-0 right-0 mx-auto sticky top-6 bg-background/80 backdrop-blur-md border-b z-[60] py-3   transition-all duration-300",
        isMobile ? "hidden lg:block" : "",
      )}
    >
      <div className="container max-w-screen-2xl mx-auto">{children}</div>
    </header>
  );
};

export default HeaderWrapper;
