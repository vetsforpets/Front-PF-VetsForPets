
'use client'

import { useState, useEffect } from "react";
import DashboardUI from "./DashboardUI";
import { IVetCredentials } from "@/services/interfaces";
import { getVetById } from "@/services/servicesVet";  
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

const DashboardData = () => {
    const [veterinaria, setVeterinaria] = useState<IVetCredentials | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userData = useUserStore((state) => state.userData);
    const router = useRouter()
    
    useEffect(() => {
        if(userData){
            const getVetData = async () => {
                console.log("Buscando veterinaria con ID:", userData.id);
                try {
                    const vet = await getVetById(userData.id);
                    console.log("Respuesta de getVetById", vet);
                    if (vet) {
                        setVeterinaria(vet);
                    } else {
                        setError("No se encontró la veterinaria asociada al usuario");
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("Ocurrió un error desconocido");
                    }
                } finally {
                    setLoading(false);
                }
            };
    
            getVetData();

        }
    }, [userData]); 

    useEffect(()=>{
        if(!userData?.id){
            router.push("/")
        }
    },[userData])

    if(userData?.id === undefined){
        return <div>Cargando....</div>
    } else {
    if (loading) return <div className="text-center text-4xl font-semibold">Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return veterinaria ? <DashboardUI veterinaria={veterinaria} /> : <div>No hay datos disponibles</div>;
    }
};

export default DashboardData;