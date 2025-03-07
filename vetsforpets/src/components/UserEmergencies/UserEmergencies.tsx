"use client";

import React, { useEffect, useState } from "react";
import { useEmergencyFlagStore, useUserStore } from "@/store";
import { fetchUserData, updateUser } from "@/services/servicesUser";
import { getVetById, updatePetshop } from "@/services/servicesVet"; // ✅ Importar servicio
import { IUserData, IVetCredentials } from "@/services/interfaces";
import { UserChat } from "../Chat/UserChat";

export function UserEmergencies() {
  const { userData } = useUserStore();
  const { emergencyFlag, setEmergencyFlag } = useEmergencyFlagStore();
  const [user, setUser] = useState<IUserData | null>(null);
  const [vetNames, setVetNames] = useState<{ [key: string]: string }>({});
  const [vetData, setVetData] = useState<IVetCredentials | null>(); // ✅ Estado para almacenar nombres de veterinarias

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
                  setVetData(vet);
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

  const handleDeleteEmergency = async (chatId: string) => {
    if (!vetData || !userData?.token) return;

    try {
      // Filtrar emergencias eliminando la que corresponde al chatId
      const updatedEmergencies = vetData.emergencies.filter(
        (emergency) => emergency.chatId !== chatId
      );

      // Obtener la información actualizada de la veterinaria y actualizarla completa
      const updatedVetData = {
        ...vetData,
        licenseNumber: 12345,

        emergencies: updatedEmergencies,
      };

      await updatePetshop(vetData.id, updatedVetData, userData.token);

      if (user) {
        const updatedUserData = {
          ...user,
          emergencies: user.emergencies.filter(
            (emergency) => emergency.chatId !== chatId
          ),
        };

        await updateUser(user.id, updatedUserData, userData.token);
        setUser(updatedUserData);
      }

      // Actualizar el estado local
      setVetData(updatedVetData);
      setEmergencyFlag(!emergencyFlag);
    } catch (error) {
      console.error("Error al eliminar la emergencia:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-customGreen  text-white w-10/12 mx-auto mt-5 rounded-lg">
      <h2 className="text-xl font-bold text-center">Emergencias</h2>

      {user?.emergencies && user.emergencies.length > 0 ? (
        user.emergencies.map((emergency, index) => (

          <div
            key={index}
            className=" bg-customDarkGreen p-4 rounded-md shadow text-white "
          >
            <div className="flex justify-evenly">
              <h3 className="text-md font-semibold text-xl">
                {vetNames[emergency.vetId] || "Cargando..."}
              </h3>
              {emergency.pet && (
                <p className="text-sm">
                  Mascota: {emergency.pet.name} ({emergency.pet.animalType})
                </p>
              )}
              <button
                onClick={() => handleDeleteEmergency(emergency.chatId)}
                className="mt-2 p-2 bg-rose-800 hover:bg-rose-600 text-white rounded-md ml-2"
              >
                Eliminar Emergencia
              </button>
            </div>


            {/* ✅ Renderizar un UserChat para cada emergencia */}
            <UserChat vetId={emergency.vetId} chatId={emergency.chatId} />
          </div>
        ))
      ) : (
        <p className="text-white text-center">No hay emergencias activas.</p>
      )}
    </div>
  );
}
