import { SEOHead } from "@/components/seo";
import { createPageSEO } from "@/lib/seo";
import { ShieldCheck, FileCheck, Clock, HelpCircle } from "lucide-react";

export function Component() {
  const seoConfig = createPageSEO({
    title: "Garantías - Flexigom Tucumán",
    description:
      "Conocé las garantías de nuestros colchones, sommiers y productos de descanso en Flexigom Tucumán. Protección y respaldo para tu compra con más de 20 años de experiencia.",
    path: "/garantias",
    keywords: [
      "garantía colchones",
      "garantía sommiers",
      "política de garantía flexigom",
      "servicio postventa tucumán",
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
              Garantías
            </h1>
            <p className="mt-4 text-gray-600 text-lg md:text-xl">
              Tu tranquilidad es nuestra prioridad. Conocé las garantías que
              respaldan tu compra
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl">
            {/* Intro */}
            <div className="bg-gray-50 shadow-md mb-12 p-6 md:p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-2 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  Compromiso de Calidad
                </h2>
              </div>
              <p className="text-gray-700">
                En Flexigom, respaldamos la calidad de todos nuestros productos
                con garantías que te brindan tranquilidad. Nuestro compromiso es
                que tu inversión en descanso esté protegida.
              </p>
            </div>

            {/* Warranty Cards */}
            <div className="gap-8 grid md:grid-cols-2 mb-12">
              <div className="bg-white shadow-md hover:shadow-xl p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Garantía de Fábrica
                  </h3>
                </div>
                <p className="mb-3 text-gray-600 text-sm">
                  Todos nuestros productos cuentan con la garantía del
                  fabricante, que varía según la marca y modelo.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Colchones: hasta 5 años según el modelo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Sommiers: hasta 3 años según el modelo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Almohadas: hasta 1 año según el modelo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white shadow-md hover:shadow-xl p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Garantía Flexigom
                  </h3>
                </div>
                <p className="mb-3 text-gray-600 text-sm">
                  Además de la garantía de fábrica, en Flexigom te ofrecemos
                  nuestro respaldo y servicio.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Asesoramiento post-venta personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Gestión de reclamos de garantía</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>Soporte técnico y consultas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Warranty Coverage */}
            <div className="bg-gray-50 shadow-md mb-12 p-6 md:p-8 rounded-xl">
              <h2 className="mb-6 font-bold text-gray-900 text-2xl">
                ¿Qué cubre la garantía?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 mt-1 p-2 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Defectos de fabricación
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Problemas en materiales o mano de obra que afecten el
                      funcionamiento normal del producto.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 mt-1 p-2 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Hundimientos excesivos
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Deformaciones superiores a las especificadas por el
                      fabricante para cada modelo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600 mt-1 p-2 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Roturas de estructura
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Problemas estructurales en sommiers o bases que no sean
                      causados por mal uso.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Not Covered */}
            <div className="bg-white mb-12 p-6 md:p-8 border-2 border-red-600 rounded-xl">
              <h2 className="mb-6 font-bold text-gray-900 text-2xl">
                ¿Qué NO cubre la garantía?
              </h2>
              <div className="space-y-3 text-gray-600 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-red-600 font-bold">✗</span>
                  <span>
                    Daños causados por mal uso, accidentes o uso inadecuado
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-red-600 font-bold">✗</span>
                  <span>
                    Manchas, quemaduras o deterioro por falta de mantenimiento
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-red-600 font-bold">✗</span>
                  <span>
                    Desgaste natural por el uso prolongado del producto
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-red-600 font-bold">✗</span>
                  <span>
                    Daños causados por transportes no autorizados por Flexigom
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 text-red-600 font-bold">✗</span>
                  <span>
                    Productos que hayan sido modificados o reparados por
                    terceros
                  </span>
                </div>
              </div>
            </div>

            {/* Warranty Process */}
            <div className="bg-gray-50 shadow-md mb-12 p-6 md:p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  ¿Cómo hacer un reclamo de garantía?
                </h2>
              </div>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex justify-center items-center bg-red-600 rounded-full w-6 min-w-6 h-6 font-semibold text-white text-sm">
                    1
                  </span>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Contactanos
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Comunicate con nosotros por teléfono, WhatsApp o visitá
                      nuestra tienda con tu comprobante de compra.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex justify-center items-center bg-red-600 rounded-full w-6 min-w-6 h-6 font-semibold text-white text-sm">
                    2
                  </span>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Evaluación
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Nuestro equipo evaluará el producto y determinará si
                      aplica la cobertura de garantía.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex justify-center items-center bg-red-600 rounded-full w-6 min-w-6 h-6 font-semibold text-white text-sm">
                    3
                  </span>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Resolución
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Si el reclamo es procedente, coordinaremos la reparación,
                      cambio o solución más adecuada.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Important Notes */}
            <div className="bg-red-50 p-6 border-red-600 border-l-4 rounded-xl">
              <div className="flex items-start gap-3">
                <HelpCircle className="flex-shrink-0 mt-1 w-5 h-5 text-red-600" />
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Importante
                  </h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>
                      • Es fundamental conservar el comprobante de compra para
                      hacer efectiva la garantía
                    </li>
                    <li>
                      • Los plazos de garantía comienzan a contar desde la fecha
                      de compra
                    </li>
                    <li>
                      • Cada producto puede tener condiciones específicas de
                      garantía
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-bold text-white text-2xl md:text-3xl">
              ¿Tenés dudas sobre la garantía?
            </h2>
            <p className="mb-8 text-gray-300 text-lg">
              Nuestro equipo está disponible para resolver todas tus consultas
              sobre garantías y servicio post-venta
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex justify-center items-center bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-medium text-lg text-white transition-colors"
              >
                Ir a Contacto
              </a>
              <a
                href="/faq"
                className="inline-flex justify-center items-center hover:bg-white/10 px-8 py-4 border-2 border-white rounded-lg font-medium text-lg text-white transition-colors"
              >
                Ver Preguntas Frecuentes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Component.displayName = "GarantiasPage";
