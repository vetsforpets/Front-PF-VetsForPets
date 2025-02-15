 "use client";

import React, { useState } from 'react'
import { IUserFormData } from '@/interfaces/registerTypes';
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterUser } from '@/services/servicesUser';
import { toast } from 'sonner';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar los íconos

function OwnPetFormRegister() {
  const router = useRouter()
  const user = localStorage.getItem("user")
  
  const { handleSubmit, control, watch } = useForm<IUserFormData>({
    defaultValues: {
      name: "",
      lastName: "",
      age: 0,
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      imgProfile: "",
    },
    mode: "onChange"
  });
  
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const onSubmit: SubmitHandler<IUserFormData> = async (data: IUserFormData) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    await RegisterUser(data)
    toast.success("Usuario registrado con éxito", {
      duration: 3000,
      style: {
        color: "#155724",
        background: "#d4edda",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #c3e6cb",
      },
    })
    router.push("/login")
  };

  useEffect(() => {
    if (user) {
      toast.error("Ruta Protegida", {
        duration: 3000,
        style: {
          color: "#dc3545",
          background: "#f8d7da",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #f5c6cb",
        },
      });
      redirect("/")
    }
  }, [user]);
  
  return (
    <form
      className="border-none rounded-lg sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-customBrown">Registro dueño de mascota</h1>
      <p className="mt-4 mb-3">
        ¿Ya tienes cuenta? <Link href="/login" className=" text-customBrown hover:text-customHardBrown">inicia sesión</Link>
      </p>
      
      <Controller
        name="imgProfile"
        control={control}
        rules={{
          required: { value: true, message: "Imagen de perfil obligatoria" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className='flex gap-4 items-center justify-center'>
            <label className='text-sm ml-2 w-40'>
              Imagen de perfil
            </label>
            <input {...field} type="file" className="customInput" />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: "Nombre obligatorio." },
          minLength: { value: 5, message: "El nombre debe tener al menos 5 caracteres." },
          maxLength: { value: 50, message: "El nombre no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type='text' className="customInput" placeholder='Nombre'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      
      <Controller
        name="lastName"
        control={control}
        rules={{
          required: { value: true, message: "Apellido obligatorio." },
          minLength: { value: 6, message: "El apellido debe tener al menos 6 caracteres." },
          maxLength: { value: 50, message: "El apellido no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type='text' className="customInput" placeholder='Apellido'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      
      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email obligatorio" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Formato de email invalido.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type="email" className="customInput" placeholder='email@ejemplo.com'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

<Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: { value: true, message: "Número de teléfono obligatorio" },
          pattern: {
            value: /^\d{10,15}$/,
            message: "El número de teléfono debe tener entre 10 y 15 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type="tel" className="customInput" placeholder='Teléfono'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
<Controller
        name="age"
        control={control}
        rules={{
          required: { value: true, message: "Edad obligatoria" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} type="number" className="customInput" placeholder='Edad'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "La contraseña es obligatoria." },
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres." },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            message: "Debe incluir mayúscula, minúscula, número y carácter especial.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="customInput w-full pr-10" // Agregamos padding derecho para el ícono
              placeholder="Contraseña"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: { value: true, message: "Debes confirmar tu contraseña." },
          validate: (value) => value === password || "Las contraseñas no coinciden.",
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative mt-4">
            <input
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              className="customInput w-full pr-10"
              placeholder="Confirmar Contraseña"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />


      <button type="submit" className="customButton mt-6">
        Registrarse
      </button>
    </form>
  );
}

export default OwnPetFormRegister;

