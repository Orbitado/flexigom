import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { TrustIndicator } from "@/components/ui/trust-indicator";
import { PaymentMethodsSection } from "@/components/ui/payment-methods-section";
import { cn } from "@/lib/utils";
import type {
  HeroSectionProps,
  TrustIndicator as TrustIndicatorType,
  HeroContent,
  HeroImage,
} from "@/types";

const defaultContent: HeroContent = {
  title: {
    main: "El Descanso que",
    highlight: "Te Mereces",
  },
  subtitle:
    "Descubre nuestra amplia selección de colchones, sommiers y ropa de cama de la más alta calidad. Más de 20 años brindando comodidad y descanso a familias argentinas.",
  primaryCta: {
    text: "Ver Ofertas Especiales",
    href: "/ofertas",
  },
  secondaryCta: {
    text: "Explorar Colchones",
    href: "/colchones",
  },
};

const defaultImage: HeroImage = {
  src: "/placeholder.svg?height=600&width=800",
  alt: "Dormitorio moderno con colchón Flexigom",
  badge: {
    primary: "20+ Años",
    secondary: "de Experiencia",
  },
};

const defaultTrustIndicators: TrustIndicatorType[] = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    title: "Envío Gratis",
    subtitle: "En compras mayores a $50.000",
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Garantía",
    subtitle: "Hasta 5 años",
    iconBgColor: "bg-black",
    iconColor: "text-white",
  },
];

export function HeroSection({
  content,
  image,
  trustIndicators = defaultTrustIndicators,
  showPaymentSection = true,
  className,
}: HeroSectionProps = {}) {
  const heroContent = { ...defaultContent, ...content };
  const heroImage = { ...defaultImage, ...image };

  return (
    <section
      className={cn(
        "relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-24",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                {heroContent.title.main}
                <span className="text-red-600 block">
                  {heroContent.title.highlight}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                {heroContent.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-red-600 hover:bg-red-700"
              >
                <Link to={heroContent.primaryCta.href}>
                  {heroContent.primaryCta.text}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
              >
                <Link to={heroContent.secondaryCta.href}>
                  {heroContent.secondaryCta.text}
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            {trustIndicators.length > 0 && (
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-200">
                {trustIndicators.map((indicator, index) => (
                  <TrustIndicator
                    key={`trust-indicator-${index}`}
                    icon={indicator.icon}
                    title={indicator.title}
                    subtitle={indicator.subtitle}
                    iconBgColor={indicator.iconBgColor}
                    iconColor={indicator.iconColor}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-2xl font-bold">{heroImage.badge.primary}</p>
              <p className="text-base">{heroImage.badge.secondary}</p>
            </div>
          </div>
        </div>
      </div>

      {showPaymentSection && <PaymentMethodsSection />}
    </section>
  );
}
