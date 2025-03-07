// "use client";

// import React, { useEffect, useState } from "react";
// import { useUserStore } from "@/store";
// import { fetchUserData } from "@/services/servicesUser";
// import { getVetById } from "@/services/servicesVet";
// import { IVetCredentials } from "@/services/interfaces";
// import { VetChat } from "../Chat/VetChat";
// import { Pet } from "../pet/PetPreview";

// export function VetEmergencies() {
//   const { userData } = useUserStore();
//   const [vetData, setVetData] = useState<IVetCredentials | null>(null);
//   const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
//   const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // Estado para el modal

//   useEffect(() => {
//     if (userData?.id && userData.token) {
//       const fetchVetData = async () => {
//         try {
//           const vetFetched = await getVetById(userData.id, userData.token);
//           setVetData(vetFetched);

//           // Obtener nombres de los usuarios que pidieron emergencias
//           if (vetFetched?.emergencies) {
//             const userNamesMap: { [key: string]: string } = {};
//             await Promise.all(
//               vetFetched.emergencies.map(async (emergency) => {
//                 if (!userNamesMap[emergency.userId]) {
//                   const user = await fetchUserData(
//                     emergency.userId,
//                     userData.token
//                   );
//                   userNamesMap[emergency.userId] = user
//                     ? user.name
//                     : "Usuario desconocido";
//                 }
//               })
//             );
//             setUserNames(userNamesMap);
//           }
//         } catch (error) {
//           console.error("Error al obtener los datos de la veterinaria:", error);
//         }
//       };

//       fetchVetData();
//     }
//   }, [userData?.id, userData?.token]);

//   return (
//     <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-bold">Chats de Emergencia</h2>

//       {vetData?.emergencies && vetData.emergencies.length > 0 ? (
//         vetData.emergencies.map((emergency, index) => (
//           <div key={index} className="p-4 border rounded-md shadow">
//             <h3 className="text-md font-semibold">
//               Chat con: {userNames[emergency.userId] || "Cargando..."}
//             </h3>
//             {emergency.pet && (
//               <p className="text-sm text-gray-600">
//                 Mascota: {emergency.pet.name} ({emergency.pet.animalType})
//               </p>
//             )}

//             {/* ✅ Renderizar un UserChat para cada emergencia */}
//             <VetChat chatId={emergency.chatId} />

//             {/* ✅ Botón para abrir modal con detalles de la mascota */}
//             <button
//               onClick={() => setSelectedPet(emergency.pet)}
//               className="mt-2 p-2 bg-blue-500 text-white rounded-md"
//             >
//               Ver Detalles de la Mascota
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No hay emergencias activas.</p>
//       )}

//       {/* ✅ Modal para mostrar detalles de la mascota */}
//       {selectedPet && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-96">
//             <h2 className="text-lg font-bold">Detalles de la Mascota</h2>
//             <p>
//               <strong>Nombre:</strong> {selectedPet.name}
//             </p>
//             <p>
//               <strong>Especie:</strong> {selectedPet.animalType}
//             </p>
//             <p>
//               <strong>Raza:</strong> {selectedPet.breed}
//             </p>
//             <p>
//               <strong>Edad:</strong> {selectedPet.birthdate}
//             </p>
//             <p>
//               <strong>Esterilizado:</strong>{" "}
//               {selectedPet.isSterilized ? "Sí" : "No"}
//             </p>

//             <button
//               onClick={() => setSelectedPet(null)}
//               className="mt-4 p-2 bg-red-500 text-white rounded-md"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { useUserStore } from "@/store";
// import { fetchUserData, updateUser } from "@/services/servicesUser";
// import { getVetById, updatePetshop } from "@/services/servicesVet";
// import { IVetCredentials } from "@/services/interfaces";
// import { VetChat } from "../Chat/VetChat";
// import { Pet } from "../pet/PetPreview";

// export function VetEmergencies() {
//   const { userData } = useUserStore();
//   const [vetData, setVetData] = useState<IVetCredentials | null>(null);
//   const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
//   const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

//   useEffect(() => {
//     if (userData?.id && userData.token) {
//       const fetchVetData = async () => {
//         try {
//           const vetFetched = await getVetById(userData.id, userData.token);
//           setVetData(vetFetched);

//           if (vetFetched?.emergencies) {
//             const userNamesMap: { [key: string]: string } = {};
//             await Promise.all(
//               vetFetched.emergencies.map(async (emergency) => {
//                 if (!userNamesMap[emergency.userId]) {
//                   const user = await fetchUserData(
//                     emergency.userId,
//                     userData.token
//                   );
//                   userNamesMap[emergency.userId] = user
//                     ? user.name
//                     : "Usuario desconocido";
//                 }
//               })
//             );
//             setUserNames(userNamesMap);
//           }
//         } catch (error) {
//           console.error("Error al obtener los datos de la veterinaria:", error);
//         }
//       };

//       fetchVetData();
//     }
//   }, [userData?.id, userData?.token]);

//   const handleDeleteEmergency = async (chatId: string, userId: string) => {
//     if (!vetData || !userData?.token) return;

//     try {
//       const updatedEmergencies = vetData.emergencies.filter(
//         (emergency) => emergency.chatId !== chatId
//       );

//       await updatePetshop(
//         vetData.id,
//         { emergencies: updatedEmergencies },
//         userData.token
//       );

//       const user = await fetchUserData(userId, userData.token);
//       if (user) {
//         const updatedUserEmergencies = user.emergencies.filter(
//           (emergency) => emergency.chatId !== chatId
//         );

//         await updateUser(
//           user.id,
//           { emergencies: updatedUserEmergencies },
//           userData.token
//         );
//       }

//       setVetData((prevVetData) =>
//         prevVetData ? { ...prevVetData, emergencies: updatedEmergencies } : null
//       );
//     } catch (error) {
//       console.error("Error al eliminar la emergencia:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-bold">Chats de Emergencia</h2>

//       {vetData?.emergencies && vetData.emergencies.length > 0 ? (
//         vetData.emergencies.map((emergency, index) => (
//           <div key={index} className="p-4 border rounded-md shadow">
//             <h3 className="text-md font-semibold">
//               Chat con: {userNames[emergency.userId] || "Cargando..."}
//             </h3>
//             {emergency.pet && (
//               <p className="text-sm text-gray-600">
//                 Mascota: {emergency.pet.name} ({emergency.pet.animalType})
//               </p>
//             )}
//             <VetChat chatId={emergency.chatId} />

//             <button
//               onClick={() => setSelectedPet(emergency.pet)}
//               className="mt-2 p-2 bg-blue-500 text-white rounded-md"
//             >
//               Ver Detalles de la Mascota
//             </button>

//             <button
//               onClick={() =>
//                 handleDeleteEmergency(emergency.chatId, emergency.userId)
//               }
//               className="mt-2 p-2 bg-red-500 text-white rounded-md ml-2"
//             >
//               Eliminar Emergencia
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No hay emergencias activas.</p>
//       )}

//       {selectedPet && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-96">
//             <h2 className="text-lg font-bold">Detalles de la Mascota</h2>
//             <p>
//               <strong>Nombre:</strong> {selectedPet.name}
//             </p>
//             <p>
//               <strong>Especie:</strong> {selectedPet.animalType}
//             </p>
//             <p>
//               <strong>Raza:</strong> {selectedPet.breed}
//             </p>
//             <p>
//               <strong>Edad:</strong> {selectedPet.birthdate}
//             </p>
//             <p>
//               <strong>Esterilizado:</strong>{" "}
//               {selectedPet.isSterilized ? "Sí" : "No"}
//             </p>

//             <button
//               onClick={() => setSelectedPet(null)}
//               className="mt-4 p-2 bg-red-500 text-white rounded-md"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { fetchUserData, updateUser } from "@/services/servicesUser";
import { getVetById, updatePetshop } from "@/services/servicesVet";
import { IVetCredentials } from "@/services/interfaces";
import { VetChat } from "../Chat/VetChat";
import { Pet } from "../pet/PetPreview";

export function VetEmergencies() {
  const { userData } = useUserStore();
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

  const handleDeleteEmergency = async (chatId: string, userId: string) => {
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

      // Obtener la información actualizada del usuario y actualizarla completa
      const user = await fetchUserData(userId, userData.token);
      if (user) {
        const updatedUserData = {
          ...user,
          emergencies: user.emergencies.filter(
            (emergency) => emergency.chatId !== chatId
          ),
        };

        await updateUser(user.id, updatedUserData, userData.token);
      }

      // Actualizar el estado local
      setVetData(updatedVetData);
    } catch (error) {
      console.error("Error al eliminar la emergencia:", error);
    }
  };

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
            <VetChat chatId={emergency.chatId} />

            <button
              onClick={() => setSelectedPet(emergency.pet)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Ver Detalles de la Mascota
            </button>

            <button
              onClick={() =>
                handleDeleteEmergency(emergency.chatId, emergency.userId)
              }
              className="mt-2 p-2 bg-red-500 text-white rounded-md ml-2"
            >
              Eliminar Emergencia
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay emergencias activas.</p>
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
