
'use client'

import React, { useState, useEffect } from "react";
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
        // if (!userData || !userData.id) {
        //     setError("No se encontró la ID de veterinaria");
        //     setLoading(false);
        //     return;
        // }
        if(userData?.id){
            const getVetData = async () => {
                console.log("Buscando veterinaria con ID:", userData.id);
                try {
                    const vet:IVetCredentials | null = await getVetById(userData.id, userData.token);
                    console.log("Respuesta de getVetById", vet);
                    if (vet) {
                        setVeterinaria(vet);
                    } else {
                        setVeterinaria(null);
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
  
        } else {
            router.push("/")
        }
    }, [userData?.id]); 


    if(userData?.id === undefined) return <div>Cargando....</div>
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return veterinaria ? <DashboardUI veterinaria={veterinaria} /> : <div>No hay datos disponibles</div>;
};

export default DashboardData;

// 'use client'

// import { useState, useEffect } from "react";
// import DashboardUI from "./DashboardUI";
// import { IVetCredentials } from "@/services/interfaces";
// import { getVetById } from "@/services/servicesVet";  // Función para obtener la veterinaria por ID
// import { useUserStore } from "@/store";  // Solo para acceder a la información del usuario

// const DashboardData = () => {
//     const [veterinaria, setVeterinaria] = useState<IVetCredentials | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const userData = useUserStore((state) => state.userData);

//     useEffect(() => {
//         console.log("userData", userData);

//         // Verificar si no existe el usuario o ID
//         if (!userData) {
//             setError("No se encontró el usuario");
//             setLoading(false);
//             return;
//         }
//         if (!userData.id) {
//             setError("No se encontró la ID de veterinaria");
//             setLoading(false);
//             return;
//         }
    

//         const getVetData = async () => {
//             console.log("Buscando veterinaria con ID:", userData.id);
//             try {
//                 const vet = await getVetById(userData.id);
//                 console.log("Respuesta de getVetById", vet);
//                 if (vet) {
//                     setVeterinaria(vet);
//                 } else {
//                     setError("No se encontró la veterinaria asociada al usuario");
//                 }
//             } catch (err) {
                
//                 if (err instanceof Error) {
//                     setError(err.message);
//                 } else {
//                     setError("Ocurrió un error desconocido");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getVetData();

//     }, [userData]);


//     if (loading) return <div>Cargando...</div>;
//     if (error) return <div>Error: {error}</div>;

    
//     return veterinaria ? <DashboardUI veterinaria={veterinaria} /> : <div>No hay datos disponibles</div>;
// };

// export default DashboardData;
