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

const PetDetails = () => {
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
    console.log("Pet data submitted: ", data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="bg-[#deb887] rounded-2xl p-4 shadow-lg max-w-lg sm:max-w-lg w-full mx-auto">
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

 

          <Controller
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
          />

       

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
      

 
      <button className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition">
          Crear Mascota
        </button>
        </div>
    </form>
  );
};

export default PetDetails;

//!DISABLED//
// "use client";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";

// interface PetFormInputs {
//   name: string;
//   birthDate: number;
//   animalType: string;
//   breed: string;
//   sex: string;
//   notes: string;
//   imgProfile: string;
//   weight: number;
//   isSterilized: boolean;
//   clinicalNotes: string;
// }

// export default function PetRegisterForm() {
//   const { handleSubmit, control, reset } = useForm<PetFormInputs>({
//     defaultValues: {
//       name: "",
//       birthDate: 0,
//       animalType: "",
//       breed: "",
//       sex: "",
//       notes: "",
//       imgProfile: "",
//       weight: 0,
//       isSterilized: false,
//       clinicalNotes: "",
//     },
//     mode: "onChange",
//   });

//   // Estado para controlar si el formulario ha sido enviado
//   const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

//   const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
//     console.log("Pet data submitted: ", data);
//     setIsFormSubmitted(true);  // Cambiar estado a true cuando se envíe el formulario
//     reset();  // Resetear el formulario (opcional)
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="border-none rounded-lg sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
//     >
//       <h1 className="text-3xl text-customBrown">Registro de la Mascota</h1>
//       <p className="mt-4 mb-3">
//         Por favor completa los datos de tu mascota para el registro.
//       </p>

//       {/* Nombre */}
//       <Controller
//         name="name"
//         control={control}
//         rules={{ required: "El nombre de la mascota es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Nombre"
//               aria-label="Nombre"
//               disabled={isFormSubmitted} // Deshabilitar si el formulario fue enviado
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       {/* Fecha de nacimiento */}
//       <Controller
//         name="birthDate"
//         control={control}
//         rules={{ required: "La fecha de nacimiento de la mascota es obligatoria" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <input
//               {...field}
//               type="date"
//               className="customInput"
//               aria-label="Fecha de Nacimiento"
//               disabled={isFormSubmitted} // Deshabilitar si el formulario fue enviado
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       {/* Tipo de animal */}
//       <Controller
//         name="animalType"
//         control={control}
//         rules={{ required: "El tipo de animal es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Tipo de animal" disabled={isFormSubmitted}>
//               <option value="">Tipo de mascota</option>
//               <option value="Perro">Perro</option>
//               <option value="Gato">Gato</option>
//               <option value="Hamster">Hamster</option>
//               <option value="Conejo">Conejo</option>
//               <option value="Aves">Aves</option>
//               <option value="Otros">Otros</option>
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       {/* Raza */}
//       <Controller
//         name="breed"
//         control={control}
//         rules={{ required: "La raza es obligatoria" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Raza"
//               aria-label="Raza"
//               disabled={isFormSubmitted} // Deshabilitar si el formulario fue enviado
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       {/* Sexo */}
//       <Controller
//         name="sex"
//         control={control}
//         rules={{ required: "El sexo es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Sexo" disabled={isFormSubmitted}>
//               <option value="">Sexo</option>
//               <option value="Macho">Macho</option>
//               <option value="Hembra">Hembra</option>
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       {/* Notas */}
//       <Controller
//         name="notes"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <textarea
//               {...field}
//               className="customInput"
//               placeholder="Agregar comentarios clínicos relevantes"
//               aria-label="Agregar comentarios clínicos relevantes"
//               rows={6}  // Establece la altura (número de líneas visibles)
//               cols={50} // Establece el ancho (número de caracteres por línea)
//               disabled={isFormSubmitted} // Deshabilitar si el formulario fue enviado
//             />
//           </div>
//         )}
//       />

//       {/* Botón de submit */}
//       <button type="submit" className="customButton mt-6" disabled={isFormSubmitted}>
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }
