import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { CheckoutStep } from "../types";

interface Step {
  id: CheckoutStep;
  name: string;
  description: string;
}

const steps: Step[] = [
  {
    id: CheckoutStep.SHIPPING,
    name: "Envío",
    description: "Información de entrega",
  },
  {
    id: CheckoutStep.PAYMENT,
    name: "Pago",
    description: "Método de pago",
  },
  {
    id: CheckoutStep.REVIEW,
    name: "Revisión",
    description: "Confirma tu pedido",
  },
];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Progreso del checkout">
      <ol className="md:flex gap-2 md:space-x-8 grid grid-cols-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <li key={step.id} className="relative flex-1">
              <div className="flex items-start md:items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center md:mr-4">
                  <div
                    className={cn(
                      "z-10 relative flex justify-center items-center border-2 rounded-full w-8 h-8 transition-colors",
                      isCompleted && "border-green-600 bg-green-600 text-white",
                      isCurrent && "border-red-600 bg-red-600 text-white",
                      isUpcoming && "border-gray-300 bg-white text-gray-500",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Connector Line (Mobile) */}
                  {index !== steps.length - 1 && (
                    <div className="md:hidden flex-1 bg-gray-300 mt-1 w-px h-8" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 mt-2 md:mt-0 md:text-left text-center">
                  <p
                    className={cn(
                      "font-medium text-sm transition-colors",
                      isCompleted && "text-green-700",
                      isCurrent && "text-red-600",
                      isUpcoming && "text-gray-500",
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="hidden md:block mt-0.5 text-gray-500 text-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
