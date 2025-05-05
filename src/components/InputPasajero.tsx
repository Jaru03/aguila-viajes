"use client";

import { useEffect, useRef, useState } from "react";
import {
  DashCircleFill,
  PersonFill,
  PlusCircleFill,
} from "react-bootstrap-icons";

interface InputPasajeroProps {
  placeholder: string;
  classNameInput?: string;
  classNameDiv?: string;
}

const InputPasajero = ({
  placeholder,
  classNameInput,
  classNameDiv,
}: InputPasajeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [baby, setBaby] = useState(0);

  const divElement = useRef<HTMLDivElement>(null);

  const totalPassengers = adult + children + baby;

  const handleValue = () => {
    if (totalPassengers === 0) return "";
    return `${totalPassengers} pasajer${totalPassengers === 1 ? "o" : "os"}`;
  };

  const updateCount = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    setter((prev) => Math.max(0, prev + value));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!divElement.current?.contains(e.target as Node)) setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={divElement} className="relative text-xs w-full md:w-1/3 px-4">
      <input
        value={handleValue()}
        onClick={() => setIsOpen(!isOpen)}
        type="text"
        placeholder={placeholder}
        className={`${classNameInput} bg-[#FAFAFA] py-5 text-xs font-semibold pt-8 pb-5 pl-8 placeholder:text-black border border-solid md:rounded-b-lg md:rounded-t-lg border-gray-300 w-full`}
        readOnly
      />
      <PersonFill
        size={15}
        className="absolute top-[34px] left-8"
        color="#22BDD9"
      />
      <span className="absolute top-4 left-8 text-gray-400">{placeholder}</span>

      {isOpen && (
        <div
          className={`
            absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 
            w-full md:min-w-[14rem]
            left-0 sm:left-auto sm:right-0
            ${classNameDiv}
          `}
        >
          {[
            { label: "Adulto (12+)", value: adult, set: setAdult },
            { label: "Niño (2-11)", value: children, set: setChildren },
            { label: "Bebé (-2)", value: baby, set: setBaby },
          ].map(({ label, value, set }) => (
            <div
              key={label}
              className="flex justify-between items-center mb-3 last:mb-0"
            >
              <span>{label}</span>
              <span className="flex items-center gap-x-2">
                <DashCircleFill
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                  onClick={() => updateCount(set, -1)}
                />
                {value}
                <PlusCircleFill
                  className="cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => updateCount(set, 1)}
                />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputPasajero;
