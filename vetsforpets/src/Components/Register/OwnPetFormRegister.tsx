"use client";

import React from 'react'
import { IUserFormData } from '@/interfaces/registerTypes';
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterUser } from '@/services/servicesUser';
import { toast } from 'sonner';

// import { toast } from "react-toastify";

function OwnPetFormRegister() {
  const router = useRouter()
  const user = localStorage.getItem("user")
  
  const { handleSubmit, control, watch } = useForm<IUserFormData>({
    defaultValues: {
      // {
      //   "name": "string",
      //   "lastName": "string",
      //   "age": 0,
      //   "email": "user@example.com",
      //   "password": "/qrczJr2j@2e0dk",
      //   "confirmPassword": "/ejH1hMhMht!tck",
      //   "phoneNumber": "stringstri",
      //   "imgProfile": "string"
      // }
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

  const onSubmit: SubmitHandler<IUserFormData> = async (data: IUserFormData) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    await RegisterUser(data)
    // toast.success(`Welcome ${data.name} to Vinktech, successfully registered`)
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
  useEffect(()=>{
    if(user){
      // toast.warning("Protected route")
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
  }, [])
  return (
    <form
      className="border-none rounded-lg  sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h1 className="text-3xl text-customBrown">Registro dueño de mascota</h1>
      <p className="mt-4 mb-3">¿Ya tienes cuenta? <Link href="/login" className=" text-customBrown hover:text-customHardBrown" > inicia sesión</Link></p>
      
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
          <div >
            <input {...field} type='text' className="customInput" placeholder='nombre'/>
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
          <div >
            <input {...field} type='text' className="customInput" placeholder='apellido'/>
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
            <input {...field} type="email" className="customInput" placeholder='email@example.co'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

<div className='flex gap-4 items-center justify-between'>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "Password is required." },
            minLength: { value: 8, message: "Password must have at least 8 characters." },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
              message:
                "Password must include uppercase, lowercase, number, and special character.",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="">
              <input {...field} type="password" className="customInput" placeholder='contraseña' />
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: { value: true, message: "Confirm Password is required." },
            validate: (value) =>
              value === password || "Passwords do not match.",
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="">
              <input {...field} type="password" className="customInput w-full" placeholder='repetir contraseña' />
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
      </div>


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
            <input {...field} type="tel" className="customInput" placeholder='30000000'/>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <button type="submit" className="customButton mt-6">
        Register
      </button>
    </form>
  );
}

export default OwnPetFormRegister;
