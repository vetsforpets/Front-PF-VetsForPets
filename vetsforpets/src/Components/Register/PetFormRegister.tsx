"use client";

import React from 'react'
// import { IFormInputsRegister } from "@/interfaces/types";
import { IUserFormData } from '@/interfaces/registerTypes';
// import { registerUserfetch } from "@/services/userServices";
// import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterUser } from '@/services/services';

// import { toast } from "react-toastify";

function PetFormRegister() {
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
    isVet: false,
    },
    mode: "onChange"
  });
  const password = watch("password");

  const onSubmit: SubmitHandler<IUserFormData> = async (data: IUserFormData) => {
    const { confirmPassword, ...submitData } = data;  
    await RegisterUser(submitData)
    // await registerUserfetch(submitData)    
    // toast.success(`Welcome ${data.name} to Vinktech, successfully registered`)
    router.push("/sign-in")
  };
  useEffect(()=>{
    if(user){
      // toast.warning("Protected route")
      redirect("/products")
    }
  }, [])
  return (
    <form
      className="border-none rounded-lg  sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h1 className="text-3xl text-customBrown">Registro dueño de mascota</h1>
      <p className="mt-4 mb-3">Already have an account? <Link href="/login" className=" text-customBrown hover:text-customHardBrown" > Log in</Link></p>
      
      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: "Nombre obligatorio." },
          minLength: { value: 5, message: "El nombre debe tener al menos 5 caracteres." },
          maxLength: { value: 50, message: "El nombre no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div >
            <label className='mt-1' >Nombre</label>
            <input {...field} type='text' className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{
          required: { value: true, message: "Apellido obligatorio." },
          minLength: { value: 5, message: "El apellido debe tener al menos 5 caracteres." },
          maxLength: { value: 50, message: "El apellido no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div >
            <label className='mt-1'>
            Apellido
            </label>
            <input {...field} type='text' className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="age"
        control={control}
        rules={{
          required: { value: true, message: "Edad requerida" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Cumpleaños
            </label>
            <input {...field} type='date' className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email oliqgatorio" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Formato de email invalido.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Email
            </label>
            <input {...field} type="email" className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Contraseña obligatoria" },
          minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres." },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            message:
              "La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Contraseña
            </label>
            <input {...field} type="password" className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: { value: true, message: "Es necesario comfirmar la contraseña" },
          validate: (value) =>
            value === password || "La contraseña no coincide",
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Comfirmar contraseña
            </label>
            <input {...field}  type="password" className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />


      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: { value: true, message: "Numero de telefono obligatorio" },
          pattern: {
            value: /^\d{10,15}$/,
            message: "El numero de telefono debe tener entre 10y 15 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Celular
            </label>
            <input {...field} type="tel" className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
        <Controller
          name="imgProfile"
          control={control}
          rules={{
            required: { value: true, message: "Imagen de perfil obligatoria" },
          }}
          render={({ field, fieldState: { error } }) => (
            <div > 
              <label className='mt-1'>
              Imgen de perfil
              </label>
              <input {...field}  type="file" className="customInput"/>
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />

      <button type="submit" className="customButton mt-6">
        Sign Up
      </button>
    </form>
  );
}

export default PetFormRegister;
