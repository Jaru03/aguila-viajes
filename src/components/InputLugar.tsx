"use client";

import { ListaLugares } from "@/types/ListaLugares";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, GeoAltFill } from "react-bootstrap-icons";
import axios from "axios";
import { AirDestinationAirportsListResponse } from "@/types/AirDestinationAirportsListResponse";

interface InputLugarProps {
  placeholder: string;
  classNameInput?: string;
  classNameDiv?: string;
  arrow: boolean;
  selectedValue: ListaLugares | null;
  onSelectLugar: (lugar: ListaLugares | null) => void;
  lugarRestringido?: ListaLugares | null;
}

const InputLugar = ({
  placeholder,
  classNameInput,
  classNameDiv,
  arrow,
  selectedValue,
  onSelectLugar,
  lugarRestringido,
}: InputLugarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [aeropuertos, setAeropuertos] = useState<AirDestinationAirportsListResponse | undefined>();

useEffect(() => {
  axios.get('/api/aeropuertos').then(response => setAeropuertos(response.data)).catch(error => console.error('Error fetching data:', error));
}, [])

console.log(aeropuertos)

  /* const filteredLugares = aeropuertos.filter((lugar) => {
    const match = lugar.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const isSameAsRestricted = lugarRestringido?.id === lugar.id;
    return match && !isSameAsRestricted;
  }); */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSelectLugar(null); // se borra selección al escribir
    setIsOpen(true);
  };

  const handleSelectLugar = (lugar: any) => {
    onSelectLugar(lugar);
    setSearchTerm(lugar.nombre);
    setIsOpen(false);
  };

  return (
    <div ref={divRef} className="relative text-xs w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={`${classNameInput} text-xs border-gray-300 bg-[#FAFAFA] font-semibold pt-8 pb-5 relative placeholder:text-black pl-8 border border-solid w-full`}
        value={selectedValue ? selectedValue.nombre : searchTerm}
        onChange={handleChange}
        onClick={() => setIsOpen(true)}
      />
      <GeoAltFill
        size={14}
        className="absolute top-[34px] left-4"
        color="#22BDD9"
      />
      <span className="absolute top-4 left-4 text-gray-400">{placeholder}</span>
      {arrow && (
        <div className="p-2 absolute -right-3 top-[22px] z-[2] bg-[#D9D9D9] rounded-full">
          <ArrowLeftRight width={12} height={12} />
        </div>
      )}
      {isOpen  && (
        <div
          className={`${classNameDiv} absolute w-52 h-40 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg -bottom-41 z-10`}
        >
          {aeropuertos?.s.Envelope.Body.AirDestinationAirportsListResponse.AirDestinationAirportsListResult.AirDestinationAirport.map((lugar) => (
            <div
              key={lugar.AirportLocationCode}
              onClick={() => handleSelectLugar(lugar)}
              className="grid grid-cols-2 py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm font-semibold">{lugar.Description}</p>
              <p className="text-gray-500 col-[1/2]">{lugar.Country}</p>
              <GeoAltFill className="col-[2/3] row-[1/3] self-center justify-self-end" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputLugar;
