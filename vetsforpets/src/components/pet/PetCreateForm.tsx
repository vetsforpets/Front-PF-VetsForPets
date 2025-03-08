"use client";

import { newPet } from "@/services/servicesPets";
import { useUserStore } from "@/store";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CloudinaryUploader from "../Cloudinary/Cloudinary";

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
}
interface petCreateFormProps {
  setAddingPet?: React.Dispatch<React.SetStateAction<boolean>>;
  addingPet: boolean;
  setReloadPets: React.Dispatch<React.SetStateAction<boolean>>;
  onPetCreated: () => void;
}

const PetCreateForm: React.FC<petCreateFormProps> = ({
  setAddingPet,
  addingPet,
  setReloadPets,
  onPetCreated,
}) => {
  const { userData } = useUserStore();

  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      name: "",
      age: undefined,
      birthdate: "",
      animalType: "",
      breed: "",
      sex: "",
      notes: "",
      isSterilized: false,
      profileImg: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PetFormInputs> = async (petData) => {
    try {
      await newPet(petData, userData?.token);
      toast.success("Mascota creada con éxito", {
        duration: 3000,
        style: {
          color: "#155724",
          background: "#d4edda",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #c3e6cb",
        },
      });

      setReloadPets((prev) => !prev);
      if (setAddingPet) setAddingPet(false);
      onPetCreated();
    } catch (error) {
      console.error("Error al crear mascota:", error);
      toast.error("Error al crear la mascota", {
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
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="bg-[#deb887] rounded-2xl shadow-lg mx-auto p-4 sm:p-6 md:p-8 lg:p-14 max-w-full">
        {addingPet && (
          <button
            onClick={() => {
              if (setAddingPet) setAddingPet(!addingPet);
            }}
            className="self-end"
          >
            <Image
              className="w-4 h-4"
              width={1920}
              height={500}
              src="/images/cross.png"
              alt="Cerrar"
            />
          </button>
        )}

        <div className="space-y-4">
          <Controller
            name="profileImg"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Imagen de perfil obligatoria",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="flex items-center justify-center gap-4 mb-5">
                <label className="flex items-center justify-between">
                  <p className="mr-4 whitespace-nowrap">Imagen de perfil</p>
                  <CloudinaryUploader
                    onImageUpload={(url) => field.onChange(url)}
                  />
                </label>

                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{ required: "El nombre de la mascota es obligatorio" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  id="name"
                  className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
                  placeholder="Nombre"
                  aria-label="Nombre de la Mascota"
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="animalType"
            control={control}
            rules={{ required: "El tipo de animal es obligatorio" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  {...field}
                  id="animalType"
                  className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                  aria-label="Tipo de animal"
                >
                  <option value="" disabled hidden>
                    Especie
                  </option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Aves">Ave</option>
                  <option value="Otros">Otros</option>
                </select>
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="birthdate"
            control={control}
            rules={{ required: "La fecha de nacimiento es obligatoria" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  type="date"
                  id="birthdate"
                  className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
                  aria-label="Fecha de nacimiento"
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error.message}</p>
                )}
              </div>
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
                placeholder="Raza"
                className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
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
                  value={
                    value === true ? "true" : value === false ? "false" : ""
                  }
                  onChange={(e) => onChange(e.target.value === "true")}
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
          /> */}

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="notes"
                className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                placeholder="Comentarios adicionales"
                aria-label="Comentarios adicionales"
                rows={4}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="self-end w-full px-6 py-2 mt-6 text-white transition bg-customBrown rounded-2xl hover:bg-opacity-90 sm:w-auto"
        >
          Crear Mascota
        </button>
      </div>
    </form>
  );
};

export default PetCreateForm;
