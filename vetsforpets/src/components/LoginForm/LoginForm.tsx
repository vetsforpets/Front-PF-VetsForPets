"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser, loginUserWithGoogle } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import Image from "next/image";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { setUserData, userData } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
    try {
      const data = await loginUser(userCredentials);

      if (data.user) {
        setUserData({
          token: data.token,
          id: data.user.id,
          isVet: data.user.isVet,
          email: data.user.email,
        });
        console.log(userData, data.token, data.user);
        reset();
        toast.success("Usuario logueado con éxito", {
          duration: 3000,
          style: {
            color: "#155724",
            background: "#d4edda",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #c3e6cb",
          },
        });

        router.push("/");
      } else {
        console.error("No se recibió un token válido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión, usuario o contraseña incorrecto", {
        duration: 3000,
        style: {
          color: "#dc3545",
          background: "#f8d7da",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #f5c6cb",
        },
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://vetsforpets-api.onrender.com/auth/google/signIn";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginUserWithGoogle(code).then((data) => {
        if (data && data.token) {
          setUserData({
            token: data.token,
            id: data.user.id,
            isVet: data.user.isVet,
            email: data.user.email,
          });

          toast.success("¡Inicio de sesión con Google exitoso!", {
            duration: 3000,
          });

          router.push("/");
        } else {
          toast.error("Error al iniciar sesión con Google");
        }
      });
    }
  }, [router, setUserData]);

  return (
    <div className="w-1/4 mx-auto mt-10 mb-20">
      <Image
        src="/images/logo.png"
        width={100}
        height={80}
        alt="logo"
        className="justify-self-center"
      />
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de email inválido",
              },
            })}
            type="email"
            className="customInput"
            placeholder="ejemplo@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative">
          <input
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="customInput"
          />
          {/* Icono de visibilidad */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="flex justify-evenly text-sm">
          <button type="submit" className="customButton">
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="customButton"
          >
            Iniciar con{" "}
            <Image
              src="/images/google-logo.png"
              width={80}
              height={80}
              alt="Google"
              className="pt-1"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
