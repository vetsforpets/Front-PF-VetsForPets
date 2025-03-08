"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getAllVets } from "../../services/servicesVet";
import { useUserStore } from "@/store";
import { IVet } from "@/services/interfaces";
import { getVetById } from "../../services/servicesVet";

const PetShopsList = () => {
  const [petShops, setPetShops] = useState<IVet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPetShop, setSelectedPetShop] = useState<IVet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { userData } = useUserStore();

  const fetchPetShops = useCallback(async () => {
    if (!userData?.token) {
      console.warn(
        "⚠ No hay token disponible. No se hará la llamada a la API."
      );
      setError("No se ha encontrado un token de usuario válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allVets = await getAllVets(userData.token);

      const detailedVets = await Promise.all(
        allVets.map(async (vet: IVet) => {
          try {
            const detailedVet = await getVetById(vet.id, userData.token);
            return detailedVet;
          } catch (error) {
            console.error(`Error al obtener veterinaria ${vet.id}:`, error);
            return null;
          }
        })
      );

      const activePetShops = detailedVets.filter((vet) => vet?.isActive);

      setPetShops(activePetShops);
    } catch (error) {
      console.error("Error al cargar veterinarias:", error);
      setError("Hubo un error al cargar las veterinarias.");
    } finally {
      setLoading(false);
    }
  }, [userData?.token]);

  useEffect(() => {
    if (userData?.token) {
      fetchPetShops();
    } else {
      console.warn("❌ No hay token, no se ejecutará fetchPetShops");
    }
  }, [userData?.token]);

  const openModal = (petShop: IVet) => {
    setSelectedPetShop(petShop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetShop(null);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="container flex flex-col items-center p-4 mx-auto">
      <h1 className="w-full text-2xl font-bold text-center">Veterinarias</h1>

      {loading && (
        <div className="w-full text-center text-gray-600">Cargando...</div>
      )}
      {error && <div className="w-full text-center text-red-500">{error}</div>}

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {petShops.length > 0 ? (
          petShops.map((petShop) => (
            <div
              key={petShop.id}
              className="p-4 transition duration-200 border rounded-lg shadow-md hover:shadow-lg bg-[#f1bd81] w-full"
            >
              <h2 className="mt-2 text-2xl font-semibold">{petShop.name}</h2>
              <button
                onClick={() => openModal(petShop)}
                className="px-4 py-2 mt-4 customButton"
              >
                Mostrar información
              </button>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            No se encontraron veterinarias.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPetShop && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="p-6 bg-white rounded-lg w-96">
            <button
              onClick={closeModal}
              className="absolute text-xl font-bold top-2 right-2"
            >
              ×
            </button>
            <div className="p-4">
              <h2 className="mb-4 text-3xl font-bold">
                {selectedPetShop.name}
              </h2>
              <img
                src={selectedPetShop.imgProfile}
                alt="Fotos de Veterinarias"
                className="w-full h-auto mb-4 rounded-lg"
              />
              <p className="mb-2">
                <strong>Fundada:</strong> {selectedPetShop.foundation}
              </p>
              <p className="mb-2">
                <strong>Veterinario a Cargo:</strong>{" "}
                {selectedPetShop.veterinarian}
              </p>
              <p className="mb-2">
                <strong>Número de Matrícula:</strong>{" "}
                {selectedPetShop.licenseNumber}
              </p>
              <p className="mb-2">
                <strong>Número de Teléfono:</strong>{" "}
                {selectedPetShop.phoneNumber}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {selectedPetShop.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetShopsList;
