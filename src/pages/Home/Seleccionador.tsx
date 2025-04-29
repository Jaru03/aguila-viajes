'use client'

import { useState } from "react"
import { AirplaneFill, BellFill, Grid1x2Fill, HospitalFill } from "react-bootstrap-icons"

const Seleccionador = () => {

    const [buttonSelect, setButtonSelect] = useState<string>('vuelo')

    return (
        <div className='w-full md:w-xl h-10 rounded-t-lg hidden md:block mt-28'>
            <ul className='flex items-end h-full font-semibold w-full text-gray-500 bg-primary rounded-t-lg'>
                <li onClick={() => {setButtonSelect('vuelo')}} className={`   px-4 py-1 flex justify-start items-center gap-x-2 rounded-t-lg cursor-pointer ${buttonSelect === 'vuelo' ? 'bg-white text-[#717171] h-12 ' : 'bg-primary h-full text-white'} `}> <AirplaneFill className={` ${buttonSelect === 'vuelo' ? 'text-primary' : ''}`} /> Vuelos</li>
                <li onClick={() => {setButtonSelect('oferta')}} className={`   px-4 py-1 flex justify-start items-center gap-x-2 rounded-t-lg cursor-pointer ${buttonSelect === 'oferta' ? 'bg-white text-[#717171] h-12 ' : 'bg-primary h-full text-white'}`}> <BellFill className={` ${buttonSelect === 'oferta' ? 'text-primary' : ''}`} /> Ofertas</li>
                <li onClick={() => {setButtonSelect('hoteles')}} className={`   px-4 py-1 flex justify-start items-center gap-x-2 rounded-t-lg cursor-pointer ${buttonSelect === 'hoteles' ? 'bg-white text-[#717171] h-12  ' : 'bg-primary h-full text-white'}`}> <HospitalFill className={` ${buttonSelect === 'hoteles' ? 'text-primary' : ''}`} /> Hoteles</li>
                <li onClick={() => {setButtonSelect('turismo')}} className={`   px-4 py-1 flex justify-start items-center gap-x-2 rounded-t-lg cursor-pointer ${buttonSelect === 'turismo' ? 'bg-white text-[#717171] h-12  ' : 'bg-primary h-full text-white'}`}> <Grid1x2Fill className={` ${buttonSelect === 'turismo' ? 'text-primary' : ''}`} /> Circuitos Turisticos</li>
            </ul>
        </div>
    )
}

export default Seleccionador