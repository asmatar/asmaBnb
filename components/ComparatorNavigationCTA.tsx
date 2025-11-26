"use client";
import { Link } from "@/i18n/navigation";
import useGlobalStore from "@/store/Global";

const ComparatorNavigationCTA = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { comparator } = useGlobalStore();
  return comparator.length === 2 ? (
    <Link
      href={href + "/?hotel1=" + comparator[0] + "&hotel2=" + comparator[1]}
      className="fixed bottom-4 right-6 animate-bounce z-[100]"
    >
      <div className="text-xs font-medium text-primary bg-background border px-3 py-1.5 rounded-lg">
        {children} →
      </div>
    </Link>
  ) : null;
};

export default ComparatorNavigationCTA;
