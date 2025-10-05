import { SEOHead } from "@/components/seo";
import { createPageSEO } from "@/lib/seo";
import { Package, CheckCircle } from "lucide-react";

export function Component() {
  const seoConfig = createPageSEO({
    title: "Entregas - Flexigom Tucumán",
    description:
      "Información sobre entregas y envíos de Flexigom en Tucumán. Conocé nuestras zonas de cobertura, tiempos de entrega y políticas de envío para colchones, sommiers y más.",
    path: "/entregas",
    keywords: [
      "entregas flexigom",
      "envío colchones tucumán",
      "delivery sommiers",
      "zonas de entrega tucumán",
    ],
  });

  return (
    <>
      <SEOHead config={seoConfig} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-bold text-gray-900 text-4xl md:text-5xl">
              Entregas y Envíos
            </h1>
            <p className="mt-4 text-gray-600 text-lg md:text-xl">
              Llevamos tu descanso hasta la puerta de tu hogar
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Info Cards */}
      <section className="py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Delivery Process */}
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-bold text-gray-900 text-3xl">
                ¿Cómo funciona la entrega?
              </h2>
              <p className="text-gray-600">
                Seguí estos pasos para recibir tu compra
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2 mb-12">
              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-red-600 rounded-full w-10 min-w-10 h-10 font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                      Confirmación de Compra
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Una vez realizada tu compra, te contactaremos para
                      confirmar los detalles del pedido y la dirección de
                      entrega.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-red-600 rounded-full w-10 min-w-10 h-10 font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                      Coordinación de Fecha
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Acordamos contigo el día y horario más conveniente para
                      realizar la entrega en tu domicilio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-red-600 rounded-full w-10 min-w-10 h-10 font-bold text-white">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                      Preparación del Pedido
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Preparamos tu pedido con el máximo cuidado, asegurándonos
                      de que todo esté en perfectas condiciones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-red-600 rounded-full w-10 min-w-10 h-10 font-bold text-white">
                    4
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                      Entrega en Domicilio
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Nuestro equipo lleva el producto hasta tu hogar y, si lo
                      necesitás, te ayudamos con la instalación básica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-bold text-gray-900 text-3xl">
                Zonas de Entrega
              </h2>
              <p className="text-gray-600">Consultá si llegamos a tu zona</p>
            </div>

            <div className="gap-8 grid md:grid-cols-2">
              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Entrega Sin Cargo
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>San Miguel de Tucumán (área urbana)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Yerba Buena</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Tafí Viejo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Banda del Río Salí</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-500 text-xs">
                  *Para compras superiores a un monto mínimo
                </p>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Otras Zonas
                  </h3>
                </div>
                <p className="mb-4 text-gray-600 text-sm">
                  Para otras localidades dentro de la provincia de Tucumán,
                  consultá costo y disponibilidad de envío.
                </p>
                <a
                  href="/contacto"
                  className="inline-flex items-center font-medium text-red-600 hover:text-red-700 text-sm transition-colors"
                >
                  Consultá tu zona →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl">
            <div className="bg-red-50 p-6 md:p-8 border-red-600 border-l-4 rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                Información Importante
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-600">•</span>
                  <span>
                    Los tiempos de entrega pueden variar según disponibilidad de
                    stock y zona
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-600">•</span>
                  <span>
                    Es necesario que haya una persona mayor de edad para recibir
                    el pedido
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-600">•</span>
                  <span>
                    Revisá el producto en el momento de la entrega y ante
                    cualquier inconveniente, informalo al personal de entrega
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-600">•</span>
                  <span>
                    Asegurate de que el acceso al domicilio permita el ingreso
                    del producto (medidas de ascensor, escaleras, puertas, etc.)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-bold text-white text-3xl md:text-4xl">
              ¿Querés consultar sobre entregas?
            </h2>
            <p className="mb-8 text-gray-300 text-lg">
              Contactanos y te ayudaremos con toda la información sobre envíos a
              tu zona
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex justify-center items-center bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-medium text-lg text-white transition-colors"
              >
                Contactanos
              </a>
              <a
                href="https://wa.me/5493815277935"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center hover:bg-white/10 px-8 py-4 border-2 border-white rounded-lg font-medium text-lg text-white transition-colors"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Component.displayName = "EntregasPage";
