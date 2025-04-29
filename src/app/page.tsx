'use client'

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Subtitle from "@/components/Subtitle";
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import BuscadorVuelos from "@/pages/Home/BuscadorVuelos";

export default function Home() {

  const features = [
    {
      name: "París, Francia",
      description: "Conoce más sobre la ciudad del amor.",
      href: "/",
      cta: "Leer más",
      background: <img src="/francia.jpg" className="absolute w-full h-full brightness-50 hover:scale-110 transition-all" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      name: "Estambul, Turquía",
      description: "Descubre la ciudad de los dos continentes.",
      href: "/",
      cta: "Leer más",
      background: <img src="/turquía.jpg" className="absolute w-full h-full brightness-50 hover:scale-110 transition-all" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      name: "Cancún, México",
      description: "Disfruta de las playas más hermosas del mundo.",
      href: "/",
      cta: "Leer más",
      background: <img src="mexico.jpg" className="absolute w-full h-full brightness-50 hover:scale-110 transition-all" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      name: "Punta Cana, República Dominicana",
      description: "Relájate en el paraíso caribeño.",
      href: "/",
      cta: "Leer más",
      background: <img src="punta cana.jpg" className="absolute w-full h-full brightness-50 hover:scale-110 transition-all" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      name: "Venecia, Italia",
      description: "Descubre la ciudad de los canales.",
      href: "/",
      cta: "Leer más",
      background: <img src="venecia.jpg" className="absolute w-full h-full brightness-50 hover:scale-110 transition-all" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <>

      <section className="h-full w-full bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat ">
        <div className="mx-auto h-[80vh] xl:max-w-6xl grid content-center auto-rows-min p-4 z-10 ">
          <p className='text-xl text-white font-semibold'>Encuentra tu destino ideal</p>
          <h1 className='text-4xl font-bold text-white'>DESTINOS GLOBALES</h1>

          <BuscadorVuelos />
        </div>
      </section>
      <section className="h-full w-full">
        <div className="mx-auto xl:max-w-7xl p-4">
          <Subtitle>¡Conoce más sobre tu próximo viaje!</Subtitle>           
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>

        </div>
      </section>

      <section className="h-full w-full">
        <div className="mx-auto xl:max-w-7xl p-4">
            <Subtitle>Preguntas Frecuentes de Nuestros Viajeros</Subtitle>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" >
              <AccordionTrigger>¿Cómo puedo realizar una reserva o compra de un viaje a través de su página web?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" >
              <AccordionTrigger>¿Qué métodos de pago aceptan para realizar la compra de mis viajes?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" >
              <AccordionTrigger>¿Es seguro comprar mis viajes en su agencia en línea?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" >
              <AccordionTrigger>¿Realizan viajes nacionales e internacionales desde Madrid?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" >
              <AccordionTrigger>¿Cuales son las políticas de cancelación y reembolsos?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" >
              <AccordionTrigger>¿Cuánto tarda en llegar la confirmación de mi reserva y cómo puedo verificarla?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" >
              <AccordionTrigger>¿Puedo contactar con ustedes en caso de tener dudas durante el proceso de compra?</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </>
  );
}
