"use client";

import { useState } from "react";
import { newPet } from "@/services/servicesPets";
import { useUserStore } from "@/store";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PetFormInputs {
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  isSterilized: string;
  profileImg: string;
  notes: string;
  userId: string;
}

const PetDetails = () => {
  const { userData } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      name: "Molly",
      age: 5,
      birthdate: "2023-10-26",
      animalType: "Perro",
      breed: "Ovejero Alemán",
      sex: "Male",
      notes: "Es muy juguetón y le gusta correr.",
      isSterilized: "Sí",
      profileImg:
        "https://www.veterinariadelbosque.com/images/articulos/th-cachorros.jpg",
      userId: userData?.id,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PetFormInputs> = async (petData) => {
    try {
      console.log(petData);
      // await newPet(petData);
    } catch (error) {
      console.error("Error al crear mascota:", error);
      alert(`Error al crear mascota: ${error}`);
    }
    reset();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="bg-[#deb887] rounded-2xl p-5 px-10 shadow-lg mx-5">
        <div className="space-y-4">
          <img
            src="/Dog.svg"
            alt="user"
            className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto"
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="name"
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
                id="age"
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
                id="animalType"
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
                id="birthdate"
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
                id="breed"
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
                id="sex"
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
                id="isSterilized"
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                disabled={!isEditing}
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
                id="notes"
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
