import Boleto from "@/components/Boleto"
import {  ChevronCompactLeft, ChevronCompactRight, HeartFill, Search } from "react-bootstrap-icons"

const page = () => {
    return (
        <>
            <section className="h-full w-full bg-primary">
                <div className=" mx-auto xl:max-w-7xl p-4 xl:px-0 md:py-10 ">

                    <div className="grid grid-cols-2 gap-4">
                        <article className="bg-white flex items-center justify-center border rounded-[10px] border-solid relative py-2 px-4 border-gray-300 w-full col-[1/3]">
                            <Search className="absolute left-2" />
                            <span>Madrid</span></article>
                        <article className="bg-white border border-solid py-2 px-4 text-center rounded-[10px] border-gray-300 w-full flex justify-between items-center"><ChevronCompactLeft />  <span>Lun, 29 mar.</span> <ChevronCompactRight /> </article>
                        <article className="bg-white border border-solid py-2 px-4 text-center rounded-[10px] border-gray-300 w-full flex justify-between items-center "><ChevronCompactLeft /> <span>Jue. 17 abr</span> <ChevronCompactRight /></article>

                    </div>

                </div>
            </section>
            <section className="h-full w-full p-4">
                <div className="mx-auto xl:max-w-7xl">
                    <div className="grid grid-cols-2 gap-4 mb-10">

                        <div className="border border-solid py-2 px-4 text-center rounded-[10px] border-gray-300 w-full flex justify-center items-center">Filtrar</div>
                        <div className="border border-solid py-2 px-4 text-center rounded-[10px] border-gray-300 w-full flex justify-center items-center "> Ordenar</div>
                        <p>70 resultados encontrados.</p>

                        <div className="flex justify-between items-center row-[3/4] col-[1/3]">
                            <div className="w-full py-4 flex justify-center border border-solid rounded-tl-[10px] rounded-bl-[10px] border-gray-300">
                                <ul className="flex flex-col items-center">
                                    <li>Mejor opción</li>
                                    <li>800$</li>
                                    <li>9:05m de media</li>
                                </ul>
                            </div>
                            <div className="w-full py-4 flex justify-center border border-solid border-gray-300">
                                <ul className="flex flex-col items-center">
                                    <li>Mejor precio</li>
                                    <li>750$</li>
                                    <li>12:30m de media</li>
                                </ul>
                            </div>
                            <div className="w-full py-4 flex justify-center border border-solid rounded-tr-[10px] rounded-br-[10px] border-gray-300">
                                <ul className="flex flex-col items-center">
                                    <li>Más rápido</li>
                                    <li>850$</li>
                                    <li>8:40m de media</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-4">

                    <Boleto/>
                    <Boleto/>
                    <Boleto/>
                    <Boleto/>
                    </div>

                </div>
            </section>
        </>
    )
}

export default page