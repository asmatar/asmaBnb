import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientType?: "primary" | "accent"; // Primary (violet-bleu) ou Accent (bleu)
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  gradientType = "primary",
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h2
        className={cn(
          "text-2xl font-semibold",
          gradientType === "primary" ? "gradient-text" : "text-accent-gradient",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
