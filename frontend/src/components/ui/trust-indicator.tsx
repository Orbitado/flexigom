import { cn } from "@/lib/utils";
import type { TrustIndicator as TrustIndicatorType } from "@/types";

interface TrustIndicatorProps extends TrustIndicatorType {
  className?: string;
}

export function TrustIndicator({
  icon,
  title,
  subtitle,
  iconBgColor = "bg-red-100",
  iconColor = "text-red-600",
  className,
}: TrustIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          iconBgColor
        )}
      >
        <div className={cn("w-6 h-6", iconColor)}>{icon}</div>
      </div>
      <div>
        <p className="text-lg font-semibold text-black">{title}</p>
        <p className="text-base text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}