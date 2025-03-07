"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import Image from "next/image";
import { LogoutButton } from "../LogoutButton/LogoutButton";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useUserStore();
  const isAuthenticated = userData?.id;

  const pathname = usePathname();
  const headerClass = pathname === "/" ? "absolute" : "relative";

  const handleNavigation = (path: string): void => {
    router.push(path);
    setIsOpen(false);
  };

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
          onClick={() => handleNavigation("/veterinary")}
          className="hidden sm:block customButton"
        >
          Veterinarias
        </button>

        {isOpen && (
          <div className="absolute z-50 top-[60px] right-1 bg-[#FFFAD7] shadow-lg rounded-lg pt-9 p-4 flex flex-col items-center gap-4 w-[240px] sm:hidden">
            <button
              onClick={() => handleNavigation("/veterinary")}
              className="customButton"
            >
              Veterinarias
            </button>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => handleNavigation("/emergencies")}
          className="flex flex-col items-center"
        >
          <Image
            src="/images/emergency.png"
            width={1920}
            height={500}
            className="w-10 bg-yellow-200 rounded-full"
            alt="sirena"
          />
          <p className="font-kiwi">URGENCIA</p>
        </button>
      </div>
      <div className="flex gap-5 sm:block">
        <button
          onClick={() => handleNavigation("/aboutUs")}
          className="hidden customButton sm:block"
        >
          Quienes Somos
        </button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="z-10 p-2">
        <div className="flex flex-col items-center justify-between w-6 h-6 space-y-1 transition-all duration-300 transform hover:scale-105">
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
        <div className="absolute z-50 top-[60px] right-1 bg-[#FFFAD7] shadow-lg rounded-lg pt-9 p-4 flex flex-col items-center gap-4 w-[240px] flex-grow">
          {isAuthenticated ? (
            <>
              {userData.role === "PETSHOP" ? (
                <button
                  onClick={() => handleNavigation("/dashboard-vet")}
                  className="w-full customButton"
                >
                  Perfil Veterinaria
                </button>
              ) : (
                <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="w-full customButton"
                  >
                  Perfil Usuario
                </button>
                <button
                  onClick={() => handleNavigation("/membership-card")}
                  className="w-full customButton"
                >
                  Membresia
                </button>
                  </>
              )}

              <button
                onClick={() => handleNavigation("/veterinary")}
                className="w-full mt-2 mb-2 customButton sm:hidden"
              >
                Veterinarias
              </button>

              <button
                onClick={() => handleNavigation("/aboutUs")}
                className="w-full mt-2 mb-2 customButton sm:hidden"
              >
                Quienes Somos
              </button>

              <LogoutButton />
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="w-full customButton"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="w-full customButton"
              >
                Crear Cuenta
              </button>

              <button
                onClick={() => handleNavigation("/veterinary")}
                className="w-full mt-0 mb-2 customButton sm:hidden"
              >
                Veterinarias
              </button>

              <button
                onClick={() => handleNavigation("/aboutUs")}
                className="w-full mt-2 mb-2 customButton sm:hidden"
              >
                Quienes Somos
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
