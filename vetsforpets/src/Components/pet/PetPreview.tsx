// components/pet/PetPreview.tsx

import React from "react";
import { FaEye } from "react-icons/fa";

export interface Pet {
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: "Male" | "Female";
  isSterilized: boolean;
  notes?: string;
  profileImg?: string;
}

interface PetPreviewProps {
  pet: Pet;
}

const PetPreview: React.FC<PetPreviewProps> = ({ pet }) => {
  return (
    <div className="flex gap-4 ">
      <img
        src={pet.profileImg ? pet.profileImg : "/Cat.svg"}
        alt={pet.name}
        className="w-40 h-40 m-4 rounded-full object-cover shadow-md"
      />

      {/* Pet Information */}
      <div className="py-6">
        <div className="flex-grow space-y-2 ">
          <input
            disabled
            type="text"
            value={pet.name}
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
          />
          <input
            disabled
            type="text"
            value={pet.breed}
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
          />
          <input
            disabled
            type="text"
            value={pet.age}
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
          />
        </div>
      </div>

      {/* Botones en forma vertical */}
      <div className="flex flex-col justify-evenly h-30 py-3 px-3 bg-customLightBrown rounded-2xl">
        <button className="rounded-full hover:bg-customBeige flex items-center justify-center p-2">
          <FaEye size={25} color="black" />
        </button>

        <button className="rounded-2xl hover:bg-customBeige flex items-center justify-center">
          <img
            src="/images/delete.png"
            alt="eliminar"
            className="w-8 h-8 m-2 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default PetPreview;
