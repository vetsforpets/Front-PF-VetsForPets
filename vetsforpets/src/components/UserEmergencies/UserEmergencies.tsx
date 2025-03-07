"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { IEmergency } from "@/services/interfaces";
import { getVetById } from "@/services/servicesVet";
import { fetchUserData } from "@/services/servicesUser";
import { Pet } from "../pet/PetPreview";

interface EmergencyData {
  userName: string;
  pet: Pet | null;
}

export function VetEmergencies() {
  const [emergencyDetails, setEmergencyDetails] = useState<EmergencyData[]>([
    {
      userName: "Juan Pérez",
      pet: {
        id: "1a3",
        name: "Max",
        age: 3,
        animalType: "Perro",
        breed: "Labrador",
        sex: "Male",
        profileImg: "/Dog.svg",
        isSterilized: true,
        birthdate: "12/05/1999",
        notes: "aca van las notas",
      },
    },
    {
      userName: "Ana Lopez",
      pet: {
        id: "1b3",
        name: "Luna",
        age: 2,
        animalType: "Gato",
        breed: "Siamés",
        sex: "Female",
        profileImg: "/Cat.svg",
        isSterilized: false,
        birthdate: "05/08/2020",
        notes: "Le encanta dormir al sol.",
      },
    },
  ]);
  const { userData } = useUserStore();

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const openModal = (pet: Pet) => setSelectedPet(pet);
  const closeModal = () => setSelectedPet(null);

  useEffect(() => {
    const fetchVetData = async () => {
      if (!userData?.id || !userData?.token) {
        console.error("❌ ID o Token no disponibles");
        return;
      }

      try {
        const vetData = await getVetById(userData.id, userData.token);
        console.log("aca vetData!", vetData);

        // 🔹 Validar que `vetData` existe antes de usar `emergencies`
        if (!vetData) {
          console.error("⚠️ La veterinaria no fue encontrada.");
          return;
        }

        if (!Array.isArray(vetData.emergencies)) {
          console.error(
            "⚠️ `emergencies` no es un array o está undefined:",
            vetData
          );
          return;
        }

        // 🔹 Si hay emergencias, proceder con la consulta de usuarios
        if (vetData.emergencies.length > 0) {
          const usersPromises = vetData.emergencies.map(
            async (emergency: IEmergency) => {
              try {
                const petOwnerData = await fetchUserData(
                  emergency.userId,
                  userData.token
                );

                if (!petOwnerData || !Array.isArray(petOwnerData.pets)) {
                  console.error(
                    `No se encontraron mascotas para el usuario ${emergency.userId}`
                  );
                  return {
                    userName: petOwnerData?.name || "Desconocido",
                    pet: null,
                  };
                }

                const petData =
                  petOwnerData.pets.find(
                    (pet) => pet.id === emergency.pet.id
                  ) || null;

                return {
                  userName: petOwnerData.name,
                  pet: petData,
                };
              } catch (error) {
                console.error(
                  `Error obteniendo datos del usuario ${emergency.userId}`,
                  error
                );
                return { userName: "Error al obtener usuario", pet: null };
              }
            }
          );

          const resolvedEmergencies = await Promise.all(usersPromises);
          setEmergencyDetails(
            resolvedEmergencies.filter((e) => e !== undefined)
          );
        }
      } catch (error) {
        console.error(
          "❌ Error al obtener la veterinaria o los usuarios:",
          error
        );
      }
    };

    fetchVetData();
  }, [userData?.id, userData?.token]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      {emergencyDetails.length > 0 ? (
        emergencyDetails.map((emergency, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold">{emergency.userName}</h2>

            {emergency.pet ? (
              <div className="text-center text-gray-600">
                <p>Mascota: {emergency.pet.name}</p>
                <button
                  onClick={() => openModal(emergency.pet!)}
                  className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                >
                  Ver detalles
                </button>
              </div>
            ) : (
              <p className="text-red-500">Mascota no encontrada</p>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No hay emergencias registradas.</div>
      )}

      {/* Modal */}
      {selectedPet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-2 text-xl font-bold">{selectedPet.name}</h2>
            <img
              src={selectedPet.profileImg}
              alt={selectedPet.name}
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <p>
              <strong>Especie:</strong> {selectedPet.animalType}
            </p>
            <p>
              <strong>Raza:</strong> {selectedPet.breed}
            </p>
            <p>
              <strong>Sexo:</strong> {selectedPet.sex}
            </p>
            <p>
              <strong>Edad:</strong> {selectedPet.age} años
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong> {selectedPet.birthdate}
            </p>
            <p>
              <strong>Esterilizado:</strong>{" "}
              {selectedPet.isSterilized ? "Sí" : "No"}
            </p>
            <p>
              <strong>Notas:</strong> {selectedPet.notes}
            </p>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
