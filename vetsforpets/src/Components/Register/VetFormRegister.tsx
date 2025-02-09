"use client";

import React from 'react'
// import { IFormInputsRegister } from "@/interfaces/types";
import { IUserFormData, IVetFormData } from '@/interfaces/registerTypes';
// import { registerUserfetch } from "@/services/userServices";
// import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterUser, RegisterVet } from '@/services/services';

// import { toast } from "react-toastify";

function VetFormRegister() {
  const router = useRouter()
  const user = localStorage.getItem("user")
  
  const { handleSubmit, control, watch } = useForm<IVetFormData>({
    defaultValues: {
      name: "",
    createdAt: "",
    email: "",
    is24Hours: "",
    phoneNumber: "",
    imgProfile: "",
    isVet: true
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<IVetFormData> = async (data: IVetFormData) => {
    await RegisterVet(data)
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

      <h1 className="text-3xl text-customBrown">Registro veterinaria</h1>
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
            <label className='mt-1' >Nombre veterinaria</label>
            <input {...field} type='text' className="customInput"/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="createdAt"
        control={control}
        rules={{
          required: { value: true, message: "Fecha de creación requerida" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div > 
            <label className='mt-1'>
            Fecha de creación
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
          required: { value: true, message: "Email obligatorio" },
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
        name="is24Hours"
        control={control}
        rules={{
          required: { value: true, message: "Campo requerido" },
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

export default VetFormRegister;
