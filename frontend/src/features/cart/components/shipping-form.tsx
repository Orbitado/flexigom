import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ShippingFormData } from "../types";

const shippingFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.email("Email inválido").min(1, "El email es requerido"),
  phone: z
    .string()
    .min(7, "El teléfono es requerido")
    .max(15, "El teléfono debe tener entre 7 y 15 caracteres"),
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(8, "El DNI debe tener hasta 8 dígitos")
    .regex(/^\d+$/, "El DNI solo puede contener números"),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  province: z.string().min(1, "La provincia es requerida"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  additionalInfo: z.string().optional(),
});

interface ShippingFormProps {
  initialData?: Partial<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => void;
  onBack?: () => void;
}

export function ShippingForm({
  initialData,
  onSubmit,
  onBack,
}: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ShippingFormData>({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      dni: initialData?.dni || "",
      address: initialData?.address || "",
      city: initialData?.city || "San Miguel de Tucumán",
      province: initialData?.province || "Tucumán",
      postalCode: initialData?.postalCode || "T4000",
      additionalInfo: initialData?.additionalInfo || "",
    },
  });

  const validateWithZod = (data: ShippingFormData): boolean => {
    try {
      shippingFormSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof ShippingFormData;
          setError(field, { message: issue.message });
        });
      }
      return false;
    }
  };

  const onFormSubmit = (data: ShippingFormData) => {
    if (validateWithZod(data)) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">
          Información Personal
        </h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="Juan"
              className={errors.firstName ? "border-destructive" : ""}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-destructive text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Apellido <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Pérez"
              className={errors.lastName ? "border-destructive" : ""}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-destructive text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@ejemplo.com"
              className={errors.email ? "border-destructive" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Teléfono <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              pattern="[\d\s\-\+]*"
              placeholder="+54 381 123-4567"
              className={errors.phone ? "border-destructive" : ""}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* DNI */}
        <div className="space-y-2">
          <Label htmlFor="dni">
            DNI <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dni"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            placeholder="12345678"
            maxLength={8}
            className={errors.dni ? "border-destructive" : ""}
            {...register("dni")}
          />
          {errors.dni && (
            <p className="text-destructive text-sm">{errors.dni.message}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Necesitamos tu DNI para generar la factura
          </p>
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">
          Dirección de Entrega
        </h3>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Dirección <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Calle, número, piso, depto"
            className={errors.address ? "border-destructive" : ""}
            {...register("address")}
          />
          {errors.address && (
            <p className="text-destructive text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">
              Ciudad <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="San Miguel de Tucumán"
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && (
              <p className="text-destructive text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label htmlFor="province">
              Provincia <span className="text-destructive">*</span>
            </Label>
            <Input
              id="province"
              {...register("province")}
              placeholder="Tucumán"
              className={errors.province ? "border-destructive" : ""}
            />
            {errors.province && (
              <p className="text-destructive text-sm">
                {errors.province.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="postalCode">
              Código Postal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="postalCode"
              placeholder="4000"
              className={errors.postalCode ? "border-destructive" : ""}
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p className="text-destructive text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">
            Información adicional (opcional)
          </Label>
          <Textarea
            id="additionalInfo"
            placeholder="Referencias, horario de entrega preferido, etc."
            rows={3}
            {...register("additionalInfo")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Volver
          </Button>
        )}
        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
          Continuar al Pago
        </Button>
      </div>
    </form>
  );
}
