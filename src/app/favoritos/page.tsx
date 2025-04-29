import Boleto from "@/components/Boleto"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import Subtitle from "@/components/Subtitle"

const page = () => {

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
            <section className="h-full w-full">
                <div className="w-full mx-auto xl:max-w-7xl p-4 grid grid-cols-1 gap-4">
                    <Subtitle>Tus Favoritos</Subtitle>

                    <Boleto />
                    <Boleto />
                    <Boleto />

                </div>
                <div className="w-full mx-auto xl:max-w-7xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Subtitle className="md:col-[1/6]" >¡Conoce más sobre tu próximo viaje!</Subtitle>

                    <BentoGrid className="md:flex md:col-[1/6]">


                            {
                                features.map(destino => (
                                    <BentoCard key={destino.name} {...destino} />
                                ))
                            }
                    </BentoGrid>
                </div>
            </section>
        </>
    )
}

export default page