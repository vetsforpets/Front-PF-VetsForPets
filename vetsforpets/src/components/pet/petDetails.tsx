"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Pet } from "./PetPreview";
import { editPet } from "@/services/servicesPets";
import { toast } from "sonner";
import Image from "next/image";
import CloudinaryUploader from "../Cloudinary/Cloudinary";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

interface PetFormInputs {
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  isSterilized: boolean;
  profileImg: string;
  notes: string;
  userId: string;
}

interface PetDetailsProps {
  pet: Pet;
  token?: string;
  onUpdatePet: (updatedPet: Pet) => void;
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet, token, onUpdatePet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petData, setPetData] = useState<Pet>(pet);

  const { handleSubmit, control, reset, setValue } = useForm<PetFormInputs>({
    defaultValues: pet,
    mode: "onChange",
  });

  useEffect(() => {
    setPetData(pet);
  }, [pet]);

  useEffect(() => {
    if (pet) {
      reset(pet);
    }
  }, [pet, reset]);

  const handleImageUpload = (imageUrl: string) => {
    setValue("profileImg", imageUrl);
  };

  const onSubmit: SubmitHandler<PetFormInputs> = async (updatedPet) => {
    setLoading(true);
    setIsModalOpen(false);
    try {
      const response = await editPet(pet.id, updatedPet, token);
      if (response.success) {
        const updatedPetWithId = { ...updatedPet, id: pet.id };
        setPetData(updatedPetWithId);
        reset(updatedPetWithId);
        onUpdatePet(updatedPetWithId);
        toast.success("Mascota actualizada", {
          duration: 3000,
          style: {
            color: "#155724",
            background: "#d4edda",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #c3e6cb",
          },
        });
      } else {
        toast.error("Error al editar la mascota", {
          duration: 3000,
          style: {
            color: "#dc3545",
            background: "#f8d7da",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #f5c6cb",
          },
        });
      }
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      alert("Error al actualizar mascota");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="bg-[#deb887] rounded-2xl p-5 px-10 shadow-lg mx-5">
        <div className="space-y-4">
          {isEditing ? (
            <div className="flex flex-col items-center">
              <CloudinaryUploader onImageUpload={handleImageUpload} />
            </div>
          ) : (
            <Image
              src={petData.profileImg || "/Cat.svg"}
              alt="Perfil"
              width={1920}
              height={500}
              className="object-cover w-40 h-40 mx-auto rounded-full shadow-lg"
            />
          )}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
                placeholder="Nombre"
                disabled={!isEditing}
              />
            )}
          />

          <div className="flex items-center w-full h-12 px-3 py-2 rounded-2xl bg-customBeige">
            {calculateAge(petData.birthdate)} años
          </div>

          <Controller
            name="animalType"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border-none rounded-2xl disabled:opacity-100 bg-customBeige"
                disabled={!isEditing}
              >
                <option value="">Especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Hamster">Hamster</option>
                <option value="Conejo">Conejo</option>
                <option value="Aves">Aves</option>
                <option value="Otros">Otros</option>
              </select>
            )}
          />

          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
                disabled={!isEditing}
              />
            )}
          />

          <Controller
            name="breed"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                placeholder="Raza"
                disabled={!isEditing}
              />
            )}
          />

          <Controller
            name="sex"
            control={control}
            rules={{ required: "El sexo es obligatorio" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  {...field}
                  id="sex"
                  className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                  aria-label="Sexo"
                >
                  <option value="" disabled hidden>
                    Sexo
                  </option>
                  <option value="Male">Macho</option>
                  <option value="Female">Hembra</option>
                </select>
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />

          {/* <Controller
            name="isSterilized"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border-none rounded-2xl disabled:opacity-100 bg-customBeige"
                disabled={!isEditing}
                value={field.value ? "true" : "false"}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <option value="true">Esterilizado: Sí</option>
                <option value="false">Esterilizado: No</option>
              </select>
            )}
          /> */}

          <Controller
            name="isSterilized"
            control={control}
            rules={{ required: "Debe seleccionar si está esterilizado o no" }}
            render={({
              field: { onChange, value, ...restField },
              fieldState: { error },
            }) => (
              <div>
                <select
                  {...restField}
                  id="isSterilized"
                  className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                  aria-label="Esterilización"
                  value={value !== undefined ? String(value) : ""}
                  onChange={(e) =>
                    onChange(
                      e.target.value === "true"
                        ? true
                        : e.target.value === "false"
                        ? false
                        : undefined
                    )
                  }
                >
                  <option value="" disabled hidden>
                    Esterilizado?
                  </option>
                  <option value="true">Esterilizado: Sí</option>
                  <option value="false">Esterilizado: No</option>
                </select>
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                placeholder="Comentarios adicionales"
                rows={4}
                disabled={!isEditing}
              />
            )}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="self-end px-6 py-2 mt-6 text-white transition bg-customBrown rounded-2xl hover:bg-opacity-90"
            onClick={() => setIsEditing((prev) => !prev)}
            disabled={loading}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="self-end px-6 py-2 mt-6 text-white transition bg-customGreen rounded-2xl hover:bg-opacity-90"
              onClick={() => setIsModalOpen(true)}
            >
              Guardar Cambios
            </button>
          )}

          <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={() => {
              setIsModalOpen(false);
              handleSubmit(onSubmit)();
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </form>
  );
};

export default PetDetails;
