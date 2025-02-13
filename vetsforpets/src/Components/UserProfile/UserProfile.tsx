"use client";

import { useEffect, useState } from "react";
import PetCreateForm from "../pet/PetCreateForm";
import PetDetails from "../pet/petDetails";
import PetPreview from "../pet/PetPreview";
import Profile from "./Profile";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export default function ProfileView() {
  const [addingPet, setAddingPet] = useState(false);
  const [pets] = useState([
    { name: "Benito", breed: "Gato", age: "5 años" },
    { name: "Rex", breed: "Perro", age: "2 años" },
    { name: "Milo", breed: "Conejo", age: "1 año" },
  ]);
  const router = useRouter()
  const userData = useUserStore((state) => state.userData);
  console.log('====================================');
  console.log(userData);
  console.log('====================================');
  
useEffect(()=>{
  if(!userData?.id){
    router.push("/")
  }
},[userData])

  if(userData?.id === undefined){
    return <div>Cargando....</div>
   } else {
     return (
       <div className="min-h-screen bg-customBeige bg-opacity-20 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* //Datos del ususario */}
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
            <PetCreateForm setAddingPet={setAddingPet} addingPet={addingPet} />
          )}
        </div>

        {/* //Vista previa de las mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 py-10">
          {/* Left Column - Pet Cards */}
          <div className="space-y-4">
            {pets.map((pet, index) => (
              <div
              key={index}
              className="bg-[#deb887] rounded-2xl pl-4 shadow-lg"
              >
                <PetPreview pet={pet} index={index} />
              </div>
            ))}
          </div>

          {/* //Detalle de la mascota */}
          <PetDetails />
        </div>
      </div>
    </div>
  );
}
}
