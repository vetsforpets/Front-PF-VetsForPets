"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Pet } from "./PetPreview";

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
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: pet, // Ahora usa los valores de `pet`
    mode: "onChange",
  });

  // 🔥 UseEffect para actualizar el formulario cuando `pet` cambia
  useEffect(() => {
    if (pet) {
      reset(pet);
    }
  }, [pet, reset]);

  const onSubmit: SubmitHandler<PetFormInputs> = async (petData) => {
    try {
      console.log(petData);
      // await newPet(petData);
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      alert(`Error al actualizar mascota: ${error}`);
    }
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="bg-[#deb887] rounded-2xl p-5 px-10 shadow-lg mx-5">
        <div className="space-y-4">
          <img
            src={pet.profileImg || "/Cat.svg"}
            alt={pet.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto"
          />

          {/* 🔹 Todos los inputs ahora se llenan con `pet` automáticamente */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Nombre"
                disabled={!isEditing}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Edad"
                disabled={!isEditing}
              />
            )}
          />

          <Controller
            name="animalType"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
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
                className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
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
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Raza"
                disabled={!isEditing}
              />
            )}
          />

          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                disabled={!isEditing}
              >
                <option value="">Sexo</option>
                <option value="Male">Macho</option>
                <option value="Female">Hembra</option>
              </select>
            )}
          />

          <Controller
            name="isSterilized"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                disabled={!isEditing}
                value={field.value ? "true" : "false"} // ✅ Convertir `boolean` a `string`
                onChange={(e) => field.onChange(e.target.value === "true")} // ✅ Convertir `string` a `boolean`
              >
                <option value="true">Esterilizado: Sí</option>
                <option value="false">Esterilizado: No</option>
              </select>
            )}
          />

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Comentarios adicionales"
                rows={4}
                disabled={!isEditing}
              />
            )}
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          {isEditing && (
            <button
              type="submit"
              className="mt-6 self-end bg-customGreen text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition"
            >
              Guardar Cambios
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PetDetails;
