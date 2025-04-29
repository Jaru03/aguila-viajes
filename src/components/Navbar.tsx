'use client'

import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image"
import { useState } from "react";
import { BagCheckFill, ChevronBarLeft, ChevronLeft, Facebook, Google, HeartFill, InfoCircleFill, Justify, PersonFill, X } from "react-bootstrap-icons"
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type RegisterFormInputs = {
  name: string;
  lastName: string;
  email: string;
  genre: string;
  password: string;
  confirmPassword: string;
}

const Navbar = () => {

  const [login, setLogin] = useState(false)
  const [showRegisterEmail, setShowRegisterEmail] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } =
    useForm<RegisterFormInputs>()
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => console.log(data)

  const password = watch("password");

  return (
    <nav className="relative z-10 block ">
      <div className="w-full h-10 bg-primary"></div>
      <div className='w-full relative flex justify-between items-center px-4 z-10 overflow-x-hidden' >
        <Link href={'/'} className="flex items-center cursor-pointer hover:scale-105 transition-all duration-300">
          <Image src="/logo.png" alt="Logo" width={1000000} height={100000} className="h-full w-full max-w-[75px]" />
          <p className={`${hankenGrotesk.variable} hidden sm:block font-extrabold text-primary`}>AGUILA VIAJES</p>
        </Link>

        <ul className="hidden md:flex justify-center  items-center gap-x-4 font-semibold text-primary">
          <li onClick={() => { setLogin(!login) }} className="flex cursor-pointer items-center gap-x-2"><PersonFill /><span>Iniciar Sesión</span></li>
          <li ><Link href={'/account'} className="flex cursor-pointer items-center gap-x-2"><BagCheckFill /><span>Gestionar Reserva</span></Link></li>
          <li><Link href={'/'} className="flex cursor-pointer items-center gap-x-2"> <InfoCircleFill /><span>¿Te podemos ayudar?</span></Link></li>
        </ul>

        <Justify className="md:hidden" size={25} color="#22BDD9" onClick={() => { setShowMenu(!showMenu) }} />

        <ul className={`md:hidden fixed top-0 ${showMenu ? 'right-0' : '-right-[750px]'}  h-[100vh] bg-primary  w-[80%]  font-semibold text-primary`}>
          <div className=" relative flex flex-col justify-evenly items-center gap-4 h-full">
            <X size={25} onClick={() => { setShowMenu(!showMenu) }} color="red" className="absolute top-10 right-10 cursor-pointer md:hidden" />
            <li onClick={() => { setLogin(!login) }} className="flex cursor-pointer items-center gap-x-2"><PersonFill /><span>Iniciar Sesión</span></li>
            <li ><Link href={'/account'} className="flex cursor-pointer items-center gap-x-2"><BagCheckFill /><span>Gestionar Reserva</span></Link></li>
            <li><Link href={'/'} className="flex cursor-pointer items-center gap-x-2"> <InfoCircleFill /><span>¿Te podemos ayudar?</span></Link></li>

          </div>
        </ul>
      </div>

      <div className={`h-screen w-full ${login ? 'fixed' : 'hidden'} backdrop-brightness-50 z-20 top-0 p-4`}>

        <div className="bg-[#F0F0F0] relative w-full md:w-96 rounded-[10px] p-4 left-1/2 z-20 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
          <ChevronLeft size={20} onClick={() => { setShowRegisterEmail(!showRegisterEmail) }} className={`${showRegisterEmail ? 'absolute' : 'hidden'} top-10 left-10 cursor-pointer`} />

          <X size={25} color="red" onClick={() => { setLogin(!login) }} className="absolute top-10 right-10 cursor-pointer" />
          <Image src={'/logo.png'} alt="Logo" width={150} height={150} className="mx-auto" />
          {
            showRegisterEmail ?
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 pb-5">
                <h3 className="text-xl font-semibold text-center">Registrate con E-mail</h3>
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                <Input
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres"
                    }
                  })}
                  className="w-full"
                  placeholder="Nombre"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                <Input
                  {...register("lastName", {
                    required: "El apellido es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres"
                    }
                  })}
                  className="w-full"
                  placeholder="Apellido"
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}

                <Input
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: "Formato de correo inválido"
                    }
                  })}
                  type="email"
                  className="w-full"
                  placeholder="E-mail"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                <select
                  {...register("genre", {
                    required: "Selecciona un sexo"
                  })}
                  className="px-4 py-2 border border-solid border-gray-300 rounded-[5px] text-gray-500"
                >
                  <option disabled value="">Sexo</option>
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                </select>
                {errors.genre && <span className="text-red-500 text-sm">{errors.genre.message}</span>}

                <Input
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres"
                    }
                  })}
                  className="w-full"
                  type="password"
                  placeholder="Contraseña"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                <Input
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden"
                  })}
                  className="w-full"
                  type="password"
                  placeholder="Confirmar contraseña"
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

                <Button className="w-full">Registrarse</Button>

              </form> :
              <div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold">¡Consigue descuentos Exclusivos!</h3>
                  <p className="text-sm max-w-[300px] ">Inicia sesión y accede a un menú de descuentos exclusivos en tus viajes.</p>
                </div>

                <div className=" flex flex-col gap-2 justify-center items-center w-full py-5">
                  <div onClick={() => { setShowRegisterEmail(true) }} className="px-4 py-2 flex items-center rounded-[10px] w-full justify-center cursor-pointer transition-all duration-300 hover:scale-105 bg-[#D9D9D9] text-[#4E4E4E]"> <span>Continuar con correo electronico</span></div>
                  <div className="px-4 py-2 flex items-center rounded-[10px] w-full justify-center cursor-pointer transition-all duration-300 hover:scale-105 text-white gap-4 bg-[#3B5998]"> <Facebook /> <span>Facebook</span></div>
                  <div className="px-4 py-2 flex items-center rounded-[10px] w-full justify-center cursor-pointer transition-all duration-300 hover:scale-105 text-white gap-4 bg-[#EA4335]"> <Google /> <span>Google</span></div>
                </div>

                <div className="py-5 flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Recuérdame</span>
                  </label>
                  <p className="text-xs">Al continuar, aceptas nuestras Condiciones del servicio y nuestra Politica de privacidad</p>
                </div>

              </div>
          }

        </div>
      </div>
    </nav>
  )
}

export default Navbar