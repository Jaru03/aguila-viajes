import Image from "next/image"
import { AirplaneFill, HeartFill } from "react-bootstrap-icons"

const Boleto = () => {
    return (
        <article className="relative grid auto-rows-min grid-cols-2 border border-solid rounded-[10px] border-gray-300 w-full">
            <div className="col-[1/3] border-b border-solid border-gray-300 flex justify-between items-center px-6">
                <div className="flex justify-center items-center gap-2 py-2">Ida <AirplaneFill className="rotate-90" /></div>
                <HeartFill />

            </div>
            <div className="col-[1/3] sm:col-[1/2] flex items-start gap-4 p-4">

                <Image src="/ryanair-icon.png" alt="Ryanair" width={50} height={50} className="rounded-full" />
                <ul>
                    <li>07:40:15:30</li>
                    <li>Sin Escalas</li>
                    <li>Madrid (MAD) - Caracas (CSS)</li>
                </ul>
            </div>

            <div className="p-4 col-[1/3] sm:col-[2/3] flex items-center justify-start sm:justify-end gap-8">
                <ul className="grid grid-cols-3 grid-rows-2 gap-4">
                    <li className="flex flex-col items-center"><span>Clase</span> Q</li>
                    <li className="flex flex-col items-center"><span>Plazas</span> 1</li>
                    <li className="flex flex-col items-center"><span>Equipaje</span> 0</li>
                    <li className="flex items-center justify-center col-[1/4]">Economy Standard</li>
                </ul>

                <div className="rounded-full border absolute top-1/2 translate-y-[-50%] right-2 sm:static border-solid border-gray-300 w-10 h-10 justify-self-end"></div>

            </div>
        </article>
    )
}

export default Boleto