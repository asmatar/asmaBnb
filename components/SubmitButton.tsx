import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = "Processing...",
  loadingText,
  disabled = false,
  children,
  onClick,
  variant = "default",
  className = "",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      onClick={onClick}
      variant={variant}
      className={`${className}`}
    >
      {children}
      <span>{pending ? loadingText : text}</span>{" "}
    </Button>
  );
};

export default SubmitButton;
