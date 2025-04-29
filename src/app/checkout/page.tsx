'use client'

import Input from '@/components/Input'
import Image from 'next/image'
import React, { FormEvent, MouseEventHandler, useState } from 'react'
import { AirplaneFill, Alarm, ArrowRight, Luggage } from 'react-bootstrap-icons'

type Pasos = 1 | 2 | 3

const page = () => {

    const [menuActive, setMenuActive] = useState<boolean>(false)
    const [selectReserva, setSelectReserva] = useState<Pasos>(1)
    const [selectMethodPayment, setSelectMehotdPayment] = useState<Pasos>(1)

    const handleClickForm = (e: FormEvent) => {
        e.preventDefault()

        if (selectReserva === 1) {
            setSelectReserva(2)
        }
        else if (selectReserva === 2) {
            setSelectReserva(3)
        }
    }

    return (
        <>
            <section className="h-full w-full">
                <div className="md:grid mx-auto xl:max-w-7xl gap-x-4 p-4 md:grid-cols-[1fr_auto] relative">
                    <div className='flex flex-col gap-2'>

                        <div className="grid grid-cols-3 grid-rows-2">
                            <h2 className='row-[1/2] col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>COMPLETA TU RESERVA</h2>
                            <span className={`${selectReserva === 1 ? 'bg-gray-300' : ''} w-full h-20 py-4 flex justify-center items-center border border-solid rounded-tl-[10px] rounded-bl-[10px] border-gray-300`}>
                                1.Identificación
                            </span>
                            <span className={`${selectReserva === 2 ? 'bg-gray-300' : ''} w-full h-20 py-4 flex justify-center items-center border border-solid border-gray-300`}>
                                2.Pago
                            </span>
                            <span className={`${selectReserva === 3 ? 'bg-gray-300' : ''} w-full h-20 py-4 flex justify-center items-center border border-solid rounded-tr-[10px] rounded-br-[10px] border-gray-300`}>
                                3.Confirmación
                            </span>
                        </div>

                        <>
                            {selectReserva === 1 ?
                                <form>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                                        <h2 className='md:col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Datos del Comprador</h2>
                                        <Input placeholder='Nombre' />
                                        <Input placeholder='Apellido' />
                                        <Input placeholder='Apellido 2' />
                                        <Input placeholder='Nacionalidad' />
                                        <Input placeholder='Tipo de Documento' />
                                        <Input placeholder='Número de Documento' />
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                                        <h2 className='md:col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Datos de Contacto</h2>
                                        <Input placeholder='E-mail' />
                                        <Input placeholder='Confirmar e-mail' />
                                        <Input placeholder='Prefijo' />
                                        <Input placeholder='Móvil' />
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                                        <h2 className='md:col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Dirección</h2>
                                        <Input placeholder='Dirección' />
                                        <Input placeholder='País' />
                                        <Input placeholder='CP' />
                                        <Input placeholder='Provincia' />
                                        <Input placeholder='Población' /></div>
                                    <div className='grid grid-rows-[1fr_auto_auto] gap-x-4 gap-y-2'>
                                        <h2 className='pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Comunicaciones</h2>

                                        <label htmlFor="">
                                            <input type="checkbox" name="" id="" />
                                            <span>Acepto</span>
                                        </label>

                                        <label htmlFor="">

                                            <input type="checkbox" name="" id="" />
                                            <span>Acepto</span>
                                        </label>

                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                                        <h2 className='md:col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Datos de Pasajero</h2>
                                        <Input placeholder='Nombre' />
                                        <Input placeholder='Apellido' />
                                        <Input placeholder='Apellido 2' />
                                        <Input placeholder='Sexo' />
                                        <button onClick={handleClickForm} className='md:col-[3/4] md:row-[4/5] px-4 py-2 bg-black rounded-[15px] text-white'>Buscar</button>
                                    </div>
                                </form>

                                : selectReserva === 2 ?
                                    <div>
                                        <div className='grid grid-cols-3 gap-x-4'>
                                            <h2 className='col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Datos de Pasajero</h2>
                                            <span onClick={() => { setSelectMehotdPayment(1) }} className="w-full h-20 py-4 flex justify-center items-center border border-solid rounded-[15px]  border-gray-300">
                                                Transferencia Bancaraia
                                            </span>
                                            <span onClick={() => { setSelectMehotdPayment(2) }} className="w-full h-20 py-4 flex justify-center items-center border border-solid rounded-[15px] border-gray-300">
                                                Tarjeta
                                            </span>
                                            <span onClick={() => { setSelectMehotdPayment(3) }} className="w-full h-20 py-4 flex justify-center items-center border border-solid rounded-[15px]  border-gray-300">
                                                Bizum
                                            </span>


                                        </div>

                                        {
                                            selectMethodPayment === 1 ?
                                                <div>transferencia bancaria</div>
                                                : selectMethodPayment === 2 ?
                                                <div>
                                                    <h2 className='md:col-[1/4] pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Datos de Pasajero</h2>
                                                    <div className='grid grid-cols-2 p-16 py-8 gap-2 bg-[#DADADA] rounded-[15px]'>
                                                        <h3 className='col-[1/3] text-xl text-center mb-4 font-semibold'>Pago con tarjeta</h3>
                                                        <Input className=' bg-white col-[1/3]' placeholder='Número de tarjeta' />
                                                        <Input className=' bg-white col-[1/2]' placeholder='Vencimiento' />
                                                        <Input className=' bg-white col-[2/3]' placeholder='CVV' />
                                                        <Input className=' bg-white col-[1/3]' placeholder='Nombre en la tarjeta' />
                                                        <button onClick={handleClickForm} className='col-[1/3] px-4 py-2 mt-1 bg-black rounded-[15px] text-white'>Buscar</button>
                                                    </div>

                                                </div>
                                                : selectMethodPayment === 3 ? 
                                                <div> Bizum</div> : null 
                                        }


                                    </div> : selectReserva === 3 ? <div> en proceso</div> : null

                            }
                        </>



                    </div>

                    <div onClick={() => { setMenuActive(!menuActive) }} className='absolute z-10 right-0 top-10 md:hidden'>X</div>

                    <aside className={`bg-[#FAFAFA] rounded-[10px] p-4 w-xs fixed md:static transition-all ease-in-out duration-200 top-0 ${menuActive ? 'right-0' : "left-[3500px]"} md:absolute md:right-0`}>

                        <div className='flex flex-col justify-center'>
                            <h3 className='text-xl font-semibold justify-self-center self-center'>Resumen de tu Reserva</h3>
                            <div className='flex items-center justify-between gap-2 py-2 px-4'>
                                <p>Precio final</p> <span>661</span>
                            </div>

                            <div className='border border-solid border-gray-300 flex items-center p-2 rounded-[10px] gap-2 justify-center'> <Alarm /> <span>Precio disponible por 4:00</span></div>
                        </div>


                        <article className='bg-[#D9D9D9] rounded-[10px] p-4 mt-4'>
                            <div>
                                <div className='flex items-center gap-2'> <span>Ida</span> <AirplaneFill className='rotate-90' /></div>

                                <div className='flex items-center justify-between py-2'>
                                    <div className='flex items-center gap-2'><Image alt='' width={45} height={45} src={'/ryanair-icon.png'} className='rounded-full' />
                                        <span>Ryanair</span>
                                    </div>
                                    <span>UX71</span>
                                </div>

                                <div className='flex items-center justify-between py-2'>

                                    <ul className='text-xs flex flex-col gap-2 text-center'>
                                        <li>Sabado 22, Marzo</li>
                                        <li className='text-xl '>MAD <span className='text-sm'>16:40</span></li>
                                        <li className='text-xs text-left'>Adolfo Suárez Madrid Barajas</li>
                                    </ul>
                                    <ArrowRight width={20} className='mx-1' />
                                    <ul className='text-xs flex flex-col gap-2 text-center'>
                                        <li>Sabado 22, Marzo</li>
                                        <li className='text-xl'>  MAD <span className='text-sm'>16:40</span> </li>
                                        <li className='text-xs text-right'>Adolfo Suárez Madrid Barajas</li>
                                    </ul>
                                </div>
                                <div className='flex items-center justify-between border-dashed border-y border-black py-2'>
                                    <p className='text-xs'>No incluye maletas</p>
                                    <Luggage />
                                </div>

                                <div>
                                    <p className='text-xs pt-2'>Economy Standard</p>
                                </div>

                            </div>

                        </article>
                        <article className='bg-[#D9D9D9] rounded-[10px] p-4 mt-4'>
                            <div>
                                <div className='flex items-center gap-2'> <span>Ida</span> <AirplaneFill className='rotate-90' /></div>

                                <div className='flex items-center justify-between py-2'>
                                    <div className='flex items-center gap-2'><Image alt='' width={45} height={45} src={'/ryanair-icon.png'} className='rounded-full' />
                                        <span>Ryanair</span>
                                    </div>
                                    <span>UX71</span>
                                </div>

                                <div className='flex items-center justify-between py-2'>

                                    <ul className='text-xs flex flex-col gap-2 text-center'>
                                        <li>Sabado 22, Marzo</li>
                                        <li className='text-xl '>MAD <span className='text-sm'>16:40</span></li>
                                        <li className='text-xs text-left'>Adolfo Suárez Madrid Barajas</li>
                                    </ul>
                                    <ArrowRight width={20} className='mx-1' />
                                    <ul className='text-xs flex flex-col gap-2 text-center'>
                                        <li>Sabado 22, Marzo</li>
                                        <li className='text-xl'>  MAD <span className='text-sm'>16:40</span> </li>
                                        <li className='text-xs text-right'>Adolfo Suárez Madrid Barajas</li>
                                    </ul>
                                </div>
                                <div className='flex items-center justify-between border-dashed border-y border-black py-2'>
                                    <p className='text-xs'>No incluye maletas</p>
                                    <Luggage />
                                </div>

                                <div>
                                    <p className='text-xs pt-2'>Economy Standard</p>
                                </div>

                            </div>

                        </article>


                    </aside>
                </div >
            </section >
        </>
    )
}

export default page