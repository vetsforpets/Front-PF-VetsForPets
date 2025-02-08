"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { loginUser } from "@/services/services";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
    // const data = await loginUser(userCredentials);
    // setUserData({ ...data.user, token: data.token });
    reset();
    router.push("/users/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de email inválido",
              },
            })}
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="ejemplo@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-gray-700">Contraseña</label>
          <input
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            type="password"
            placeholder="••••••"
            className="customInput"
          ></input>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de envío */}

        <button type="button" className="customButton">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
