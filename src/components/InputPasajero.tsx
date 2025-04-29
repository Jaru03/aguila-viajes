'use client'

import { useEffect, useRef, useState } from "react"
import { DashCircleFill, PersonFill, PlusCircleFill } from "react-bootstrap-icons";

interface InputFechaProps {
    placeholder: string;
    classNameInput?: string;
    classNameDiv?: string;
}

const InputPasajero = ({ placeholder, classNameInput, classNameDiv }: InputFechaProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [pasajero, setPajero] = useState<number>(0)
    const [children, setChildren] = useState<number>(0)
    const [baby, setBaby] = useState<number>(0)

    const divElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!divElement.current?.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { }), [pasajero, children, baby]

    const handleValue = () => {
        if (pasajero > 0 || children > 0 || baby > 0) {
            return `${pasajero + children + baby}`
        }
    }

    return (
        <div ref={divElement} className="relative text-xs w-full md:w-1/3 px-4">
            <input value={handleValue()} onClick={() => { setIsOpen(!isOpen) }} type="text" placeholder={placeholder} className={`${classNameInput} bg-[#FAFAFA] py-5 text-xs font-semibold pt-8 pb-5 pl-8 placeholder:text-black border border-solid md:rounded-b-lg md:rounded-t-lg border-gray-300 w-full`} />
            <PersonFill size={15} className="absolute top-[34px] left-8" color="#22BDD9" />
            <span className="absolute top-4 left-8 text-gray-400 ">{placeholder}</span>
            {isOpen && (
                <div className="absolute grid grid-rows-3 gap-4 py-2 px-4 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10 ">
                    <div className="flex justify-between items-center">Adulto (12+) <span className="flex items-center gap-x-2"> <DashCircleFill className="cursor-pointer" onClick={() => { pasajero <= 0 ? setPajero(0) : setPajero(pasajero - 1) }} /> {pasajero} <PlusCircleFill className="cursor-pointer" onClick={() => { setPajero(pasajero + 1) }} /></span></div>
                    <div className="flex justify-between items-center">Niño (2-11) <span className="flex items-center gap-x-2"> <DashCircleFill className="cursor-pointer" onClick={() => { children <= 0 ? setChildren(0) : setChildren(children - 1) }} /> {children} <PlusCircleFill className="cursor-pointer" onClick={() => { setChildren(children + 1) }} /></span></div>
                    <div className="flex justify-between items-center">Bebé (-2) <span className="flex items-center gap-x-2"> <DashCircleFill className="cursor-pointer" onClick={() => { baby <= 0 ? setBaby(0) : setBaby(baby - 1) }} /> {baby} <PlusCircleFill className="cursor-pointer" onClick={() => { setBaby(baby + 1) }} /></span></div>
                </div>
            )}
        </div>
    )
}

export default InputPasajero