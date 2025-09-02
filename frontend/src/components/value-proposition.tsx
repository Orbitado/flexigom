import { Shield, Heart, CreditCard, MapPin } from "lucide-react";

export function ValueProposition() {
  const values = [
    {
      icon: Heart,
      title: "Empresa Familiar Tucumana",
      description:
        "Somos de Tucumán, para los tucumanos. Tres generaciones dedicadas al descanso de las familias.",
    },
    {
      icon: Shield,
      title: "Atención Post-Venta Garantizada",
      description:
        "Servicio cara a cara y seguimiento personalizado. Tu tranquilidad es nuestra prioridad.",
    },
    {
      icon: CreditCard,
      title: "Financiamiento Propio Flexible",
      description:
        "Planes de pago más accesibles que los bancos. Sin intermediarios, directo contigo.",
    },
    {
      icon: MapPin,
      title: "Entrega Rápida en Tucumán",
      description:
        "Conocemos cada rincón de la provincia. Entrega garantizada en tiempo récord.",
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por Qué Elegir Flexigom?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Más que una tienda, somos tu familia tucumana comprometida con tu
            descanso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
