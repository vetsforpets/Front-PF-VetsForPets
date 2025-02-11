// components/PetDetails.js
"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

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
interface petDetailProps {
  setFormPet?: React.Dispatch<React.SetStateAction<boolean>>;
  formPet?: boolean;
}

const PetDetails: React.FC<petDetailProps> = ({setFormPet, formPet}) => {
  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      name: "",
      birthDate: "",
      animalType: "",
      breed: "",
      sex: "",
      notes: "",
      imgProfile: "",
      weight: "",
      isSterilized: "",
      clinicalNotes: "",
      previousConditions: "",
    },
    mode: "onChange", 
  });

  const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
    if (!!setFormPet) {
      setFormPet(!formPet)
    }
    console.log("Pet data submitted: ", data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="bg-[#deb887] rounded-2xl p-4 shadow-lg max-w-lg sm:max-w-lg w-full mx-auto">
        {formPet && <button onClick={()=>{
        if (!!setFormPet) {
          setFormPet(!formPet)
        }
      }}>
        <img className="h-4 w-4" src="images/cross.png" alt="" />
      </button>}
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
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
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
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
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
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />


          {/* Fecha de Nacimiento */}
          {/* <Controller
            name="birthDate"
            control={control}
            rules={{ required: "La fecha de nacimiento de la mascota es obligatoria" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  id="birthDate"
                  type="date"
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Fecha de Nacimiento"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          /> */}

 

          {/* <Controller
            name="weight"
            control={control}
            rules={{ required: "El peso es obligatorio" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  id="weight"
                  type="text"
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  placeholder="Peso (kg)"
                  aria-label="Peso"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          /> */}

       

          <Controller
            name="isSterilized"
            control={control}
            render={({ field }) => (
              <div>
                <select
                  {...field}
                  id="isSterilized"
                  className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                  aria-label="Esterilización"
                >
                  <option value="" disabled hidden>
                    Esterilizado
                  </option>
                  <option value="Esterilizado">Esterilizado: Sí</option>
                  <option value="No esterilizado">Esterilizado: No</option>
                </select>
              </div>
            )}
          />

     

          <Controller
            name="previousConditions"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="previousConditions"
                className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
                placeholder="Condiciones previas"
                aria-label="Condiciones previas"
                rows={4}
              />
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
      

 
      <button type="submit" className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition">
          Crear Mascota
        </button>
        </div>
    </form>
  );
};

export default PetDetails;

