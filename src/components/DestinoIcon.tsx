'use client'

import { FlagFill } from "react-bootstrap-icons"

interface Props {
    className?: string,
    name: string,
    destino: string,
    setDestinoSelect?: (destino: string) => void,
}

const DestinoIcon = ({ name, setDestinoSelect, destino }: Props) => {



    return (
        <div onClick={() => {
            setDestinoSelect && setDestinoSelect(name)
            
        }} className="flex flex-col items-center justify-center z-10 cursor-pointer">

            <div className={`rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border border-black border-solid ${name === destino ? 'bg-black' : 'bg-gray-600 '}`}>
                <FlagFill color="white" />
            </div>
            <span>
                {name}
            </span>

        </div>
    )
}

export default DestinoIcon