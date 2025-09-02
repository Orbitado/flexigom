import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "¿Cuál es el tiempo de entrega de los productos?",
    answer:
      "El tiempo de entrega varía según tu ubicación. En Capital Federal y GBA, entregamos en 24-48 horas. Para el interior del país, el tiempo de entrega es de 3-7 días hábiles. Te enviaremos un código de seguimiento para que puedas rastrear tu pedido.",
    category: "Envíos",
  },
  {
    id: 2,
    question: "¿Ofrecen garantía en sus productos?",
    answer:
      "Sí, todos nuestros colchones y sommiers tienen garantía. Los colchones premium tienen 5 años de garantía, los colchones estándar 3 años, y los sommiers 2 años. La garantía cubre defectos de fabricación y hundimientos superiores a 2.5cm.",
    category: "Garantía",
  },
  {
    id: 3,
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Tienes 30 días para cambiar o devolver tu producto si no estás satisfecho. El producto debe estar en perfectas condiciones y con su embalaje original. Los gastos de envío para devoluciones corren por cuenta del cliente, excepto si el producto tiene defectos de fábrica.",
    category: "Devoluciones",
  },
  {
    id: 4,
    question: "¿Cómo puedo saber qué medida de colchón necesito?",
    answer:
      "Las medidas estándar son: 1 Plaza (80x190cm), 2 Plazas (140x190cm), Queen (160x200cm), y King (180x200cm). Si tienes una cama con medidas especiales, podemos fabricar colchones a medida. Contáctanos para más información sobre medidas personalizadas.",
    category: "Productos",
  },
  {
    id: 5,
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos todos los métodos de pago a través de Mercado Pago: tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y dinero en cuenta de Mercado Pago. También puedes pagar por transferencia bancaria directa.",
    category: "Pagos",
  },
  {
    id: 6,
    question: "¿Hacen entrega e instalación a domicilio?",
    answer:
      "Sí, ofrecemos servicio de entrega a domicilio sin costo adicional en compras superiores a $50.000. Nuestro equipo puede ayudarte a ubicar el colchón en tu habitación. Para sommiers y bases, también ofrecemos servicio de armado por un costo adicional.",
    category: "Envíos",
  },
  {
    id: 7,
    question: "¿Cómo elijo la firmeza correcta para mi colchón?",
    answer:
      "La firmeza depende de tu peso, posición para dormir y preferencias personales. Suave: ideal para personas de peso ligero y quienes duermen de lado. Medio: la opción más popular, adecuada para la mayoría. Firme: recomendado para personas de mayor peso y quienes duermen boca arriba o boca abajo.",
    category: "Productos",
  },
  {
    id: 8,
    question: "¿Puedo financiar mi compra?",
    answer:
      "Sí, a través de Mercado Pago puedes financiar tu compra en hasta 12 cuotas sin interés con tarjetas de crédito participantes. También ofrecemos planes de financiación especiales en compras superiores a $100.000. Consulta las condiciones al momento de la compra.",
    category: "Pagos",
  },
];

export function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Envíos",
    "Garantía",
    "Devoluciones",
    "Productos",
    "Pagos",
  ];

  const filteredFAQs =
    selectedCategory === "Todos"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Centro de Ayuda
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o
          contáctanos directamente.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Phone */}
        <Card className="border-2 border-gray-200 hover:border-red-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Teléfono</h3>
            <p className="text-2xl font-bold text-red-600 mb-2">
              +54 11 1234-5678
            </p>
            <p className="text-base text-gray-600 mb-4">
              Lunes a Viernes: 9:00 - 18:00
            </p>
            <p className="text-base text-gray-600 mb-6">
              Sábados: 9:00 - 13:00
            </p>
            <Button
              size="lg"
              className="w-full text-lg py-3 h-auto bg-red-600 hover:bg-red-700"
            >
              <Phone className="h-5 w-5 mr-2" />
              Llamar Ahora
            </Button>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="border-2 border-gray-200 hover:border-blue-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-lg font-semibold text-blue-600 mb-2">
              info@flexigom.com
            </p>
            <p className="text-base text-gray-600 mb-4">
              Respuesta en 24 horas
            </p>
            <p className="text-base text-gray-600 mb-6">Lunes a Viernes</p>
            <Button
              variant="outline"
              size="lg"
              className="w-full text-lg py-3 h-auto border-2 bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="h-5 w-5 mr-2" />
              Enviar Email
            </Button>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="border-2 border-gray-200 hover:border-green-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Chat en Vivo
            </h3>
            <p className="text-base text-gray-600 mb-2">Asistencia inmediata</p>
            <p className="text-base text-gray-600 mb-4">
              Lunes a Viernes: 9:00 - 18:00
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">
                En línea
              </span>
            </div>
            <Button
              size="lg"
              className="w-full text-lg py-3 h-auto bg-green-600 hover:bg-green-700"
              onClick={() => alert("Chat en vivo se abrirá aquí")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Iniciar Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Store Information */}
      <Card className="border-2 border-gray-200 mb-16">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            Información de la Tienda
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Dirección
            </h3>
            <p className="text-lg text-gray-700 mb-2">Av. Corrientes 1234</p>
            <p className="text-lg text-gray-700 mb-2">
              Ciudad Autónoma de Buenos Aires
            </p>
            <p className="text-lg text-gray-700 mb-4">C1043AAZ, Argentina</p>
            <Button
              variant="outline"
              size="lg"
              className="text-base py-3 h-auto border-2 bg-transparent"
            >
              Ver en Google Maps
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Horarios de Atención
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-lg text-gray-700">
                  Lunes a Viernes: 9:00 - 18:00
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-lg text-gray-700">
                  Sábados: 9:00 - 13:00
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-lg text-gray-700">Domingos: Cerrado</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra respuestas rápidas a las consultas más comunes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="lg"
              className={`text-base py-3 h-auto ${
                selectedCategory === category
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-transparent border-2 border-gray-300 hover:border-red-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="border-2 border-gray-200">
              <Collapsible
                open={openFAQ === faq.id}
                onOpenChange={() => toggleFAQ(faq.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-left text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                        {faq.question}
                      </CardTitle>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="h-6 w-6 text-gray-600 flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-600 flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="mt-16 text-center p-8 bg-gray-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Aún necesitas ayuda?
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Nuestro equipo de atención al cliente está listo para ayudarte con
          cualquier consulta adicional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-4 h-auto bg-red-600 hover:bg-red-700"
          >
            <Phone className="h-5 w-5 mr-2" />
            Llamar Ahora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 h-auto border-2 bg-transparent"
            onClick={() => alert("Chat en vivo se abrirá aquí")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Iniciar Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
