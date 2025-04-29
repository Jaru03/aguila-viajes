'use client'

import Boleto from "@/components/Boleto"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Subtitle from "@/components/Subtitle"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, PersonCircle, TicketDetailedFill } from "react-bootstrap-icons"

type TMobileView = 1 | 2 | 3
const page = () => {
    const [mobileView, setMobileView] = useState<TMobileView>(1)

    return (
        <>
            <section className="h-full w-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-8 mx-auto xl:max-w-7xl p-4  ">

                    <aside className={`${mobileView !== 1 ? 'hidden' : 'flex'} md:flex row-[1/4] bg-gray-400 w-full md:w-xs md:max-h-[614px] flex flex-col justify-center items-center gap-4 px-4 py-16 rounded-[10px] border border-solid border-gray-300`}>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <Image src="/ryanair-icon.png" alt="Ryanair" width={200} height={200} className="rounded-full" />
                            <h2 className="text-2xl font-semibold mt-4">Hola, Oscar</h2>
                            <p>correo@gmail.com</p>
                        </div>
                        <ul className="w-full">
                            <li onClick={() => { setMobileView(2) }} className="flex items-center py-4 border-y border-solid border-black cursor-pointer hover:bg-gray-200 px-4  w-full"><PersonCircle size={25} /><span className="text-center w-full font-semibold">Mi cuenta</span></li>
                            <li onClick={() => { setMobileView(3) }} className="flex items-center py-4 border-y border-solid border-black cursor-pointer hover:bg-gray-200 px-4  border-t-0 w-full"><TicketDetailedFill size={25} /><span className="text-center w-full font-semibold">Reservas</span></li>
                        </ul>

                        <Button className="w-full">Cerrar Sesión</Button>
                    </aside>

                    <article className={`${mobileView !== 2 ? 'hidden' : 'grid'} ${mobileView === 2 || mobileView === 1 ? 'md:grid' : 'md:hidden'} md:col-[2/3] w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2`}>
                        <span onClick={() => { setMobileView(1) }} className=" flex items-center gap-2 cursor-pointer md:hidden pt-4"><ChevronLeft size={20} /> Atras</span>

                        <Subtitle className="md:col-[1/4]">Datos Personales</Subtitle>
                        <Input placeholder="Nombre" />
                        <Input placeholder="Apellido" />
                        <Input placeholder="Apellido 2" />
                        <Input placeholder="Sexo" />
                        <Input placeholder="Fecha de Nacimiento" />
                        <Input placeholder="Prefijo" />
                        <Input placeholder="Teléfono" />
                        <Input placeholder="E-mail" />
                        <Input placeholder="Nacionalidad" />
                        <Input placeholder="Documento" />
                        <Input placeholder="Número de Documento" />
                    </article>
                    <article className={`${mobileView !== 2 ? 'hidden' : 'block'} ${mobileView === 2 || mobileView === 1 ? 'md:block' : 'md:hidden'} md:block w-full md:col-[2/3]`}>
                        <Subtitle>Actualizar Contraseña</Subtitle>
                        <Button className="w-full md:w-1/2">Cambiar Contraseña</Button>
                    </article>
                    <article className={`${mobileView !== 2 ? 'hidden' : 'grid'} ${mobileView === 2 || mobileView === 1 ? 'md:grid' : 'md:hidden'}  w-full md:col-[2/3] grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2`}>
                        <Subtitle className='md:col-[1/4]' >Dirección</Subtitle>
                        <Input placeholder="Dirección" />
                        <Input placeholder="Nombre" />
                        <Input placeholder="CP" />
                    </article>

                    <div className={`${mobileView !== 3 ? 'hidden' : 'flex'} ${mobileView === 3 ? 'md:flex' : 'md:hidden'} flex flex-col gap-4 md:col-[2/3] w-full`}>
                        <span onClick={() => { setMobileView(1) }} className=" flex items-center gap-2 cursor-pointer md:hidden pt-4"><ChevronLeft size={20} /> Atras</span>
                        <Subtitle className="self-start">Tus reservas</Subtitle>
                        <Boleto />
                        <Boleto />
                        <Boleto />
                    </div>

                </div>

            </section>
        </>
    )
}

export default page