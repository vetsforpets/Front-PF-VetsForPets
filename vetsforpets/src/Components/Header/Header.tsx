"use client";

import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleNavigation = (path: string): void => {
    router.push(path);
  };

  return (
    <div className="flex justify-evenly items-center m-7 p-2 rounded-full font-tenor shadowFull">
      <div className="flex-col">
        <img src="/images/logo.png" className="w-20" alt="Logo" />
      </div>
      <div>
        <button
          onClick={() => handleNavigation("/vets")}
          className="customButton"
        >
          Veterinarias
        </button>
      </div>
      <div>
        <button
          onClick={() => handleNavigation("/register")}
          className="flex flex-col items-center"
        >
          <img
            src="/images/emergency.png"
            className="w-10 bg-yellow-200 rounded-full"
            alt="sirena"
          />
          <p className="font-kiwi">URGENCIA</p>
        </button>
      </div>

      <div className="flex gap-5">
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="customButton"
        >
          Perfil Usuario
        </button>
        <button
          onClick={() => handleNavigation("/dashboard-vet")}
          className="customButton"
        >
          Perfil Veterinaria
        </button>
      </div>

      <div className="flex gap-5">
        <button
          onClick={() => handleNavigation("/login")}
          className="customButton"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => handleNavigation("/register")}
          className="customButton"
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}

// import Link from "next/link";

// export function Header() {
//   return (
//     <>
//       <div className="flex justify-evenly items-center m-7 p-2 rounded-full font-tenor shadowFull">
//         <div className="flex-col">
//           <img src="/images/logo.png" className="w-20" alt="Logo" />
//         </div>
//         <div>
//           <Link href={"/vets"} className="customButton">
//             Veterinarias
//           </Link>
//         </div>
//         <div>
//           <Link href={"/register"} className="flex flex-col items-center">
//             <img
//               src="/images/emergency.png"
//               className="w-10 bg-yellow-200 rounded-full"
//               alt="sirena"
//             />
//             <p className="font-kiwi">URGENCIA</p>
//           </Link>
//         </div>

//         <div className="flex gap-5">
//           <Link href={"/dashboard"} className="customButton">
//             Perfil Usuario
//           </Link>
//           <Link href={"/dashboard-vet"} className="customButton">
//             Perfil Veterinaria
//           </Link>
//         </div>

//         <div className="flex gap-5">
//           <Link href={"/login"} className="customButton">
//             Iniciar Sesión
//           </Link>
//           <Link href={"/register"} className="customButton">
//             Crear Cuenta
//           </Link>
//         </div>
      
       
//       </div>
//     </>
//   );
// }
