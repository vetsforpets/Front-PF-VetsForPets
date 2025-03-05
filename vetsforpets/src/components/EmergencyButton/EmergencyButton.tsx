import React, { useState, useEffect } from "react";
import { updatePetshop } from "@/services/servicesVet";
import { useUserStore } from "@/store";
import { fetchUserData } from "@/services/servicesUser";
import { Pet } from "../pet/PetPreview";

interface RequestEmergencyButtonProps {
  petshopId: string;
}

export const RequestEmergencyButton: React.FC<RequestEmergencyButtonProps> = ({
  petshopId,
}) => {
  const { userData } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      if (userData?.id && userData?.token) {
        try {
          const data = await fetchUserData(userData.id, userData.token);
          setPets(data.pets || []);
        } catch (error) {
          console.error("Error al obtener mascotas del usuario:", error);
        }
      }
    };

    fetchPets();
  }, [userData?.id, userData?.token]);

  const handleRequestEmergency = async () => {
    if (!userData?.id || !userData?.token || !selectedPet) {
      setError("Debe seleccionar una mascota.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        emergencies: [
          {
            userId: userData.id,
            pet: selectedPet,
          },
        ],
      };

      await updatePetshop(petshopId, updatedData, userData.token);
      alert("Emergencia solicitada con éxito.");
      setShowModal(false);
    } catch (err) {
      console.error("Error al solicitar emergencia:", err);
      setError("Hubo un problema al solicitar la emergencia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
      >
        {loading ? "Solicitando..." : "Solicitar Emergencia"}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Selecciona una mascota</h2>
            <ul className="mb-4">
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <li
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedPet?.id === pet.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pet.name}
                  </li>
                ))
              ) : (
                <p>No tienes mascotas registradas.</p>
              )}
            </ul>
            <button
              onClick={handleRequestEmergency}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 w-full"
              disabled={!selectedPet}
            >
              Confirmar Emergencia
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
