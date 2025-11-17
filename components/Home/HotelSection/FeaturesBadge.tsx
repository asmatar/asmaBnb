import { Badge } from "@/components/ui/badge";

const FeaturesBadge = ({
  icon,
  translationKey,
}: {
  icon: React.ReactNode;
  translationKey: string;
}) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/15 justify-start py-1"
    >
      {icon}
      <span className="truncate text-xs">{translationKey}</span>
    </Badge>
  );
};

export default FeaturesBadge;
