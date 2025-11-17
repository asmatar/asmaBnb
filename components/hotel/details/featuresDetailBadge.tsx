const featuresDetailBadge = async ({
  icon,
  translationKey,
}: {
  icon: React.ReactNode;
  translationKey: string;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      {icon}
      <span>{translationKey}</span>
    </div>
  );
};

export default featuresDetailBadge;
