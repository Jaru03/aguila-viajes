
import InputFecha from '@/components/InputFecha'
import InputLugar from '@/components/InputLugar'
import InputPasajero from '@/components/InputPasajero'
import React from 'react'
import ButtonBuscador from './ButtonBuscador'
import Seleccionador from './Seleccionador'

const BuscadorVuelos = () => {
    return (
        <>
            <Seleccionador />
            <div className="flex self-center flex-col mb-36 relative justify-evenly items-center  rounded-lg md:rounded-tl-none bg-white w-full md:h-48  mx-auto py-4">


                {<div className='flex w-full px-4 gap-x-4 text-[10px] sm:text-xs'>
                    <label className='flex items-center gap-2 justify-center cursor-pointer'>
                        <input type="checkbox" name="" id="" />
                        <span>Vuelos directos</span>
                    </label>
                    <label className='flex items-center gap-2 justify-center cursor-pointer'>
                        <input type="checkbox" name="" id="" />
                        <span>Equipaje incluido</span>
                    </label>
                    <label className='flex items-center gap-2 justify-center cursor-pointer'>
                        <input type="checkbox" name="" id="" />
                        <span>Múltiples destinos</span>
                    </label>
                    <label className='flex flexcol items-center gap-2 justify-center cursor-pointer'>
                        <input type="checkbox" name="" id="" />
                        <span>Solo ida</span>
                    </label>
                </div>}
                <div className='flex flex-col md:flex-row relative mt-4 w-full'>

                    <div className='w-full flex px-4'>
                        <InputLugar arrow={true} placeholder="Origen" classNameInput="md:rounded-bl-lg rounded-tl-lg " />
                        <InputLugar arrow={false} placeholder="Destino" classNameInput=" md:rounded-br-lg rounded-tr-lg" />
                    </div>
                    <div className='w-full flex px-4'>
                        <InputFecha placeholder='Fecha de Ida' classNameInput='md:rounded-bl-lg md:rounded-tl-lg' />
                        <InputFecha placeholder='Fecha de Vuelta' classNameInput='md:rounded-br-lg md:rounded-tr-lg mr-4' />
                    </div>

                    <InputPasajero placeholder='Pasajeros' />

                    <div className='w-full flex px-4 md:hidden'>

                        <ButtonBuscador className='block md:hidden rounded-t-none w-full' />
                    </div>

                </div>
                <div className='hidden absolute -bottom-6 right-10 md:block w-[150px]'>
                    <ButtonBuscador className='' />
                </div>
            </div>
        </>
    )
}

export default BuscadorVuelos