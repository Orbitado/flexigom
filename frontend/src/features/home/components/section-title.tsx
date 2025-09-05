import { cn } from "@/lib/utils";
import type { SectionTitleProps } from "../types";

export function SectionTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4 text-center", className)}>
      <h2
        className={cn(
          "font-bold text-black text-2xl md:text-3xl lg:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto max-w-3xl text-gray-700 text-base md:text-lg leading-relaxed",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
