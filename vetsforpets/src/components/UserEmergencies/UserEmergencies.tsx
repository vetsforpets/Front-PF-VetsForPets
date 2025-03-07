"use client";

import React, { useEffect, useState } from "react";
import { useEmergencyFlagStore, useUserStore } from "@/store";
import { fetchUserData } from "@/services/servicesUser";
import { getVetById } from "@/services/servicesVet"; // ✅ Importar servicio
import { IUserData } from "@/services/interfaces";
import { UserChat } from "../Chat/UserChat";

export function UserEmergencies() {
  const { userData } = useUserStore();
  const { emergencyFlag } = useEmergencyFlagStore();
  const [user, setUser] = useState<IUserData | null>(null);
  const [vetNames, setVetNames] = useState<{ [key: string]: string }>({}); // ✅ Estado para almacenar nombres de veterinarias

  useEffect(() => {
    if (userData?.id && userData.token) {
      const fetchUser = async () => {
        try {
          const userFetched = await fetchUserData(userData.id, userData.token);
          setUser(userFetched);

          // ✅ Obtener nombres de veterinarias
          if (userFetched.emergencies) {
            const vetNamesMap: { [key: string]: string } = {};
            await Promise.all(
              userFetched.emergencies.map(async (emergency) => {
                if (!vetNamesMap[emergency.vetId]) {
                  const vet = await getVetById(emergency.vetId, userData.token);
                  vetNamesMap[emergency.vetId] = vet
                    ? vet.name
                    : "Veterinaria desconocida";
                }
              })
            );
            setVetNames(vetNamesMap);
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };

      fetchUser();
    }
  }, [userData?.id, userData?.token, emergencyFlag]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Chats de Emergencia</h2>

      {user?.emergencies && user.emergencies.length > 0 ? (
        user.emergencies.map((emergency, index) => (
          <div key={index} className="p-4 border rounded-md shadow">
            <h3 className="font-semibold text-md">
              Chat con: {vetNames[emergency.vetId] || "Cargando..."}
            </h3>
            {emergency.pet && (
              <p className="text-sm text-gray-600">
                Mascota: {emergency.pet.name} ({emergency.pet.animalType})
              </p>
            )}

            {/* ✅ Renderizar un UserChat para cada emergencia */}
            <UserChat vetId={emergency.vetId} chatId={emergency.chatId} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay emergencias activas.</p>
      )}
    </div>
  );
}
