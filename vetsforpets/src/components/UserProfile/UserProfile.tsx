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
import CalendlySearch from "../Calendar/CalendlySearch";

export default function ProfileView() {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  const [addingPet, setAddingPet] = useState(false);
  const [user, setUser] = useState<IUserData>();
  const [selectedPet, setSelectedPet] = useState<Pet>();
  const [reloadPets, setReloadPets] = useState(false);

  const [showProfile, setShowProfile] = useState(true);
  const [showPets, setShowPets] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showAddPets, setShowAddPets] = useState(false);

  useEffect(() => {
    if (!userData?.id) {
      router.push("/");
    }
  }, [userData, router]);

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

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowPets(false);
    setShowCalendly(false);
    setShowAddPets(false);
  };

  const handlePetsClick = () => {
    setShowPets(true);
    setShowProfile(false);
    setShowCalendly(false);
    setShowAddPets(false);
  };

  const handleAddPetsClick = () => {
    setShowAddPets(true);
    setShowProfile(false);
    setShowPets(false);
    setShowCalendly(false);
  };

  const handleRedirectToPets = () => {
    setShowPets(true);
    setShowProfile(false);
    setShowCalendly(false);
    setShowAddPets(false);
    router.push("/dashboard");
  };

  const handleCalendlyClick = () => {
    setShowCalendly(true);
    setShowProfile(false);
    setShowPets(false);
    setShowAddPets(false);
  };

  if (userData?.id === undefined) {
    return <div>Cargando....</div>;
  } else {
    return (
      <div className="p-5 md:flex">
        <ul className="flex flex-col w-full py-2 space-y-4 text-sm font-medium text-gray-500 ml-14 p-5 md:w-2/4 lg:w-1/3 xl:w-1/4">
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleProfileClick}
            >
              <img src="/user.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Mi Perfil
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handlePetsClick}
            >
              <img src="/pets.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Mis Mascotas
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleAddPetsClick}
            >
              <img src="/pets.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Agregar Mascota
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleCalendlyClick}
            >
              <img
                src="/calendar.svg"
                alt="Calendly"
                className="w-12 h-12 me-2"
              />
              Solicitar Turno
            </a>
          </li>
        </ul>
        <div className="flex-1 p-4 bg-customBeige bg-opacity-20">
          <div className="max-w-6xl mx-auto space-y-4">
            {showProfile && (
              <div className="flex justify-center">
                <Profile />
              </div>
            )}
            {showPets && (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-14">
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
                {selectedPet && (
                  <PetDetails pet={selectedPet} token={userData.token} />
                )}
              </div>
            )}
            {showAddPets && (
              <PetCreateForm
                setAddingPet={setAddingPet}
                addingPet={addingPet}
                setReloadPets={setReloadPets}
                onPetCreated={handleRedirectToPets}
              />
            )}
            {showCalendly && <CalendlySearch />}
          </div>
        </div>
      </div>
    );
  }
}
