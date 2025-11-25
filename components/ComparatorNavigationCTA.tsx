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
    <Link href={href} className="fixed bottom-4 right-6 animate-bounce ">
      <div className="text-xs font-medium text-primary bg-background border px-3 py-1.5 rounded-lg">
        {children} →
      </div>
    </Link>
  ) : null;
};

export default ComparatorNavigationCTA;
