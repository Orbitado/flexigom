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

export interface TestimonialItem {
  id: string;
  rating: number;
  testimonial: string;
  customerName: string;
  customerLocation: string;
  customerSince: string;
}

export interface TestimonialsContent {
  title: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
}

export interface TestimonialsSectionProps {
  content?: Partial<TestimonialsContent>;
  className?: string;
}

export interface HelpContactButton {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export interface HelpSectionContent {
  title: string;
  subtitle: string;
  buttons: HelpContactButton[];
  operatingHours?: string;
}

export interface HelpSectionProps {
  content?: Partial<HelpSectionContent>;
  className?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterAddress {
  street: string;
  city: string;
  province: string;
  country: string;
}

export interface FooterOperatingHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface FooterContact {
  title: string;
  address: FooterAddress;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: FooterOperatingHours;
}

export interface FooterSocial {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface FooterCompanyInfo {
  name: string;
  description: string;
}

export interface FooterCopyright {
  year: number;
  text: string;
}

export interface FooterNavigation {
  company: FooterLinkGroup;
  products: FooterLinkGroup;
  help: FooterLinkGroup;
  legal: FooterLinkGroup;
}

export interface FooterConfig {
  companyInfo: FooterCompanyInfo;
  navigation: FooterNavigation;
  contact: FooterContact;
  social: FooterSocial;
  copyright: FooterCopyright;
}

export interface FooterSectionProps {
  config?: Partial<FooterConfig>;
  className?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  contractId: string;
  image?: string;
  href: string;
}

export interface CategoriesContent {
  title: string;
  subtitle?: string;
  categories: CategoryItem[];
}

export interface CategoriesSectionProps {
  content?: Partial<CategoriesContent>;
  className?: string;
}
