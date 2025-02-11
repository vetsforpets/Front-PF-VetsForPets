"use client";

import React from 'react'
import { IVetFormData } from '@/interfaces/registerTypes';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterVet } from '@/services/servicesVet';

// import { toast } from "react-toastify";

function VetFormRegister() {
  const router = useRouter()

  const { handleSubmit, control, watch } = useForm<IVetFormData>({
    defaultValues: {
      name: "",
      imgProfile: "",
      createdAtPetShop: "",
      veterinarian: "",
      license: "",
      password: "",
      confirmPassword: "",
      dayOpenings: "",
      email: "",
      is24Hours: false,
      phoneNumber: "",
      location: "anything"
    },
    mode: "onChange"
  });
  const password = watch("password");


  const onSubmit: SubmitHandler<IVetFormData> = async (data: IVetFormData) => {

    if(data.dayOpenings === "is24Hours") {
      data.is24Hours === true 
    } 
    const {veterinarian, license, dayOpenings, createdAtPetShop, ...submmitData } = data
    console.log("data ", submmitData);
    await RegisterVet(submmitData)
    // await registerUserfetch(submitData)    
    // toast.success(`Welcome ${data.name} to Vinktech, successfully registered`)
    router.push("/login")
  };

  useEffect(() => {

  }, [])

  return (
    <form
      className="border-none rounded-lg  sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h1 className="text-3xl text-customBrown">Registro veterinaria</h1>
      <p className="mt-4 mb-3">¿Ya tienes cuenta? <Link href="/login" className=" text-customBrown hover:text-customHardBrown" > inicia sesión </Link></p>

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
            {/* <label className='mt-1' >Nombre veterinaria</label> */}
            <input {...field} type='text' placeholder='Nombre veterinaria' className="customInput" />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="veterinarian"
        control={control}
        rules={{
          required: { value: true, message: "Nombre obligatorio." },
          minLength: { value: 5, message: "El nombre debe tener al menos 5 caracteres." },
          maxLength: { value: 50, message: "El nombre no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div >
            {/* <label className='mt-1' >Nombre veterinaria</label> */}
            <input {...field} type='text' className="customInput" placeholder='Nombre veterinario acargo' />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="license"
        control={control}
        rules={{
          required: { value: true, message: "Licencia obligatorio." },
          minLength: { value: 8, message: "la licencia debe tener al menos 8 caracteres." },
          maxLength: { value: 50, message: "la licencia debe no puede superar los 50 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div >
            {/* <label className='mt-1' >Nombre veterinaria</label> */}
            <input {...field} type='text' className="customInput" placeholder='# licensia veterinario acargo' />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: { value: true, message: "Numero de telefono obligatorio." },
          minLength: { value: 10, message: "El numero debe tener al menos 10 caracteres." },
          maxLength: { value: 15, message: "El numero debe no puede superar los 15 caracteres." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div >
            {/* <label className='mt-1' >Nombre veterinaria</label> */}
            <input {...field} type='tel' className="customInput" placeholder='300000000' />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="createdAtPetShop"
        control={control}
        rules={{
          required: { value: true, message: "Fecha de creación requerida" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className='flex gap-4 items-center justify-center'>
            <label className='mt-1 w-56 text-sm ml-2'>
              Fecha creación
            </label>
            <input {...field} type='date' className="customInput" />
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
            {/* <label className='mt-1'>
              Email
            </label> */}
            <input {...field} type="email" className="customInput" placeholder='email' />
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
        name="dayOpenings"
        control={control}
        rules={{
          required: { value: true, message: "Campo obligatorio" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>

            <div className=" gap-10text-sm flex gap-20 items-center justify-center focus:ring-0 text-customDarkGreen border border-gray-300 rounded-lg bg-gray-50 focus:border-customBrown dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-customBrown mt-2 py-5">
              <div>

                <label className='text-sm'>
                  Horario de atención:
                </label>
              </div>
              <div>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="is24Hours"
                    checked={field.value === "is24Hours"}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  <span>24 horas</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="7 a 15"
                    checked={field.value === "7 a 15"}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  <span>de 7:00 a 15:00 </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="8 a 16"
                    checked={field.value === "8 a 16"}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  <span>de 8:00 a 16:00 </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="9 a 17"
                    checked={field.value === "9 a 17"}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  <span>de 9:00 a 17:00 </span>
                </label>
              </div>
            </div>
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

export default VetFormRegister;
