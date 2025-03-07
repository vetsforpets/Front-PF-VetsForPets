import React, { useEffect, useState } from "react";
import { useEmergencyFlagStore, useUserStore } from "@/store";
import {
  fetchUserData,
  // updateUser
} from "@/services/servicesUser";
import { getVetById, updatePetshop } from "@/services/servicesVet";
import { IVetCredentials } from "@/services/interfaces";
import { VetChat } from "../Chat/VetChat";
import { Pet } from "../pet/PetPreview";

export function VetEmergencies() {
  const { userData } = useUserStore();
  const { emergencyFlag, setEmergencyFlag } = useEmergencyFlagStore();
  const [vetData, setVetData] = useState<IVetCredentials | null>(null);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (userData?.id && userData.token) {
      const fetchVetData = async () => {
        try {
          const vetFetched = await getVetById(userData.id, userData.token);
          setVetData(vetFetched);

          if (vetFetched?.emergencies) {
            const userNamesMap: { [key: string]: string } = {};
            await Promise.all(
              vetFetched.emergencies.map(async (emergency) => {
                if (!userNamesMap[emergency.userId]) {
                  const user = await fetchUserData(
                    emergency.userId,
                    userData.token
                  );
                  userNamesMap[emergency.userId] = user
                    ? user.name
                    : "Usuario desconocido";
                }
              })
            );
            setUserNames(userNamesMap);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la veterinaria:", error);
        }
      };

      fetchVetData();
    }
  }, [userData?.id, userData?.token]);

  const handleDeleteEmergency = async (
    chatId: string
    // userId: string
  ) => {
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

      // ELIMINAR EMERGENCIA TAMBIEN PARA EL USUARIO
      // const user = await fetchUserData(userId, userData.token);
      // if (user) {
      //   const updatedUserData = {
      //     ...user,
      //     emergencies: user.emergencies.filter(
      //       (emergency) => emergency.chatId !== chatId
      //     ),
      //   };

      //   await updateUser(user.id, updatedUserData, userData.token);
      // }

      // Actualizar el estado local
      setVetData(updatedVetData);
      setEmergencyFlag(!emergencyFlag);
    } catch (error) {
      console.error("Error al eliminar la emergencia:", error);
    }
  };

  const calculateAge = (birthdate: string): string => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age === 1 ? "1 año" : `${age} años`;
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-customGreen  text-white w-10/12 mx-auto mt-5 rounded-lg">
      <h2 className="text-xl font-bold text-center">Emergencias</h2>

      {vetData?.emergencies && vetData.emergencies.length > 0 ? (
        vetData.emergencies.map((emergency, index) => (
          <div
            key={index}
            className="bg-customDarkGreen p-4 rounded-md shadow text-white "
          >
            <div className="flex justify-evenly">
              <h3 className="text-md font-semibold">
                {userNames[emergency.userId] || "Cargando..."}
              </h3>
              {emergency.pet && (
                <p className="text-sm">
                  Mascota: {emergency.pet.name} ({emergency.pet.animalType})
                </p>
              )}
            </div>
            <VetChat chatId={emergency.chatId} />

            <button
              onClick={() => setSelectedPet(emergency.pet)}
              className="mt-2 p-2 hover:bg-customHardBrown bg-customBrown text-white rounded-md"
            >
              Ver Detalles de la Mascota
            </button>

            <button
              onClick={() =>
                handleDeleteEmergency(
                  emergency.chatId
                  // emergency.userId
                )
              }
              className="mt-2 p-2 bg-rose-800 hover:bg-rose-600 text-white rounded-md ml-2"
            >
              Eliminar Emergencia
            </button>
          </div>
        ))
      ) : (
        <p className="text-white text-center">No hay emergencias activas.</p>
      )}

      {selectedPet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold">Detalles de la Mascota</h2>
            <p>
              <strong>Nombre:</strong> {selectedPet.name}
            </p>
            <p>
              <strong>Especie:</strong> {selectedPet.animalType}
            </p>
            <p>
              <strong>Raza:</strong> {selectedPet.breed}
            </p>
            <p>
              <strong>Edad:</strong> {calculateAge(selectedPet.birthdate)}
            </p>
            <p>
              <strong>Esterilizado:</strong>{" "}
              {selectedPet.isSterilized ? "Sí" : "No"}
            </p>

            <button
              onClick={() => setSelectedPet(null)}
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
