"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <div className="w-2/3 mx-auto mb-20 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-28">
      <Image
        src="/images/logo.png"
        width={100}
        height={80}
        alt="logo"
        className="mx-auto"
      />
      <h2 className="mb-4 text-xl font-bold text-center sm:text-2xl md:text-3xl">
        Iniciar Sesión
      </h2>

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
            className="w-2/3 text-sm customInput sm:text-base"
            placeholder="ejemplo@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
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
            className="w-2/3 text-sm customInput sm:text-base"
          />
          {/* Icono de visibilidad */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute transform -translate-y-1/2 right-3 top-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="flex text-sm sm:text-base justify-evenly">
          <button type="submit" className="w-1/3 text-sm customButton sm:text-base">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}


// "use client";

// import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { loginUser } from "@/services/servicesUser";
// import { useUserStore } from "@/store";
// // import { CredentialResponse } from "@react-oauth/google";
// // import { GoogleLogin } from "@react-oauth/google";
// import { toast } from "sonner";
// import Image from "next/image";

// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// interface LoginFormInputs {
//   email: string;
//   password: string;
// }

// export default function LoginForm() {
//   const { setUserData, userData } = useUserStore();
//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<LoginFormInputs>();
//   const router = useRouter();

//   // const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
//   //   console.log("Token de Google:", credentialResponse.credential);
//   //   toast.success("Usuario logueado con éxito", {
//   //     duration: 3000,
//   //     style: {
//   //       color: "#155724",
//   //       background: "#d4edda",
//   //       borderRadius: "8px",
//   //       padding: "16px",
//   //       border: "1px solid #c3e6cb",
//   //     },
//   //   });
//   //   router.push("/");
//   // };

//   // const handleGoogleError = () => {
//   //   console.error("Error al iniciar sesión con Google");
//   // };

//   const onSubmit: SubmitHandler<LoginFormInputs> = async (userCredentials) => {
//     try {
//       const data = await loginUser(userCredentials);

//       if (data.user) {
//         setUserData({
//           token: data.token,
//           id: data.user.id,
//           isVet: data.user.isVet,
//           email: data.user.email,
//         });
//         console.log(userData, data.token, data.user);
//         reset();
//         toast.success("Usuario logueado con éxito", {
//           duration: 3000,
//           style: {
//             color: "#155724",
//             background: "#d4edda",
//             borderRadius: "8px",
//             padding: "16px",
//             border: "1px solid #c3e6cb",
//           },
//         });

//         router.push("/");
//       } else {
//         console.error("No se recibió un token válido");
//       }
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       toast.error("Error al iniciar sesión, usuario o contraseña incorrecto", {
//         duration: 3000,
//         style: {
//           color: "#dc3545",
//           background: "#f8d7da",
//           borderRadius: "8px",
//           padding: "16px",
//           border: "1px solid #f5c6cb",
//         },
//       });
//     }
//   };

//   return (
//     <div className="w-1/4 mx-auto mb-20 mt-28">
//       <Image
//         src="/images/logo.png"
//         width={100}
//         height={80}
//         alt="logo"
//         className="justify-self-center"
//       />
//       <h2 className="mb-4 text-2xl font-bold text-center">Iniciar Sesión</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Email */}
//         <div>
//           <input
//             {...register("email", {
//               required: "El email es obligatorio",
//               pattern: {
//                 value: /\S+@\S+\.\S+/,
//                 message: "Formato de email inválido",
//               },
//             })}
//             type="email"
//             className="customInput"
//             placeholder="ejemplo@email.com"
//           />
//           {errors.email && (
//             <p className="text-sm text-red-500">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Contraseña */}
//         <div className="relative">
//           <input
//             {...register("password", {
//               required: "La contraseña es obligatoria",
//               minLength: {
//                 value: 6,
//                 message: "Debe tener al menos 6 caracteres",
//               },
//             })}
//             type={showPassword ? "text" : "password"}
//             placeholder="Contraseña"
//             className="customInput"
//           />
//           {/* Icono de visibilidad */}
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute transform -translate-y-1/2 right-3 top-1/2"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//           {errors.password && (
//             <p className="text-sm text-red-500">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Botón de envío */}
//         <div className="flex text-sm justify-evenly">
//           {/* <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//           /> */}
//           <button type="submit" className="customButton">
//             Iniciar Sesión
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
