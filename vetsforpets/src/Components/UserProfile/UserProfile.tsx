"use client"

import { useState } from "react";
import PetDetails from "../pet/petDetails";
import PetPreview from "../pet/PetPreview";
import Profile from "./Profile";

interface PetFormInputs {
  name: string;
  birthDate: string;
  animalType: string;
  breed: string;
  sex: string;
  notes: string;
  imgProfile: string;
  weight: string;
  isSterilized: string;
  clinicalNotes: string;
  previousConditions: string;
}



export default function ProfileView() {
  const [user, setUser] = useState()
  const [formPet, setFormPet] = useState(false)
  const [pets] = useState([
    { name: "Benito", breed: "Gato", age: "5 años" },
    { name: "Rex", breed: "Perro", age: "2 años" },
    { name: "Milo", breed: "Conejo", age: "1 año" }
  ]);


  const onClickButtonCreatePet =  () =>{
    setFormPet(!formPet)
  } 

  return (
    <div className="min-h-screen bg-customBeige bg-opacity-20 p-4">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* //!Datos del ususario */}
        <Profile/>
  <div className="flex justify-center">
        {!formPet && <button onClick={onClickButtonCreatePet} className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition">
          Agregar Mascota
        </button> }
        {formPet && <PetDetails setFormPet={setFormPet} formPet={formPet}/>}
  </div>

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
