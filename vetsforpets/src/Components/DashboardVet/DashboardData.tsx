'use client'

import { useState, useEffect } from "react";
import DashboardUI from "./DashboardUI";
import { IVetCredentials } from "@/services/interfaces";
import { fetchVetData } from "@/services/servicesVet";

const DashboardData = () => {
    const [veterinaria, setVeterinaria] = useState<IVetCredentials | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchVetData();
                
                if (data && data.length > 0) {
                    setVeterinaria(data[0]);  
                } else {
                    setError("No se encontró la veterinaria logueada");
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

        getData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return veterinaria ? <DashboardUI veterinaria={veterinaria} /> : <div>No hay datos disponibles</div>;
};

export default DashboardData;
