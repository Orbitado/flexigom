import { cn } from "@/lib/utils";
import type { TrustIndicator as TrustIndicatorType } from "@/types";

interface TrustIndicatorProps extends TrustIndicatorType {
  className?: string;
  iconBgColor?: string;
  iconColor?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
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
          "flex justify-center items-center rounded-full w-12 h-12",
          iconBgColor
        )}
      >
        <div className={cn("w-6 h-6", iconColor)}>{icon}</div>
      </div>
      <div>
        <p className="font-semibold text-black text-lg">{title}</p>
        <p className="text-gray-600 text-base">{subtitle}</p>
      </div>
    </div>
  );
}