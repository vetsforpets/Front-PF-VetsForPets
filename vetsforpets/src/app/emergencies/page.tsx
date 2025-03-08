"use client";
import dynamic from "next/dynamic";
import { VetEmergencies } from "@/components/VetEmergencies/VetEmergencies";
import { useUserStore } from "@/store";
import React from "react";
import { UserEmergencies } from "@/components/UserEmergencies/UserEmergencies";
import Link from "next/link";

// Importación dinámica para deshabilitar SSR en el componente del mapa
const MapComponent = dynamic(() => import("../../components/Maps/Maps"), {
  ssr: false,
});

export default function Emergencies() {
  const { userData } = useUserStore();

  return (
    <>
      {!userData ? (
        <div className="flex gap-3 flex-col items-center text-center mx-auto w-1/3 p-10 rounded-full mt-10 bg-customHardBrown text-white">
          Debes estar Logeado para solicitar una emergencia
          <Link
            href="/login"
            className=" bg-customBrown hover:bg-customHardBeige cursor-pointer text-black mt-3 text-lg sm:text-xl w-fit py-2 px-10 rounded-full"
          >
            Iniciar sesión
          </Link>
        </div>
      ) : userData?.role === "PETSHOP" ? (
        <VetEmergencies />
      ) : (
        <div>
          <MapComponent />
          <UserEmergencies />
        </div>
      )}
    </>
  );
}
