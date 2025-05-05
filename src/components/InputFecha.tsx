"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { es } from "react-day-picker/locale";
import { CalendarWeek } from "react-bootstrap-icons";

interface InputFechaProps {
  placeholder: string;
  classNameInput?: string;
  classNameDiv?: string;
}

const InputFecha = ({
  placeholder,
  classNameInput,
  classNameDiv,
}: InputFechaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const defaultClassNames = getDefaultClassNames();
  const divElement = useRef<HTMLDivElement>(null);

  const handleDaySelection = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(date.toLocaleDateString("es-ES"));
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!divElement.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={divElement} className="relative text-xs w-full">
      <input
        value={inputValue}
        onClick={() => setIsOpen(!isOpen)}
        type="text"
        placeholder={placeholder}
        className={`${classNameInput} bg-[#FAFAFA] border-gray-300 font-semibold pt-8 pb-5 pl-8 placeholder:text-black border border-solid w-full`}
        readOnly
      />
      <CalendarWeek
        size={14}
        className="absolute top-[34px] left-4"
        color="#22BDD9"
      />
      <span className="absolute top-4 left-4 text-gray-400">{placeholder}</span>

      {isOpen && (
        <div
          className={`${classNameDiv} absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg p-4 -translate-x-1/2 `}
        >
          <DayPicker
            locale={es}
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelection}
            disabled={{ before: new Date() }}
            classNames={{
              today: `${defaultClassNames.today} text-primary`,
              chevron: `${defaultClassNames.chevron} text-primary`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputFecha;
