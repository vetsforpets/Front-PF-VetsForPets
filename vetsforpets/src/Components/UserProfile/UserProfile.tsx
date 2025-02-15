"use client";

import { useEffect, useState } from "react";
import PetCreateForm from "../pet/PetCreateForm";
import PetDetails from "../pet/petDetails";
import PetPreview, { Pet } from "../pet/PetPreview";
import Profile from "./Profile";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { fetchUserData } from "@/services/servicesUser";
import { IUserData } from "@/services/interfaces";

export default function ProfileView() {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  const [addingPet, setAddingPet] = useState(false);
  const [user, setUser] = useState<IUserData>();
  const [selectedPet, setSelectedPet] = useState<Pet>();
  const [reloadPets, setReloadPets] = useState(false);

  useEffect(() => {
    if (!userData?.id) {
      router.push("/");
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id && userData?.token) {
        try {
          const data = await fetchUserData(userData.id, userData.token);
          setUser(data);
          setSelectedPet(data.pets[0]);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          setUser(undefined);
        }
      }
    };

    fetchData();
  }, [userData?.id, userData?.token, reloadPets]);

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
  };

  if (userData?.id === undefined) {
    return <div>Cargando....</div>;
  } else {
    return (
      <div className="min-h-screen bg-customBeige bg-opacity-20 p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <Profile />

          <div className="flex justify-center">
            {!addingPet && (
              <button
                onClick={() => setAddingPet(!addingPet)}
                className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition"
              >
                Agregar Mascota
              </button>
            )}
            {addingPet && (
              <PetCreateForm
                setAddingPet={setAddingPet}
                addingPet={addingPet}
                setReloadPets={setReloadPets}
              />
            )}
          </div>

          {/* Vista previa de las mascotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 py-10">
            {/* Left Column - Pet Cards */}
            <div className="space-y-4">
              {(user?.pets ?? []).map((pet: Pet, index: number) => (
                <div
                  key={index}
                  className="bg-[#deb887] rounded-2xl pl-4 shadow-lg"
                >
                  <PetPreview
                    pet={pet}
                    onSelectPet={handleSelectPet}
                    setReloadPets={setReloadPets}
                  />
                </div>
              ))}
            </div>

            {/* Detalle de la mascota seleccionada */}
            {selectedPet && (
              <PetDetails pet={selectedPet} token={userData.token} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
