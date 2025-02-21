"use client";

import React, { useState } from "react";
import { IVetFormData } from "@/interfaces/registerTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterVet } from "@/services/servicesVet";
import { toast } from "sonner";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import CloudinaryUploader from "../Cloudinary/Cloudinary";

function VetFormRegister() {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<IVetFormData>({
    defaultValues: {
      name: "",
      veterinarian: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      imgProfile: "",
      is24Hours: false,
      location: "anything",
      licenseNumber: "",
      foundation: "",
      businessHours: { open: "", close: "" },
      isVet: true,
    },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<IVetFormData> = async (data: IVetFormData) => {
    // if (data.businessHours === "is24Hours") {
    //   data.is24Hours = true
    // }

    // const { businessHours, ...submmitData } = data
    await RegisterVet(data);

    toast.success("Usuario registrado con éxito", {
      duration: 3000,
      style: {
        color: "#155724",
        background: "#d4edda",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #c3e6cb",
      },
    });
    router.push("/login");
  };

  return (
    <form
      className="z-10 px-12 pb-10 mx-auto my-20 border-none rounded-lg sm:w-1/2 sm:px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-customBrown">Registro veterinaria</h1>
      <p className="mt-4 mb-3">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className=" text-customBrown hover:text-customHardBrown"
        >
          {" "}
          inicia sesión{" "}
        </Link>
      </p>

      <Controller
        name="imgProfile"
        control={control}
        rules={{
          required: { value: true, message: "Imagen de perfil obligatoria" },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex items-center justify-center gap-4 mb-5">
            <label className="flex items-center justify-between">
              <p className="mr-4 whitespace-nowrap">Imagen de perfil </p>
              <CloudinaryUploader
                onImageUpload={(url) => field.onChange(url)}
              />
            </label>
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: "Nombre obligatorio." },
          minLength: {
            value: 5,
            message: "El nombre debe tener al menos 5 caracteres.",
          },
          maxLength: {
            value: 50,
            message: "El nombre no puede superar los 50 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              placeholder="Nombre Veterinaria"
              className="customInput"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="veterinarian"
        control={control}
        rules={{
          required: { value: true, message: "Nombre obligatorio." },
          minLength: {
            value: 5,
            message: "El nombre debe tener al menos 5 caracteres.",
          },
          maxLength: {
            value: 50,
            message: "El nombre no puede superar los 50 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              className="customInput"
              placeholder="Nombre Veterinario a cargo"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="licenseNumber"
        control={control}
        rules={{
          required: { value: true, message: "Licencia obligatorio." },
          minLength: {
            value: 8,
            message: "La Licencia debe tener al menos 8 caracteres.",
          },
          maxLength: {
            value: 50,
            message: "La Licencia debe no puede superar los 50 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <input
              {...field}
              type="number"
              className="customInput"
              placeholder="# Licencia del veterinario a cargo"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name="foundation"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Año de creacion de la veterinaria",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            <input
              {...field}
              type="string"
              className="customInput"
              placeholder="Año de creación (YYYY):"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
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
            <input
              {...field}
              type="email"
              className="customInput"
              placeholder="email"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: { value: true, message: "Numero de telefono obligatorio." },
          minLength: {
            value: 10,
            message: "El numero debe tener al menos 10 caracteres.",
          },
          maxLength: {
            value: 15,
            message: "El numero debe no puede superar los 15 caracteres.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="tel"
              className="customInput"
              placeholder="Teléfono"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "La contraseña es obligatoria." },
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres." },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            message:
              "Debe incluir mayúscula, minúscula, número y carácter especial.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="w-full pr-10 customInput"
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: { value: true, message: "Debes confirmar tu contraseña." },
          validate: (value) => {
            const passwordValue = watch("password");
            return value === passwordValue || "Las contraseñas no coinciden.";
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <input
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pr-10 customInput"
              placeholder="Confirmar Contraseña"
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </span>
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />

      <button type="submit" className="mt-6 customButton">
        Registrarse
      </button>
    </form>
  );
}

export default VetFormRegister;
