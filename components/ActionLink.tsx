import { Link } from "@/i18n/navigation";

const ActionLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <div className="text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors duration-200">
        {children}
      </div>
    </Link>
  );
};

export default ActionLink;
