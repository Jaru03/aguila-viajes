"use client";

import InputFecha from "@/components/InputFecha";
import InputLugar from "@/components/InputLugar";
import InputPasajero from "@/components/InputPasajero";
import React, { useState } from "react";
import ButtonBuscador from "./ButtonBuscador";
import Seleccionador from "./Seleccionador";
import { ListaLugares } from "@/types/ListaLugares";

const BuscadorVuelos = () => {
  const [origen, setOrigen] = useState<ListaLugares | null>(null);
  const [destino, setDestino] = useState<ListaLugares | null>(null);

  return (
    <>
      <Seleccionador />
      <div className="flex self-center flex-col mb-36 relative justify-evenly items-center rounded-lg md:rounded-tl-none bg-white w-full md:h-48 mx-auto py-4">
        <div className="flex w-full px-4 gap-x-4 text-[10px] sm:text-xs">
          <label className="flex items-center gap-2 justify-center cursor-pointer">
            <input type="checkbox" />
            <span>Vuelos directos</span>
          </label>
          <label className="flex items-center gap-2 justify-center cursor-pointer">
            <input type="checkbox" />
            <span>Equipaje incluido</span>
          </label>
          <label className="flex items-center gap-2 justify-center cursor-pointer">
            <input type="checkbox" />
            <span>Múltiples destinos</span>
          </label>
          <label className="flex items-center gap-2 justify-center cursor-pointer">
            <input type="checkbox" />
            <span>Solo ida</span>
          </label>
        </div>

        <div className="flex flex-col md:flex-row relative mt-4 w-full">
          <div className="w-full flex px-4">
            <InputLugar
              arrow={true}
              placeholder="Origen"
              classNameInput="md:rounded-bl-lg rounded-tl-lg"
              selectedValue={origen}
              onSelectLugar={setOrigen}
              lugarRestringido={destino}
            />
            <InputLugar
              arrow={false}
              placeholder="Destino"
              classNameInput="md:rounded-br-lg rounded-tr-lg"
              selectedValue={destino}
              onSelectLugar={setDestino}
              lugarRestringido={origen}
            />
          </div>

          <div className="w-full flex px-4">
            <InputFecha
              placeholder="Fecha de Ida"
              classNameInput="md:rounded-bl-lg md:rounded-tl-lg "
              classNameDiv="left-full"
            />
            <InputFecha
              placeholder="Fecha de Vuelta"
              classNameInput="md:rounded-br-lg md:rounded-tr-lg mr-4 left-0"
            />
          </div>

          <InputPasajero placeholder="Pasajeros" />

          <div className="w-full flex px-4 md:hidden">
            <ButtonBuscador className="block md:hidden rounded-t-none w-full" />
          </div>
        </div>

        <div className="hidden absolute -bottom-6 right-10 md:block w-[150px]">
          <ButtonBuscador className="" />
        </div>
      </div>
    </>
  );
};

export default BuscadorVuelos;
