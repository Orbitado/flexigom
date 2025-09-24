import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types";

interface PaymentMethodsSectionProps {
  paymentMethods?: PaymentMethod[];
  className?: string;
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    src: "/placeholder.svg?height=40&width=60",
    alt: "Visa",
    className: "h-8 w-auto",
  },
  {
    src: "/placeholder.svg?height=40&width=60",
    alt: "Mastercard",
    className: "h-8 w-auto",
  },
  {
    src: "/placeholder.svg?height=40&width=60",
    alt: "American Express",
    className: "h-8 w-auto",
  },
];

export function PaymentMethodsSection({
  paymentMethods = defaultPaymentMethods,
  className,
}: PaymentMethodsSectionProps) {
  return (
    <div className={cn("bg-white py-8 mt-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg?height=60&width=200"
              alt="Mercado Pago"
              className="h-12 w-auto"
            />
            <div className="text-left">
              <p className="text-xl font-bold text-black">Compra Segura</p>
              <p className="text-base text-gray-600">
                Aceptamos todos los medios de pago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {paymentMethods.map((method, index) => (
              <img
                key={`${method.alt}-${index}`}
                src={method.src}
                alt={method.alt}
                className={cn("h-8 w-auto", method.className)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}