import { cn } from "@/lib/utils";
import {
  Heart,
  Shield,
  CreditCard,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { SectionTitle } from "../components/section-title";
import { whyChooseFlexigomConfig } from "../config/why-choose-flexigom-config";
import type { WhyChooseFlexigomSectionProps, WhyChooseItem } from "../types";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Shield,
  CreditCard,
  MapPin,
};

interface WhyChooseItemCardProps {
  item: WhyChooseItem;
}

function WhyChooseItemCard({ item }: WhyChooseItemCardProps) {
  const IconComponent = iconMap[item.icon];

  if (!IconComponent) {
    return null;
  }

  return (
    <div className="space-y-4 text-center">
      {/* Icon Circle */}
      <div className="flex justify-center items-center bg-red-600 mx-auto rounded-full w-16 h-16">
        <IconComponent className="w-8 h-8 text-white" />
      </div>

      {/* Title */}
      <h3 className="font-bold text-white text-xl md:text-xl">{item.title}</h3>

      {/* Description */}
      <p className="text-white text-base leading-relaxed">{item.description}</p>
    </div>
  );
}

export function WhyChooseFlexigomSection({
  content,
  className,
}: WhyChooseFlexigomSectionProps = {}) {
  const sectionContent = { ...whyChooseFlexigomConfig, ...content };

  return (
    <section className={cn("bg-black py-8 md:py-12", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
          titleClassName="text-white"
          subtitleClassName="text-white"
        />

        {/* Feature Items Grid */}
        <div className="gap-8 md:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {sectionContent.items.map((item) => (
            <WhyChooseItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
