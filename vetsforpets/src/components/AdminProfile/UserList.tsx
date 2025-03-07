"use client";

import React, { useCallback, useEffect, useState } from "react";
import { fetchUsers, fetchUserData } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import { IUserApiResponse } from "@/services/interfaces";
import { toast } from "sonner";
import PetPreview from "../pet/PetPreview";
import PetDetails from "../pet/petDetails";
import Image from "next/image";

// Actualiza la interfaz de la mascota para incluir las propiedades requeridas
interface IPet {
  id: string;
  name: string;
  breed?: string;
  age?: number;
  description?: string;
  animalType: string;
  birthdate: string;
  sex: string;
  isSterilized: boolean;
  medicalRecord: string
}

const UserList = () => {
  const [users, setUsers] = useState<IUserApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUserApiResponse | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  // Estados para los modales de mascota
  const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
  const [isPetPreviewOpen, setIsPetPreviewOpen] = useState<boolean>(false);
  const [isPetDetailsOpen, setIsPetDetailsOpen] = useState<boolean>(false);

  const { userData } = useUserStore();

  const fetchUsersList = useCallback(async () => {
    if (!userData?.token) {
      console.warn("⚠ No hay token disponible. No se hará la llamada a la API.");
      setError("No se ha encontrado un token de usuario válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allUsers = await fetchUsers(userData.token);
      setUsers(allUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setError("Hubo un error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, [userData?.token]);

  useEffect(() => {
    if (userData?.token) {
      fetchUsersList();
    } else {
      console.warn("❌ No hay token, no se ejecutará fetchUsersList");
    }
  }, [userData?.token, fetchUsersList]);

  
  const openUserModal = async (user: IUserApiResponse) => {
    if (!userData?.token) {
      toast.error("No se ha encontrado un token válido.");
      return;
    }
    try {
      const detailedUser = await fetchUserData(user.id, userData.token);
      
      setSelectedUser(detailedUser as unknown as IUserApiResponse);
      setIsUserModalOpen(true);
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error);
      toast.error("Error al cargar los detalles del usuario.");
    }
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  
  const openPetPreview = (pet: IPet) => {
    setSelectedPet(pet);
    setIsPetPreviewOpen(true);
  };

  const closePetPreview = () => {
    setIsPetPreviewOpen(false);
  };

  const handleViewPet = () => {
    setIsPetPreviewOpen(false);
    setIsPetDetailsOpen(true);
  };

  const closePetDetails = () => {
    setIsPetDetailsOpen(false);
    setSelectedPet(null);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeUserModal();
    }
  };

  const handleUpdatePet = (updatedPet: IPet) => {
    setSelectedPet(updatedPet);
    if (selectedUser && selectedUser.pets) {
      const updatedPets = selectedUser.pets.map((pet: IPet) =>
        pet.id === updatedPet.id ? updatedPet : pet
      );
      setSelectedUser({ ...selectedUser, pets: updatedPets });
    }
  };
  

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold text-center">Usuarios</h1>

      {loading && <div className="text-center text-gray-600">Cargando...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
  {users.length > 0 ? (
    users.map((user) => (
      <div
        key={user.id}
       className="p-4 w-full md:max-w-xs lg:max-w-sm mx-auto transition duration-200 border rounded-lg shadow-md hover:shadow-lg bg-[#f1bd81] flex flex-col justify-between"
      >
        <h2 className="mt-2 text-2xl font-semibold">
          {user.name} {user.lastName}
        </h2>
        <button
          onClick={() => openUserModal(user)}
          className="w-full px-6 py-3 mt-4 text-base transition-colors border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown"
        >
          Mostrar información
        </button>
      </div>
    ))
  ) : (
    <div className="text-center col-span-full">
      No se encontraron usuarios.
    </div>
  )}
</div>


      {/* Modal de Usuario */}
      {isUserModalOpen && selectedUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative w-full max-w-xl p-6 mx-4 bg-white rounded-lg">
            <button
              onClick={closeUserModal}
              className="absolute text-xl font-bold top-2 right-2"
            >
              ×
            </button>
            <div className="p-4">
              <h2 className="mb-4 text-3xl font-bold text-center">
                {selectedUser.name} {selectedUser.lastName}
              </h2>
              {selectedUser.imgProfile && (
                <Image
                  src={selectedUser.imgProfile}
                  alt={`Imagen de ${selectedUser.name}`}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64 mx-auto mb-4 rounded-lg"
                />
              )}
              <p className="mb-2 text-center">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="mb-2 text-center">
                <strong>Teléfono:</strong> {selectedUser.phoneNumber}
              </p>

              {/* Mostrar las mascotas del usuario */}
              {selectedUser.pets && selectedUser.pets.length > 0 ? (
                <div className="mt-3">
                  <h3 className="text-xl font-bold text-center">Mascota/s:</h3>
                  <ul className="mt-2">
                    {selectedUser.pets.map((pet: IPet) => (
                      <li key={pet.id} className="text-center">
                        <button
                          onClick={() => openPetPreview(pet)}
                          className="m-2 customButton ext-blue-600"
                        >
                          {pet.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-center">No se encontraron mascotas.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de PetPreview */}
      {isPetPreviewOpen && selectedPet && (
        <div
          className="fixed inset-0 flex items-center justify-center max-w-full bg-black bg-opacity-50 backdrop-blur-md z-60"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePetPreview();
          }}
        >
          <div className="relative w-full max-w-xl p-6 mx-4 bg-white rounded-lg">
            <button
              onClick={closePetPreview}
              className="absolute text-xl font-bold top-2 right-2"
            >
              ×
            </button>
            {/* Se muestra el PetPreview, pasándole la mascota y un callback para ver los detalles */}
            <PetPreview pet={{ ...selectedPet, medicalRecord: selectedPet.medicalRecord ?? '' }} onSelectPet={handleViewPet} setReloadPets={() => {}} />


          </div>
        </div>
      )}

      {/* Modal de PetDetails */}
      {isPetDetailsOpen && selectedPet && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-70"
    onClick={(e) => {
      if (e.target === e.currentTarget) closePetDetails();
    }}
  >
    <div className="relative w-full max-w-xl p-6 mx-4 bg-white rounded-lg ">
      <button
        onClick={closePetDetails}
        className="absolute text-xl font-bold top-2 right-2"
      >
        ×
      </button>
      <PetDetails
  pet={{ ...selectedPet, medicalRecord: selectedPet.medicalRecord ?? "" }}
  token={userData?.token}
  onUpdatePet={handleUpdatePet}
/>


          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;


