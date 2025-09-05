export interface TrustIndicator {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBgColor?: string;
  iconColor?: string;
}

export interface PaymentMethod {
  src: string;
  alt: string;
  className?: string;
}

export interface HeroContent {
  title: {
    main: string;
    highlight: string;
  };
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export interface HeroImage {
  src: string;
  alt: string;
  badge: {
    primary: string;
    secondary: string;
  };
}

export interface HeroSectionProps {
  content?: Partial<HeroContent>;
  image?: Partial<HeroImage>;
  trustIndicators?: TrustIndicator[];
  paymentMethods?: PaymentMethod[];
  showPaymentSection?: boolean;
  className?: string;
}

export interface WhyChooseItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseFlexigomContent {
  title: string;
  subtitle?: string;
  items: WhyChooseItem[];
}

export interface WhyChooseFlexigomSectionProps {
  content?: Partial<WhyChooseFlexigomContent>;
  className?: string;
}

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}
