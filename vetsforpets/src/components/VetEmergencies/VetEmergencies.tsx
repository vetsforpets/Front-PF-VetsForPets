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
        profileImg: "/images/Dog.svg",
        isSterilized: true,
        birthdate: "12/05/1999",
        notes: "aca van las notas",
      },
    },
    {
      userName: "Ana Lopez",
      pet: {
        id: "1b3",
        name: "Max",
        age: 3,
        animalType: "Gato",
        breed: "Labrador",
        sex: "Female",
        profileImg: "/images/Cat.svg",
        isSterilized: true,
        birthdate: "12/05/1999",
        notes: "aca van las notas",
      },
    },
  ]);
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchVetData = async () => {
      if (userData?.id && userData?.token) {
        try {
          const vetData = await getVetById(userData.id, userData.token);

          if (vetData && vetData.emergencies.length > 0) {
            const usersPromises = vetData.emergencies.map(
              async (emergency: IEmergency) => {
                const petOwnerData = await fetchUserData(
                  emergency.userId,
                  userData.token
                );

                const petData =
                  petOwnerData.pets.find(
                    (pet) => pet.name === emergency.petName
                  ) || null;

                return {
                  userName: petOwnerData.name,
                  pet: petData,
                };
              }
            );

            const resolvedEmergencies = await Promise.all(usersPromises);
            setEmergencyDetails(resolvedEmergencies);
          }
        } catch (error) {
          console.error(
            "Error al obtener la veterinaria o los usuarios",
            error
          );
        }
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
            className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold">{emergency.userName}</h2>

            {emergency.pet ? (
              <div className="text-gray-600">
                <p>Mascota: {emergency.pet.name}</p>
              </div>
            ) : (
              <p className="text-red-500">Mascota no encontrada</p>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No hay emergencias registradas.</div>
      )}
    </div>
  );
}
