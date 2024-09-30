type AmenityItemProps = {
  children: React.ReactNode;
};

const AmenityItem = ({ children }: AmenityItemProps) => {
  return <p className="flex items-center gap-2">{children}</p>;
};

export default AmenityItem;
