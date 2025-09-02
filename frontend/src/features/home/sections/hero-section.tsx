import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <h1 className="font-bold text-4xl">Welcome to Flexigom</h1>
      <p className="text-muted-foreground text-lg">
        A modern application built with React Router 7 and screaming
        architecture
      </p>
      <Button>Get Started</Button>
    </section>
  );
}
