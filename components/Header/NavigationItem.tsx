"use client";
import { Link } from "@/i18n/navigation";

const NavigationItem = ({
  href,
  icon,
  title,
  handleClick,
  isOpen,
  Element,
  key,
}: {
  href?: string;
  Element?: React.ReactNode;
  icon: React.ReactNode;
  title?: string;
  handleClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: string,
  ) => void;
  isOpen: boolean;
  key: string;
}) => {
  return (
    <div
      className={`h-10 w-10 rounded-full bg-background flex border border-primary items-center justify-start relative overflow-hidden cursor-pointer transition-all duration-[2000ms] ease-in-out ${isOpen ? "w-max pr-3" : ""}`}
    >
      {typeof href === "string" ? (
        <Link
          href={href}
          onClick={(event) => handleClick(event, key)}
          className="flex items-center gap-2 whitespace-nowrap w-full h-full"
        >
          <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 z-10 relative">
            {icon}
          </span>
          <span
            className={`text-sm  h-full flex items-center pr-3 origin-right scale-x-0 ${isOpen ? "scale-x-100" : "scale-x-0"} transition-all duration-[2000ms] ease-in-out whitespace-nowrap w-max`}
          >
            {Element ? Element : title}
          </span>
        </Link>
      ) : (
        <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 z-10 relative">
          {icon}
        </span>
      )}
    </div>
  );
};
export default NavigationItem;
