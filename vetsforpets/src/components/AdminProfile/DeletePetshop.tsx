"use client"

import React, { useState, useEffect } from "react";
import { getAllVets, getVetById, deletePetShop } from "@/services/servicesVet";
import { toast } from "sonner";
import { useUserStore } from "@/store";

interface PetShop {
    id: string;
    name: string;
    isActive?: boolean;
}

const DeletePetShop = () => {
    const { userData } = useUserStore();
    const [petShops, setPetShops] = useState<PetShop[]>([]);
    const [loading, setLoading] = useState(true);

    const token = userData?.token;

    if (!token) {
        return <div>No se ha encontrado un token válido</div>;
    }

    useEffect(() => {
        const fetchPetShops = async () => {
            try {
                const allVets = await getAllVets(token);

                const detailedVets = await Promise.all(
                    allVets.map(async (vet: PetShop) => {
                        try {
                            const detailedVet = await getVetById(vet.id, token);
                            return detailedVet;
                        } catch (error) {
                            console.error(`Error al obtener detalles de ${vet.name}`, error);
                            return null;
                        }
                    })
                );

                const activeVets = detailedVets.filter((vet) => vet?.isActive);
                setPetShops(activeVets as PetShop[]);
            } catch (error) {
                console.error("Error al obtener las veterinarias:", error);
                toast.error("Error al obtener las veterinarias");
            } finally {
                setLoading(false);
            }
        };

        fetchPetShops();
    }, [token]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta veterinaria?");
        if (confirmed) {
            try {
                const response = await deletePetShop(id, token);
                if (response.error) {
                    toast.error("No se pudo eliminar la veterinaria");
                } else {
                    toast.success("Veterinaria eliminada con éxito");
                    
                    setPetShops(prevPetShops => prevPetShops.filter(petShop => petShop.id !== id));
                }
            } catch {
                toast.error("Error al eliminar la veterinaria");
            }
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <h2 className="text-2xl font-bold text-gray-800">Lista de Veterinarias Activas</h2>

            {petShops.length === 0 ? (
                <p>No hay veterinarias activas registradas.</p>
            ) : (
                <ul className="space-y-4">
                    {petShops.map((petShop) => (
                        <li
                            key={petShop.id}
                            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-lg bg-[#f1bd81]"
                        >
                            <p className="text-black">
                                <strong>{petShop.name}</strong>
                            </p>
                            <button
                                className="px-4 py-2 text-white bg-red-800 rounded"
                                onClick={() => handleDelete(petShop.id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeletePetShop;
