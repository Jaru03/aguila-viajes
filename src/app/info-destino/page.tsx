'use client'

import Boleto from '@/components/Boleto'
import DestinoIcon from '@/components/DestinoIcon'
import { DestinoInfo } from '@/types/DestinoInfo'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ChevronCompactLeft, ChevronCompactRight, Search } from 'react-bootstrap-icons'

const page = () => {

    const [destinoSelect, setDestinoSelect] = useState('Destino 1')
    const [destinoInfo, setDestinoInfo] = useState<DestinoInfo | null>(null)

    const destino = [
        {
            name: "Destino 1",
            img: "/ryanair-icon.png",
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi eveniet itaque similique culpa placeat aperiam ipsam quae magnam officiis! Perferendis quis ut fugit nemo nam numquam, explicabo nulla quidem assumenda?'
        },
        {
            name: "Destino 2",
            img: "/francia.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi eveniet itaque similique culpa placeat aperiam ipsam quae magnam officiis! Perferendis quis ut fugit nemo nam numquam, explicabo nulla quidem assumenda?'
        },
        {
            name: "Destino 3",
            img: "/hero.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi eveniet itaque similique culpa placeat aperiam ipsam quae magnam officiis! Perferendis quis ut fugit nemo nam numquam, explicabo nulla quidem assumenda?'
        },
        {
            name: "Destino 4",
            img: "/mexico.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi eveniet itaque similique culpa placeat aperiam ipsam quae magnam officiis! Perferendis quis ut fugit nemo nam numquam, explicabo nulla quidem assumenda?'
        },
        {
            name: "Destino 5",
            img: "/turquía.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi eveniet itaque similique culpa placeat aperiam ipsam quae magnam officiis! Perferendis quis ut fugit nemo nam numquam, explicabo nulla quidem assumenda?'
        },

    ]

    useEffect(() => {
        const destinoEncontrado = destino.find(d => d.name === destinoSelect)
        setDestinoInfo(destinoEncontrado || null)
    }, [destinoSelect])

    console.log(destinoInfo)

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
            <section className="h-full w-full">

                <div className=" mx-auto grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:max-w-7xl p-4 ">
                    <h2 className='pl-4 md:col-[1/3] border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>La mejor opción para este viaje</h2>

                    <Boleto />
                    <Boleto />


                </div>

                <div className='mx-auto xl:max-w-7xl p-4'>
                    <h2 className='pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>Viaje a Francia - Vacaciones de Ensueño</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente commodi maiores molestiae vero quidem quas optio tempore hic voluptatum? Ut sint eligendi corrupti explicabo eum. Ea dolorum omnis unde.</p>

                </div>
                <div className='mx-auto xl:max-w-7xl p-4'>
                    <h2 className='pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>La mejor opción para este viaje</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente commodi maiores molestiae vero quidem quas optio tempore hic voluptatum? Ut sint eligendi corrupti explicabo eum. Ea dolorum omnis unde.</p>

                </div>
                <div className='mx-auto xl:max-w-7xl p-4 flex flex-col'>
                    <h2 className='pl-4 border border-l-3 my-10 border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>La mejor opción para este viaje</h2>
                    <div className='flex justify-between relative'>
                        {
                            destino?.map((destino) => (
                                <DestinoIcon destino={destinoSelect} setDestinoSelect={setDestinoSelect} name={destino.name} key={destino.name} />
                            ))

                        }

                        <div className='border border-solid border-black w-[80%] min-[460px]:w-[86%] sm:w-[90%] md:w-[94%] absolute top-5 md:top-7 right-8'></div>


                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-10 auto-rows-min'>

                        <Image className='w-full max-w-96 justify-self-center' src={destinoInfo?.img || '/francia.jpg'} alt='Destino' width={200} height={200} />
                        <div className='md:col-[2/3]'>
                            <h2 className='pl-4 border border-l-3 my-10 self-center border-black border-y-0 border-r-0 border-solid text-xl flex items-center'>{destinoInfo?.name}</h2>
                            <p>{destinoInfo?.description}</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default page