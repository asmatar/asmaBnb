import Titles from "./titles";

const TextBlock = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="space-y-6">
      <Titles>{title}</Titles>
      <p className="text-lg leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
};

export default TextBlock;
