"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import Image from "next/image";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isvet, setIsVet] = useState(false);

  const { userData } = useUserStore();
  const isAuthenticated = userData?.id;

  const pathname = usePathname();
  const headerClass = pathname === "/" ? "absolute" : "relative";

  const handleNavigation = (path: string): void => {
    router.push(path);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("====================================");
    console.log(userData?.isVet);
    console.log("====================================");
    if (userData) {
      setIsVet(userData.isVet);
    }
  }, [userData?.isVet]);

  return (
    <div
      className={`flex justify-between items-center m-7 p-4 rounded-full font-tenor shadowFull bg-[#FFFAD7] w-11/12 self-center ${headerClass}`}
    >
      <div className="flex items-center">
        <button
          onClick={() => handleNavigation("/")}
          className="flex flex-col items-center"
        >
          <Image
            src="/images/logo.png"
            width={1920}
            height={500}
            className="w-20"
            alt="Logo"
          />
        </button>
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
            width={1920}
            height={500}
            className="w-10 bg-yellow-200 rounded-full"
            alt="sirena"
          />
          <p className="font-kiwi">URGENCIA</p>
        </button>
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => handleNavigation("/aboutUs")}
          className="customButton"
        >
          Quienes Somos
        </button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="p-2 z-10">
        <div className="w-6 h-6 flex flex-col justify-between items-center space-y-1 hover:scale-105 transform transition-all duration-300">
          <div
            className={`bg-black w-full h-1 transform transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`bg-black w-full h-1 transform transition-transform duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`bg-black w-full h-1 transform transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-[60px] right-1 bg-[#FFFAD7] shadow-lg rounded-lg pt-9 p-4 flex flex-col items-center gap-5 w-[240px] flex-grow">
          {isAuthenticated ? (
            <>
              {!isvet ? (
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="customButtonDos"
                >
                  Perfil Usuario
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation("/dashboard-vet")}
                  className="customButtonDos"
                >
                  Perfil Veterinaria
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="customButtonDos"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="customButtonDos"
              >
                Crear Cuenta
              </button>
            </>
          )}

          <LogoutButton />
        </div>
      )}
    </div>
  );
}
