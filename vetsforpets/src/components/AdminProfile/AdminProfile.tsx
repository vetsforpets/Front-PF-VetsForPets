"use client";

import { useEffect, useState } from "react";
import PetDetails from "../pet/petDetails";
import PetPreview, { Pet } from "../pet/PetPreview";
import Admin from "./Admin";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { fetchUserData } from "@/services/servicesUser";
import { IUserData } from "@/services/interfaces";


// import AppointmentsUser from "../Calendar/AppointmentsUser";
import dynamic from "next/dynamic";
import UserAndVets from "./UsersAndVets";

const MapComponent = dynamic(() => import("../Maps/Maps"), { ssr: false });

import StripeMetrics from "../StripeMetrics/StripeMetrics";
import { MyComponent } from "./VetGroup";


export default function AdminProfile() {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  const [user, setUser] = useState<IUserData>();
  const [selectedPet, setSelectedPet] = useState<Pet>();
  const [reloadPets, setReloadPets] = useState(false);

  const [showProfile, setShowProfile] = useState(true);
  const [showPets, setShowPets] = useState(false);
  const [showVets, setShowVets] = useState(false);

  const [showAddPets, setShowAddPets] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [showUserAndVets, setShowUserAndVets] = useState(false);

  const [showStripeMetrics, setShowStripeMetrics] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user?.isAdmin) {
        router.push("/");
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [user?.isAdmin]);

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
    setShowVets(false);

    setShowAddPets(false);
    setShowMaps(false);
    setShowUserAndVets(false)

    setShowStripeMetrics(false);
    setShowAppointments(false);

  };

  const handlePetsClick = () => {
    setShowPets(true);
    setShowProfile(false);
    setShowVets(false);

    setShowAddPets(false);
    setShowMaps(false);
    setShowUserAndVets(false)

    setShowStripeMetrics(false);
    setShowAppointments(false);

  };

  const handleStripeMetricsClick = () => {
    setShowStripeMetrics(true);
    setShowProfile(false);
    setShowPets(false);
    setShowVets(false);
    setShowMaps(false);
    setShowUserAndVets(false)
  };

  // const handleRedirectToPets = () => {
  //   setShowPets(true);
  //   setShowProfile(false);
  //   setShowCalendly(false);
  //   setShowAddPets(false);
  //   setShowMaps(false);
  //   setShowUserAndVets(false)
  //   router.push("/dashboard");
  // };

  const handleVetsClick = () => {
    setShowVets(true);
    setShowProfile(false);
    setShowPets(false);

    setShowAddPets(false);
    setShowMaps(false);
    setShowUserAndVets(false)

    setShowStripeMetrics(false);
    setShowAppointments(false);

  };

  const handleMapsClick = () => {
    setShowMaps(true);
    setShowVets(false);
    setShowProfile(false);
    setShowPets(false);
    setShowAddPets(false);
    setShowUserAndVets(false)
  };

  const handleUserAndVetsClick = () => {
    setShowUserAndVets(true)
    setShowMaps(false);
    setShowVets(false);
    setShowProfile(false);
    setShowPets(false);

    setShowAddPets(false);

    setShowStripeMetrics(false);

  };



  const handleUpdatePet = (updatedPet: Pet) => {
    setSelectedPet(updatedPet); // Actualiza el estado del pet seleccionado
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        pets: prevUser.pets.map((pet) =>
          pet.id === updatedPet.id ? updatedPet : pet
        ),
      };
    });
  };

  if (userData?.id === undefined) {
    return <div>Cargando....</div>;
  } else {
    return (
      <div className="p-5 md:flex">
        <ul className="flex flex-col w-full p-5 py-2 space-y-4 text-sm font-medium text-gray-500 ml-14 md:w-2/4 lg:w-1/3 xl:w-1/4">
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleProfileClick}
            >
              <img src="/user.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Usuarios
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handlePetsClick}
            >
              <img src="/pets.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Emergencias
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleStripeMetricsClick}
            >
              <img src="/pets.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Membresias
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleVetsClick}
            >
              <img
                src="/calendar.svg"
                alt="Calendly"
                className="w-12 h-12 me-2"
              />
              Veterinarias y Turnos
            </a>
          </li>
          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleMapsClick}
            >
              <img
                src="/calendar.svg"
                alt="Calendly"
                className="w-12 h-12 me-2"
              />
              Mapa
            </a>
          </li>


          <li className="p-3">
            <a
              href="#"
              className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
              onClick={handleUserAndVetsClick}
            >
              <img src="/user.svg" alt="Calendly" className="w-12 h-12 me-2" />
              Usuarios y Veterinarias
            </a>
          </li>
        </ul>


        <div className="flex-1 p-4 bg-customBeige bg-opacity-20">
          <div className="max-w-6xl mx-auto space-y-4">
            {showProfile && (
              <div className="flex justify-center">
                <Admin />
              </div>
            )}
            {showPets && (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-14">
                {user?.pets && user.pets.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {user.pets.map((pet: Pet, index: number) => (
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
                      <PetDetails
                        pet={selectedPet}
                        token={userData.token}
                        onUpdatePet={handleUpdatePet}
                      />
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full mx-auto text-center">
                    <p className="mb-4 text-lg font-semibold text-gray-600">
                      No tienes mascotas registradas aún.
                    </p>
                  </div>
                )}
              </div>
            )}

            {showStripeMetrics && (
              <StripeMetrics token={userData.token} />
            )}
            {showVets && (<MyComponent userData={userData} />)}
            {showMaps && <MapComponent />}
            {showUserAndVets && <UserAndVets />}



            {showAddPets && (
              <div className="p-4 mt-4 text-center bg-gray-200 rounded">
                Funcionalidad para agregar mascotas próximamente.
              </div>
            )}

            {showAppointments && (
              <div className="p-4 mt-4 text-center bg-gray-200 rounded">
                Funcionalidad para ver citas próximamente.
              </div>
            )}


          </div>
        </div>
      </div>
    );
  }
}
