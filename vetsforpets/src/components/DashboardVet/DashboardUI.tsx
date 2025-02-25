//RESPONSIVE//
import { IVetCredentials } from "@/services/interfaces";
import Image from "next/image";
import ScheduledAppointments from "../Calendar/ScheduledAppointments";

interface DashboardUIProps {
  veterinaria: IVetCredentials;
}

interface VetDetailProps {
  label: string;
  value: string;
}

const VetProfile = ({ veterinaria }: DashboardUIProps) => {
  return (
    <div className="max-w-4xl p-4 mx-auto sm:p-6">
      <h1 className="mt-6 mb-6 text-3xl font-bold text-center">Perfil de Veterinaria</h1>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {/* Imagen del perfil */}
        <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] max-w-[280px] sm:max-w-[320px] mx-auto">
          <Image
            src="images/dog2.png"
            width={160}
            height={160}
            alt="Imagen de perfil"
            className="object-cover w-40 h-40 rounded-full shadow-md"
            priority
          />
          <button className="absolute px-1 py-2 transition rounded-full top-2 right-2 hover:bg-customBrown"></button>
          <h2 className="px-4 py-2 mt-4 text-2xl font-bold rounded-lg sm:text-3xl text-DarkGreen">
            {veterinaria.name}
          </h2>
        </div>

        {/* Detalles del veterinario */}
        <div className="flex flex-col m-6 space-y-4 md:space-y-6">
          <VetDetail
            label="Veterinario a cargo:"
            value={veterinaria.veterinarian}
          />
          <VetDetail
            label="Número de matrícula:"
            value={veterinaria.licenseNumber ? veterinaria.licenseNumber.toString() : "No disponible"}
          />
          <VetDetail
            label="Horarios:"
            value={veterinaria.businessHours ? JSON.stringify(veterinaria.businessHours) : "No disponible"}
          />
          <VetDetail label="Email:" value={veterinaria.email} />
          <VetDetail label="Teléfono:" value={veterinaria.phoneNumber} />
        </div>
      </div>

      {/* Turnos programados */}
      <ScheduledAppointments />
    </div>
  );
};

const VetDetail = ({ label, value }: VetDetailProps) => (
  <div className="flex flex-col">
    <h2 className="py-1 pl-4 font-semibold text-customBrown">{label}</h2>
    <p className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-h-[48px]">
      {value}
    </p>
  </div>
);

export default VetProfile;


// import { IVetCredentials } from "@/services/interfaces";
// import Image from "next/image";
// import ScheduledAppointments from "../Calendar/ScheduledAppointments";

// interface DashboardUIProps {
//   veterinaria: IVetCredentials;
// }

// interface VetDetailProps {
//   label: string;
//   value: string;
// }

// const VetProfile = ({ veterinaria }: DashboardUIProps) => {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="mt-6 mb-6 text-3xl font-bold text-center">
//         Perfil de Veterinaria
//       </h1>

//       <div className="grid w-full max-w-4xl grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 rounded-2xl place-items-center">
//         <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">
//           <Image
//             src="images/dog2.png"
//             width={160}
//             height={160}
//             alt="Imagen de perfil"
//             className="object-cover w-40 h-40 rounded-full shadow-md"
//             priority
//           />
//           <button className="absolute px-1 py-2 transition rounded-full top-2 right-2 hover:bg-customBrown"></button>
//           <h2 className="px-4 py-2 mt-4 text-3xl font-bold rounded-lg text-DarkGreen">
//             {veterinaria.name}
//           </h2>
//         </div>

//         <div className="flex flex-col m-6 space-y-2">
//           <VetDetail
//             label="Veterinario a cargo:"
//             value={veterinaria.veterinarian}
//           />
//           <VetDetail
//             label="Número de matrícula:"
//             value={
//               veterinaria.licenseNumber
//                 ? veterinaria.licenseNumber.toString()
//                 : "No disponible"
//             }
//           />
//           <VetDetail
//             label="Horarios:"
//             value={
//               veterinaria.businessHours
//                 ? JSON.stringify(veterinaria.businessHours)
//                 : "No disponible"
//             }
//           />
//           <VetDetail label="Email:" value={veterinaria.email} />
//           <VetDetail label="Teléfono:" value={veterinaria.phoneNumber} />
//         </div>
//       </div>

//       <ScheduledAppointments />
//     </div>
//   );
// };

// const VetDetail = ({ label, value }: VetDetailProps) => (
//   <div>
//     <h2 className="py-1 pl-4 font-semibold text-customBrown">{label}</h2>
//     <p className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96 min-h-[48px]">
//       {value}
//     </p>
//   </div>
// );

// export default VetProfile;
