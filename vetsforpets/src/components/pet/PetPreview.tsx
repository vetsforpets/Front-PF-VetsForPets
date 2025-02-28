import { useUserStore } from "@/store";
import React from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "sonner";
import { deletePet } from "@/services/servicesPets";
import Image from "next/image";

export interface Pet {
  id: string;
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  isSterilized: boolean;
  notes?: string;
  profileImg?: string;
}

interface PetPreviewProps {
  pet: Pet;
  onSelectPet: (pet: Pet) => void;
  setReloadPets: React.Dispatch<React.SetStateAction<boolean>>;
}

const PetPreview: React.FC<PetPreviewProps> = ({
  pet,
  onSelectPet,
  setReloadPets,
}) => {
  const { userData } = useUserStore();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      `¿Está seguro que desea eliminar esta mascota? No podrá deshacer los cambios.`
    );
    if (confirmed) {
      const { success, error } = await deletePet(id, userData?.token);
      if (success) {
        toast.success("Mascota eliminada con éxito", {
          style: {
            color: "#0c5460",
            background: "#d1ecf1",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #bee5eb",
          },
          duration: 3000,
        });
        setReloadPets((prev) => !prev);
      } else {
        toast.error(`Error: ${error}`, {
          style: {
            color: "#721c24",
            background: "#f8d7da",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #f5c6cb",
          },
          duration: 3000,
        });
      }
    } else {
      console.log("Cancelado");
    }
  };

  return (
    <div className="flex gap-4 ">
      <Image
        src={pet.profileImg || "/Cat.svg"}
        alt={pet.name}
        width={1920}
        height={500}
        className="object-cover w-40 h-40 m-4 rounded-full shadow-md"
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
            value={pet.animalType}
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
      <div className="flex flex-col px-3 py-3 justify-evenly h-30 bg-customLightBrown rounded-2xl">
        <button
          onClick={() => onSelectPet(pet)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-customBeige"
        >
          <FaEye size={25} color="black" />
        </button>

        <button className="flex items-center justify-center rounded-2xl hover:bg-customBeige">
          <Image
            src="/images/delete.png"
            alt="eliminar"
            width={1920}
            height={500}
            className="w-8 h-8 m-2 rounded-full"
            onClick={() => handleDelete(pet.id)}
          />
        </button>
      </div>
    </div>
  );
};

export default PetPreview;
