// "use client";

// import React, { useEffect } from "react";

// import Image from "next/image";
// import dynamic from "next/dynamic";

// export default function VetList() {
// //   const { vets, loading, error, fetchVetsData } = useVetStore();

//   useEffect(() => {
//     fetchVetsData(); // Cargar veterinarias al montar el componente
//   }, []);


//   const MapComponent = dynamic(
//     () => import("../../components/Maps/Maps"),
//     { ssr: false }
//   );


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="mb-6 text-3xl font-bold">🐶 Veterinarias Registradas</h1>

//       <div><MapComponent /></div>

//       {loading && <p className="text-gray-500">Cargando datos...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
//         {vets.map((vet) => (
//           <div key={vet.id} className="p-6 bg-white rounded-lg shadow-lg w-80">
//             <Image
//               src={vet.imgProfile || "/default-vet.jpg"}
//               alt={vet.name}
//               width={200}
//               height={200}
//               className="mx-auto rounded-full"
//             />
//             <h2 className="mt-4 text-xl font-semibold">{vet.name}</h2>
//             <p className="text-gray-700">📍 Ubicación: {vet.location}</p>
//             <p className="text-gray-700">📞 Teléfono: {vet.phoneNumber}</p>
//             <p className="text-gray-700">👨‍⚕️ Veterinario: {vet.veterinarian}</p>
//             <p className="mt-4 font-bold text-center">
//               {vet.is24Hours ? "🟢 Abierto 24/7" : "🔴 No abierto 24/7"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
