import { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { IPetApiResponse } from "@/services/servicesPetPrueba";
import { fetchPets } from "@/services/servicesPetPrueba";

export const useFetchPets = () => {
    const { userData } = useUserStore();
    const token = userData?.token;

    const [pets, setPets] = useState<IPetApiResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!token) return;

        const loadPets = async () => {
            setIsLoading(true);
            try {
                const petsData = await fetchPets(token);
                setPets(petsData);
                setError(null);
            } catch (error: unknown) {
                console.error("Error al obtener las mascotas:", error);

                if (error instanceof Error) {
                    setError(error.message || "Error al obtener las mascotas.");
                } else {
                    setError("Error desconocido al obtener las mascotas.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadPets();
    }, [token]);

    return { pets, error, isLoading };
};
