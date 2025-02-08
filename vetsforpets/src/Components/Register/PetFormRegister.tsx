"use client";

import React from 'react'
// import { IFormInputsRegister } from "@/interfaces/types";
// import { registerUserfetch } from "@/services/userServices";
// import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { toast } from "react-toastify";

function PetFormRegister() {
  const router = useRouter()
  const user = localStorage.getItem("user")
  
  const { handleSubmit, control, watch } = useForm<IFormInputsRegister>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
    mode: "onChange"
  });
  const password = watch("password");

  const onSubmit: SubmitHandler<IFormInputsRegister> = async (data: IFormInputsRegister) => {
    const { confirmPassword, ...submitData } = data;  
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
      className="border-none rounded-lg w-80 mx-auto my-20 pb-10 pt-7 px-12 sm:px-5 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h1 className="text-3xl text-neutral-300">Register</h1>
      <p className="mt-3">Already have an account? <Link href="/sign-in" className=" text-purple-400 hover:text-purple-300" > Log in</Link></p>
      
      <Controller
        name="name"
        control={control}
        rules={{
          required: { value: true, message: "Name is required." },
          minLength: { value: 5, message: "Name must have at least 5 characters." },
          maxLength: { value: 50, message: "Name cannot exceed 50 characters." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="mt-3">
            {/* <Input {...field} isRequired label="Name" size="sm" /> */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email is required." },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address format.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="mt-3">
            {/* <Input {...field} isRequired type="email" label="Email" size="sm" /> */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

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
          <div className="mt-3">
            {/* <Input {...field} isRequired type="password" label="Password" size="sm" /> */}
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
          <div className="mt-3">
            {/* <Input {...field} isRequired type="password" label="Confirm Password" size="sm" /> */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="address"
        control={control}
        rules={{
          required: { value: true, message: "Address is required." },
          minLength: { value: 10, message: "Address must have at least 10 characters." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="mt-3">
            {/* <Input {...field} isRequired type="text" label="Address" size="sm" /> */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          required: { value: true, message: "Phone number is required." },
          pattern: {
            value: /^\d{10,15}$/,
            message: "Phone number must be between 10 and 15 digits.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="mt-3">
            {/* <Input {...field} isRequired type="tel" label="Phone" size="sm" /> */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />

      {/* <Button type="submit" className="mt-3 bg-purple-300 text-gray-800">
        Sign Up
      </Button> */}
    </form>
  );
}

export default SignUp;
