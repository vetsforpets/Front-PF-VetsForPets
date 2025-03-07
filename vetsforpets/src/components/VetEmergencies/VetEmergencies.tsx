// "use client";

// import React, { useEffect, useState } from "react";
// import { useUserStore } from "@/store";
// import { IEmergency } from "@/services/interfaces";
// import { getVetById } from "@/services/servicesVet";
// import { fetchUserData } from "@/services/servicesUser";
// import { Pet } from "../pet/PetPreview";

// interface EmergencyData {
//   userId: string;
//   chatId: string;
//   pet: Pet | null;
// }

// export function VetEmergencies() {
//   const [emergencyDetails, setEmergencyDetails] = useState<EmergencyData[]>([]);
//   const { userData } = useUserStore();

//   const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

//   const openModal = (pet: Pet) => setSelectedPet(pet);
//   const closeModal = () => setSelectedPet(null);

//   useEffect(() => {
//     const fetchVetData = async () => {
//       if (!userData?.id || !userData?.token) {
//         console.error("❌ ID o Token no disponibles");
//         return;
//       }

//       try {
//         const vetData = await getVetById(userData.id, userData.token);
//         console.log("aca vetData!", vetData);

//         // 🔹 Validar que `vetData` existe antes de usar `emergencies`
//         if (!vetData) {
//           console.error("⚠️ La veterinaria no fue encontrada.");
//           return;
//         }

//         if (!Array.isArray(vetData.emergencies)) {
//           console.error(
//             "⚠️ `emergencies` no es un array o está undefined:",
//             vetData
//           );
//           return;
//         }

//         // 🔹 Si hay emergencias, proceder con la consulta de usuarios
//         if (vetData.emergencies.length > 0) {
//           const usersPromises = vetData.emergencies.map(
//             async (emergency: IEmergency) => {
//               try {
//                 const petOwnerData = await fetchUserData(
//                   emergency.userId,
//                   userData.token
//                 );

//                 if (!petOwnerData || !Array.isArray(petOwnerData.pets)) {
//                   console.error(
//                     `No se encontraron mascotas para el usuario ${emergency.userId}`
//                   );
//                   return {
//                     userName: petOwnerData?.name || "Desconocido",
//                     pet: null,
//                   };
//                 }

//                 const petData =
//                   petOwnerData.pets.find(
//                     (pet) => pet.id === emergency.pet.id
//                   ) || null;

//                 return {
//                   userName: petOwnerData.name,
//                   pet: petData,
//                 };
//               } catch (error) {
//                 console.error(
//                   `Error obteniendo datos del usuario ${emergency.userId}`,
//                   error
//                 );
//                 return { userName: "Error al obtener usuario", pet: null };
//               }
//             }
//           );

//           const resolvedEmergencies = await Promise.all(usersPromises);
//           setEmergencyDetails(
//             resolvedEmergencies.filter((e) => e !== undefined)
//           );
//         }
//       } catch (error) {
//         console.error(
//           "❌ Error al obtener la veterinaria o los usuarios:",
//           error
//         );
//       }
//     };

//     fetchVetData();
//   }, [userData?.id, userData?.token]);

//   return (
//     <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
//       {emergencyDetails.length > 0 ? (
//         emergencyDetails.map((emergency, index) => (
//           <div
//             key={index}
//             className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
//           >
//             <h2 className="text-lg font-semibold">{emergency.userName}</h2>

//             {emergency.pet ? (
//               <div className="text-gray-600 text-center">
//                 <p>Mascota: {emergency.pet.name}</p>
//                 <button
//                   onClick={() => openModal(emergency.pet!)}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Ver detalles
//                 </button>
//               </div>
//             ) : (
//               <p className="text-red-500">Mascota no encontrada</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="text-gray-500">No hay emergencias registradas.</div>
//       )}

//       {/* Modal */}
//       {selectedPet && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-2">{selectedPet.name}</h2>
//             <img
//               src={selectedPet.profileImg}
//               alt={selectedPet.name}
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />
//             <p>
//               <strong>Especie:</strong> {selectedPet.animalType}
//             </p>
//             <p>
//               <strong>Raza:</strong> {selectedPet.breed}
//             </p>
//             <p>
//               <strong>Sexo:</strong> {selectedPet.sex}
//             </p>
//             <p>
//               <strong>Edad:</strong> {selectedPet.age} años
//             </p>
//             <p>
//               <strong>Fecha de nacimiento:</strong> {selectedPet.birthdate}
//             </p>
//             <p>
//               <strong>Esterilizado:</strong>{" "}
//               {selectedPet.isSterilized ? "Sí" : "No"}
//             </p>
//             <p>
//               <strong>Notas:</strong> {selectedPet.notes}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 w-full"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { fetchUserData } from "@/services/servicesUser";
import { getVetById } from "@/services/servicesVet";
import { IVetCredentials } from "@/services/interfaces";
import { VetChat } from "../Chat/VetChat";
import { Pet } from "../pet/PetPreview";

export function VetEmergencies() {
  const { userData } = useUserStore();
  const [vetData, setVetData] = useState<IVetCredentials | null>(null);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // Estado para el modal

  useEffect(() => {
    if (userData?.id && userData.token) {
      const fetchVetData = async () => {
        try {
          const vetFetched = await getVetById(userData.id, userData.token);
          setVetData(vetFetched);

          // Obtener nombres de los usuarios que pidieron emergencias
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

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Chats de Emergencia</h2>

      {vetData?.emergencies && vetData.emergencies.length > 0 ? (
        vetData.emergencies.map((emergency, index) => (
          <div key={index} className="p-4 border rounded-md shadow">
            <h3 className="text-md font-semibold">
              Chat con: {userNames[emergency.userId] || "Cargando..."}
            </h3>
            {emergency.pet && (
              <p className="text-sm text-gray-600">
                Mascota: {emergency.pet.name} ({emergency.pet.animalType})
              </p>
            )}

            {/* ✅ Renderizar un UserChat para cada emergencia */}
            <VetChat chatId={emergency.chatId} />

            {/* ✅ Botón para abrir modal con detalles de la mascota */}
            <button
              onClick={() => setSelectedPet(emergency.pet)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Ver Detalles de la Mascota
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay emergencias activas.</p>
      )}

      {/* ✅ Modal para mostrar detalles de la mascota */}
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
              <strong>Edad:</strong> {selectedPet.birthdate}
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
