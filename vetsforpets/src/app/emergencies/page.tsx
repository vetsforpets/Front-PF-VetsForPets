"use client";
import dynamic from "next/dynamic";
import { VetEmergencies } from "@/components/VetEmergencies/VetEmergencies";
import { useUserStore } from "@/store";
import React from "react";
import { UserEmergencies } from "@/components/UserEmergencies/UserEmergencies";

// Importación dinámica para deshabilitar SSR en el componente del mapa
const MapComponent = dynamic(() => import("../../components/Maps/Maps"), {
  ssr: false,
});

export default function Emergencies() {
  const { userData } = useUserStore();

  return (
    <>
      {userData?.role === "PETSHOP" ? (
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
