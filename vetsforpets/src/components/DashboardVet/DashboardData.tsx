"use client";

import React, { useState, useEffect } from "react";
import DashboardUI from "./DashboardUI";
import { IVetCredentials } from "@/services/interfaces";
import { getVetById } from "@/services/servicesVet";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

const DashboardData = () => {
  const [veterinaria, setVeterinaria] = useState<IVetCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userData = useUserStore((state) => state.userData);

  const router = useRouter();

  useEffect(() => {
    if (userData?.token && userData?.id) {
      const getVetData = async () => {
        try {
          const vet: IVetCredentials | null = await getVetById(
            userData.id,
            userData.token
          );

          if (vet) {
            setVeterinaria(vet);
          } else {
            setError("No se encontró la veterinaria asociada al usuario");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Ocurrió un error desconocido");
          }
        } finally {
          setLoading(false);
        }
      };

      getVetData();
    }
  }, [userData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userData?.id) {
        router.push("/not-found");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [userData?.id, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Cargando...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
        Error: {error}
      </div>
    );

  return veterinaria ? (
    <DashboardUI veterinaria={veterinaria} token={userData?.token || ""} />
  ) : (
    <div className="flex items-center justify-center min-h-screen text-xl">
      No hay datos disponibles
    </div>
  );
};

export default DashboardData;
