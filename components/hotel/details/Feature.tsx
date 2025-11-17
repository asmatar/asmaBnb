const Feature = ({
  Icon,
  translationKey,
}: {
  Icon: React.ReactNode;
  translationKey: string;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      {Icon}
      <span>{translationKey}</span>
    </div>
  );
};

export default Feature;
