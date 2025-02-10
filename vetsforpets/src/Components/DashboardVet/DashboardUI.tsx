import { IVetCredentials } from "@/services/interfaces";

interface DashboardUIProps {
    veterinaria: IVetCredentials;
}

const DashboardUI = ({ veterinaria }: DashboardUIProps) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Dashboard de Veterinaria</h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="font-medium">Nombre:</div>
                    <div>{veterinaria.name}</div>
                </div>

                <div className="flex justify-between">
                    <div className="font-medium">Veterinario a cargo:</div>
                    <div>{veterinaria.veterinarian}</div>
                </div>

                <div className="flex justify-between">
                    <div className="font-medium">Número de matrícula:</div>
                    <div>{veterinaria.licenseNumber}</div>
                </div>

                <div className="flex justify-between">
                    <div className="font-medium">Horarios:</div>
                    
                </div>

                <div className="flex justify-between">
                    <div className="font-medium">Email:</div>
                    <div>{veterinaria.email}</div>
                </div>

                <div className="flex justify-between">
                    <div className="font-medium">Teléfono:</div>
                    <div>{veterinaria.phoneNumber}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUI;
