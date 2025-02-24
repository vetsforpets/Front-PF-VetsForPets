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
        console.log("Buscando veterinaria con ID:", userData.id);
        try {
          const vet: IVetCredentials | null = await getVetById(
            userData.token,
            userData.id
          );

          console.log("Respuesta de getVetById", vet);
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return veterinaria ? (
    <DashboardUI veterinaria={veterinaria} token={userData?.token || ""} />
  ) : (
    <div>No hay datos disponibles</div>
  );
};

export default DashboardData;
