"use client";

import { newPet } from "@/services/servicesPets";
import { useUserStore } from "@/store";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
}
interface petDetailProps {
  setAddingPet?: React.Dispatch<React.SetStateAction<boolean>>;
  addingPet: boolean;
}

const PetDetails: React.FC<petDetailProps> = ({ setAddingPet, addingPet }) => {
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
      isSterilized: "",
      profileImg:
        "https://www.veterinariadelbosque.com/images/articulos/th-cachorros.jpg",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PetFormInputs> = async (petData) => {
    try {
      console.log(petData);
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
      <div className="bg-[#deb887] rounded-2xl p-4 shadow-lg w-1/3 mx-auto">
        {addingPet && (
          <button
            onClick={() => {
              if (!!setAddingPet) {
                setAddingPet(!addingPet);
              }
            }}
          >
            <img className="h-4 w-4" src="images/cross.png" alt="" />
          </button>
        )}
        <div className="space-y-4">
          <img
            src="/Dog.svg"
            alt="user"
            className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto"
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
                  className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
                  placeholder="Nombre"
                  aria-label="Nombre de la Mascota"
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="age"
            control={control}
            rules={{
              required: "La edad de la mascota es obligatoria",
              min: { value: 0, message: "La edad no puede ser negativa" },
            }}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => (
              <div>
                <input
                  {...field}
                  id="age"
                  type="number"
                  className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
                  placeholder="Edad"
                  aria-label="Edad de la Mascota"
                  value={value !== undefined ? value : ""} // Evita el error de undefined
                  onChange={(e) => {
                    const newValue =
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value);
                    onChange(newValue);
                  }}
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
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
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Tipo de animal"
                >
                  <option value="" disabled hidden>
                    Especie
                  </option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Aves">Aves</option>
                  <option value="Otros">Otros</option>
                </select>
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="birthdate"
            control={control}
            rules={{ required: "La fecha de nacimiento es obligatoria" }}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => (
              <div>
                <input
                  {...field}
                  type="date" // Asegura que el input devuelva una fecha válida en formato YYYY-MM-DD
                  id="birthdate"
                  className="w-full h-12 px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Fecha de nacimiento"
                  value={value ? value.split("T")[0] : ""} // Asegura que se vea en el formato correcto
                  onChange={(e) => onChange(e.target.value)} // Normaliza la salida
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
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
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
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
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Sexo"
                >
                  <option value="" disabled hidden>
                    Sexo
                  </option>
                  <option value="Male">Macho</option>
                  <option value="Female">Hembra</option>
                </select>
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="isSterilized"
            control={control}
            rules={{ required: "Debe seleccionar si está esterilizado o no" }}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => (
              <div>
                <select
                  {...field}
                  id="isSterilized"
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Esterilización"
                  value={value !== undefined ? String(value) : ""}
                  onChange={(e) => onChange(e.target.value === "true")}
                >
                  <option value="" disabled hidden>
                    Esterilizado
                  </option>
                  <option value="true">Esterilizado: Sí</option>
                  <option value="false">Esterilizado: No</option>
                </select>
                {error && (
                  <p className="text-red-500 text-xs mt-1">{error.message}</p>
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
                id="notes"
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Comentarios adicionales"
                aria-label="Comentarios adicionales"
                rows={4}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition"
        >
          Crear Mascota
        </button>
      </div>
    </form>
  );
};

export default PetDetails;
