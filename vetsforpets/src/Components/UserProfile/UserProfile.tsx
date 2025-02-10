"use client"

import { useState } from "react";
import PetDetails from "../pet/petDetails";
import PetPreview from "../pet/PetPreview";
import UserProfile from "./Profile";

export default function ProfileView() {
  const [pets] = useState([
    { name: "Benito", breed: "Gato", age: "5 años" },
    { name: "Rex", breed: "Perro", age: "2 años" },
    { name: "Milo", breed: "Conejo", age: "1 año" }
  ]);


  return (
    <div className="min-h-screen bg-customBeige bg-opacity-20 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
       
      {/* //!Datos del ususario */}
      <UserProfile
      name="Juan Perez"
      email="juanperez@example.com"
      phone="+54 123 456 789"
      address="Calle Falsa 123, Ciudad"
      city="Buenos Aires"
      profileImage="/Dog.svg" // Puedes cambiarlo por cualquier imagen
      />


        {/* //!Vista previa de las mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 py-10">
          {/* Left Column - Pet Cards */}
          <div className="space-y-4">
            {pets.map((pet, index) => (
              <div key={index} className="bg-[#deb887] rounded-2xl pl-4 shadow-lg">
                <PetPreview pet={pet} index={index} />
              </div>
            ))}
          </div>


          {/* //!Detalle de la mascota */}
          <PetDetails />
        </div>
      </div>
    </div>
  );
}
