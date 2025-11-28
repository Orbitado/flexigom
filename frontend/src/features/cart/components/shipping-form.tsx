import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ShippingFormData } from "../types/shipping-types";
import { shippingFormSchema } from "../types/shipping-types";
import { formatCuitInput, formatDniInput, getRawDocument } from "@/lib/utils";
import { User, CreditCard, MapPin, FileText } from "lucide-react";

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
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      documentType: initialData?.documentType || "DNI",
      documentNumber: initialData?.documentNumber || "",
      fiscalCategory: initialData?.fiscalCategory || "CONSUMIDOR_FINAL",
      address: initialData?.address || "",
      city: initialData?.city || "San Miguel de Tucumán",
      province: initialData?.province || "Tucumán",
      postalCode: initialData?.postalCode || "T4000",
      additionalInfo: initialData?.additionalInfo || "",
    },
  });

  const documentType = watch("documentType");

  const onFormSubmit = (data: ShippingFormData) => {
    // Extract raw document number (digits only, no dashes) before sending to backend
    const formattedData = {
      ...data,
      documentNumber: getRawDocument(data.documentNumber as string),
    };
    onSubmit(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-8 pb-24 md:pb-6"
    >
      {/* Personal Information Section */}
      <div className="space-y-6 bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg">
            <User className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-xl">
            Información Personal
          </h3>
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="font-medium text-gray-700 text-sm"
            >
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="Juan"
              className={`${errors.firstName ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
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
            <Label
              htmlFor="lastName"
              className="font-medium text-gray-700 text-sm"
            >
              Apellido <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Pérez"
              className={`${errors.lastName ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
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
            <Label
              htmlFor="email"
              className="font-medium text-gray-700 text-sm"
            >
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@ejemplo.com"
              className={`${errors.email ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="font-medium text-gray-700 text-sm"
            >
              Teléfono <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              pattern="[\d\s\-\+]*"
              placeholder="+54 381 123-4567"
              className={`${errors.phone ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Document & Fiscal Information Section */}
      <div className="space-y-6 bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg">
            <CreditCard className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-xl">
            Información Fiscal
          </h3>
        </div>
        {/* Document Type Selector - Radio Buttons */}
        <div className="space-y-3">
          <Label className="font-medium text-gray-700 text-sm">
            Tipo de Documento <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("documentNumber", "");
                }}
                className="gap-3 grid grid-cols-2"
              >
                <Label
                  htmlFor="document-dni"
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "DNI"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="DNI" id="document-dni" />
                  <div className="flex items-center gap-2">
                    <FileText
                      className={`w-4 h-4 ${field.value === "DNI" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span
                      className={`font-medium ${field.value === "DNI" ? "text-red-700" : "text-gray-700"}`}
                    >
                      DNI
                    </span>
                  </div>
                </Label>

                <Label
                  htmlFor="document-cuit"
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "CUIT"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="CUIT" id="document-cuit" />
                  <div className="flex items-center gap-2">
                    <FileText
                      className={`w-4 h-4 ${field.value === "CUIT" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span
                      className={`font-medium ${field.value === "CUIT" ? "text-red-700" : "text-gray-700"}`}
                    >
                      CUIT
                    </span>
                  </div>
                </Label>
              </RadioGroup>
            )}
          />
          {errors.documentType && (
            <p className="text-destructive text-sm">
              {errors.documentType.message}
            </p>
          )}
        </div>

        {/* Document Number */}
        <div className="space-y-2">
          <Label htmlFor="documentNumber" className="font-medium text-sm">
            {documentType === "DNI" ? "Número de DNI" : "Número de CUIT"}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="documentNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="documentNumber"
                type="text"
                inputMode="numeric"
                placeholder={
                  documentType === "DNI" ? "12345678" : "20-12345678-9"
                }
                value={field.value}
                onChange={(e) => {
                  const formatted =
                    documentType === "DNI"
                      ? formatDniInput(e.target.value)
                      : formatCuitInput(e.target.value);
                  field.onChange(formatted);
                }}
                className={`${errors.documentNumber ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
              />
            )}
          />
          {errors.documentNumber && (
            <p className="text-destructive text-sm">
              {errors.documentNumber.message}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            {documentType === "DNI"
              ? "Necesitamos tu DNI para generar la factura"
              : "Formato: 20-12345678-9 (11 dígitos)"}
          </p>
        </div>

        {/* Fiscal Category Selector - Radio Buttons */}
        <div className="space-y-3">
          <Label className="font-medium text-gray-700 text-sm">
            Categoría Fiscal <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="fiscalCategory"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="gap-3 grid grid-cols-1 md:grid-cols-2"
              >
                <Label
                  htmlFor="fiscal-consumidor"
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "CONSUMIDOR_FINAL"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value="CONSUMIDOR_FINAL"
                    id="fiscal-consumidor"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div
                      className={`font-medium ${field.value === "CONSUMIDOR_FINAL" ? "text-red-700" : "text-gray-900"}`}
                    >
                      Consumidor Final
                    </div>
                    <div className="mt-1 text-gray-600 text-xs">
                      Para compras personales
                    </div>
                  </div>
                </Label>

                <Label
                  htmlFor="fiscal-responsable"
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "RESPONSABLE_INSCRIPTO"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value="RESPONSABLE_INSCRIPTO"
                    id="fiscal-responsable"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div
                      className={`font-medium ${field.value === "RESPONSABLE_INSCRIPTO" ? "text-red-700" : "text-gray-900"}`}
                    >
                      Responsable Inscripto
                    </div>
                    <div className="mt-1 text-gray-600 text-xs">
                      Con factura A
                    </div>
                  </div>
                </Label>

                <Label
                  htmlFor="fiscal-exento"
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "EXENTO"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value="EXENTO"
                    id="fiscal-exento"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div
                      className={`font-medium ${field.value === "EXENTO" ? "text-red-700" : "text-gray-900"}`}
                    >
                      Exento
                    </div>
                    <div className="mt-1 text-gray-600 text-xs">
                      Exento de IVA
                    </div>
                  </div>
                </Label>

                <Label
                  htmlFor="fiscal-monotributo"
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    field.value === "MONOTRIBUTISTA"
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-gray-50 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value="MONOTRIBUTISTA"
                    id="fiscal-monotributo"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div
                      className={`font-medium ${field.value === "MONOTRIBUTISTA" ? "text-red-700" : "text-gray-900"}`}
                    >
                      Monotributista
                    </div>
                    <div className="mt-1 text-gray-600 text-xs">
                      Con factura B o C
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            )}
          />
          {errors.fiscalCategory && (
            <p className="text-destructive text-sm">
              {errors.fiscalCategory.message}
            </p>
          )}
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="space-y-6 bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-xl">
            Dirección de Entrega
          </h3>
        </div>
        {/* Address */}
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="font-medium text-gray-700 text-sm"
          >
            Dirección <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Calle, número, piso, depto"
            className={`${errors.address ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
            {...register("address")}
          />
          {errors.address && (
            <p className="text-destructive text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="font-medium text-gray-700 text-sm">
              Ciudad <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="San Miguel de Tucumán"
              className={`${errors.city ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
            />
            {errors.city && (
              <p className="text-destructive text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label
              htmlFor="province"
              className="font-medium text-gray-700 text-sm"
            >
              Provincia <span className="text-destructive">*</span>
            </Label>
            <Input
              id="province"
              {...register("province")}
              placeholder="Tucumán"
              className={`${errors.province ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
            />
            {errors.province && (
              <p className="text-destructive text-sm">
                {errors.province.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label
              htmlFor="postalCode"
              className="font-medium text-gray-700 text-sm"
            >
              Código Postal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="postalCode"
              placeholder="4000"
              className={`${errors.postalCode ? "border-destructive" : "border-gray-200"} focus:border-red-500`}
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
          <Label
            htmlFor="additionalInfo"
            className="font-medium text-gray-700 text-sm"
          >
            Información adicional (opcional)
          </Label>
          <Textarea
            id="additionalInfo"
            placeholder="Referencias de la dirección, horario preferido de entrega, etc."
            rows={3}
            className="border-gray-200 focus:border-red-500 resize-none"
            {...register("additionalInfo")}
          />
          <p className="text-muted-foreground text-xs">
            Ayúdanos con detalles que faciliten la entrega
          </p>
        </div>
      </div>

      {/* Actions - Fixed at bottom on mobile */}
      <div className="right-0 bottom-0 left-0 z-10 fixed md:relative flex gap-3 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none p-4 md:p-0 border-t md:border-t-0">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 md:flex-none"
            size="lg"
          >
            Volver
          </Button>
        )}
        <Button
          type="submit"
          className="flex-[2] md:flex-1 bg-red-600 hover:bg-red-700"
          size="lg"
        >
          Continuar al Pago
        </Button>
      </div>
    </form>
  );
}
