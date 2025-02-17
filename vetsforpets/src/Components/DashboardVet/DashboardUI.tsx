import { IVetCredentials } from "@/services/interfaces";
import Image from "next/image";
import ConnectCalendly from "../Calendar/Button";
import dog2 from "@/../public/images/dog2.png";
import TurnosSolicitados from "../Calendar/ScheduledAppointments";

interface DashboardUIProps {
  veterinaria: IVetCredentials;
}

interface VetDetailProps {
  label: string;
  value: string;
}

const VetProfile = ({ veterinaria }: DashboardUIProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center  mt-6 mb-6">
        Perfil de Veterinaria
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl overflow-hidden w-full max-w-4xl place-items-center">
        <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">
          <Image
            src={dog2}
            width={160}
            height={160}
            alt="Imagen de perfil"
            className="w-40 h-40 rounded-full object-cover shadow-md"
            priority
          />
          <button className="absolute top-2 right-2 rounded-full px-1 py-2 hover:bg-customBrown transition"></button>
          <h2 className="mt-4 text-3xl font-bold text-DarkGreen px-4 py-2 rounded-lg">
            {veterinaria.name}
          </h2>
        </div>

        <div className="m-6 flex flex-col space-y-2">
          <VetDetail
            label="Veterinario a cargo:"
            value={veterinaria.veterinarian}
          />
          <VetDetail
            label="Número de matrícula:"
            value={
              veterinaria.licenseNumber
                ? veterinaria.licenseNumber.toString()
                : "No disponible"
            }
          />
          <VetDetail
            label="Horarios:"
            value={
              veterinaria.businessHours
                ? JSON.stringify(veterinaria.businessHours)
                : "No disponible"
            }
          />
          <VetDetail label="Email:" value={veterinaria.email} />
          <VetDetail label="Teléfono:" value={veterinaria.phoneNumber} />
        </div>
      </div>
      <ConnectCalendly id={veterinaria.id} />
      <TurnosSolicitados />
    </div>
  );
};

const VetDetail = ({ label, value }: VetDetailProps) => (
  <div>
    <h2 className="text-customBrown font-semibold py-1 pl-4">{label}</h2>
    <p className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96 min-h-[48px]">
      {value}
    </p>
  </div>
);

export default VetProfile;
