"use client";
import { useUserStore } from "@/store";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PetFormInputs {
  name: string;
  age: number;
  birthdate: string;
  animalType: string;
  breed: string;
  sex: string;
  notes: string;
  imgProfile: string;
  isSterilized: string;
  profileImg: string;
  userId: string;
}

export default function PetRegisterForm() {
  const { userData } = useUserStore();

  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      name: "",
      age: 0,
      birthdate: "",
      animalType: "",
      breed: "",
      sex: "",
      notes: "",
      imgProfile: "",
      isSterilized: "",
      profileImg: "",
      userId: userData?.id,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
    console.log("Pet data submitted: ", data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-none rounded-lg sm:w-1/2 mx-auto my-20 pb-10 px-12 sm:px-5 z-10"
    >
      <h1 className="text-3xl text-customBrown">Registro de la Mascota</h1>
      <p className="mt-4 mb-3">
        Por favor completa los datos de tu mascota para el registro.
      </p>

      <div className="mb-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre de la mascota es obligatorio" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                id="name"
                className="customInput"
                placeholder="Escribe el nombre de tu mascota"
                aria-label="Nombre de la Mascota"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="birthDate"
          control={control}
          rules={{
            required: "La fecha de nacimiento de la mascota es obligatoria",
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                id="birthDate"
                type="date"
                className="customInput"
                aria-label="Fecha de Nacimiento"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="animalType"
          control={control}
          rules={{ required: "El tipo de animal es obligatorio" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <select
                {...field}
                id="animalType"
                className="customInput"
                aria-label="Tipo de animal"
              >
                <option value="">Tipo de mascota</option>
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
      </div>

      <div className="mb-4">
        <Controller
          name="breed"
          control={control}
          rules={{ required: "La raza es obligatoria" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                id="breed"
                className="customInput"
                placeholder="Escribe la raza"
                aria-label="Raza"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="sex"
          control={control}
          rules={{ required: "El sexo es obligatorio" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <select
                {...field}
                id="sex"
                className="customInput"
                aria-label="Sexo"
              >
                <option value="">Sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
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
                className="customInput"
                placeholder="Escribe el peso (kg)"
                aria-label="Peso"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="isSterilized"
          control={control}
          render={({ field }) => (
            <div>
              <select
                {...field}
                id="isSterilized"
                className="customInput"
                aria-label="Esterilización"
              >
                <option value="">Selecciona</option>
                <option value="Esterilizado">Esterilizado</option>
                <option value="No esterilizado">No esterilizado</option>
              </select>
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="previousConditions"
          control={control}
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                id="previousConditions"
                className="customInput"
                placeholder="Condiciones previas"
                aria-label="Condiciones previas"
                rows={4}
              />
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                id="notes"
                className="customInput"
                placeholder="Comentarios clínicos"
                aria-label="Comentarios clínicos"
                rows={6}
              />
            </div>
          )}
        />
      </div>

      <button type="submit" className="customButton mt-6">
        Registrar Mascota
      </button>
    </form>
  );
}

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

//   const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
//     console.log("Pet data submitted: ", data);
//     reset();
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
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

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
//               placeholder="Fecha de Nacimiento"
//               aria-label="Fecha de Nacimiento"
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="animalType"
//         control={control}
//         rules={{ required: "El tipo de animal es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Tipo de animal">
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
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="sex"
//         control={control}
//         rules={{ required: "El sexo es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Sexo">
//               <option value="">Sexo</option>
//               <option value="Macho">Macho</option>
//               <option value="Hembra">Hembra</option>
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

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
//             />
//           </div>
//         )}
//       />

//       <button type="submit" className="customButton mt-6">
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }

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

//   const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
//     console.log("Pet data submitted: ", data);
//     reset();
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
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="birthDate"
//         control={control}
//         rules={{ required: "La fecha de nacimiento de la mascota es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <input
//               {...field}
//               type="date"
//               className="customInput"
//               placeholder="Fecha de Nacimiento"
//               aria-label="Fecha de Nacimiento"
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="animalType"
//         control={control}
//         rules={{ required: "El tipo de animal es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Tipo de animal">
//               <option value="">Tipo de mascota</option>
//               <option value="Perro">Perro</option>
//               <option value="Gato">Gato</option>
//               <option value="Gato">Hamster</option>
//               <option value="Gato">Conejo</option>
//               <option value="Gato">Aves</option>
//               <option value="Gato">Otros</option>
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

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
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="sex"
//         control={control}
//         rules={{ required: "El sexo es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <select {...field} className="customInput" aria-label="Sexo">
//               <option value="">Sexo</option>
//               <option value="Macho">Macho</option>
//               <option value="Hembra">Hembra</option>
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//           </div>
//         )}
//       />

// <Controller
//   name="notes"
//   control={control}
//   render={({ field }) => (
//     <div>
//       <textarea
//         {...field}
//         className="customInput"
//         placeholder="Agregar comentarios clínicos relevantes"
//         aria-label="Agregar comentarios clínicos relevantes"
//         rows={6}  // Establece la altura (número de líneas visibles)
//         cols={50} // Establece el ancho (número de caracteres por línea)
//       />
//     </div>
//   )}
// />

//       <button type="submit" className="customButton mt-6">
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }

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

//   const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
//     console.log("Pet data submitted: ", data);
//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
//     >
//       <Controller
//         name="name"
//         control={control}
//         rules={{ required: "El nombre de la mascota es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Nombre de la mascota"
//               aria-label="Nombre de la mascota"
//             />
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="birthDate"
//         control={control}
//         rules={{ required: "Los años de la mascota es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <input
//               {...field}
//               type="number"
//               className="customInput"
//               placeholder="Años de la Mascota"
//               aria-label="Años de la Mascota"
//             />
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="animalType"
//         control={control}
//         rules={{ required: "El tipo de animal es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <select
//               {...field}
//               className="customInput"
//               aria-label="Tipo de animal"
//             >
//               <option value="">Selecciona...</option>
//               <option value="Perro">Perro</option>
//               <option value="Gato">Gato</option>
//               <option value="Ave">Ave</option>
//               <option value="Conejo">Conejo</option>
//               <option value="Otro">Otro</option>
//             </select>
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="breed"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Raza"
//               aria-label="Raza"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         name="sex"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <select {...field} className="customInput" aria-label="Sexo">
//               <option value="">Sexo</option>
//               <option value="Macho">Macho</option>
//               <option value="Hembra">Hembra</option>
//             </select>
//           </div>
//         )}
//       />

//       <Controller
//         name="imgProfile"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <input
//               {...field}
//               type="text"
//               className="customInput"
//               placeholder="URL de la imagen"
//               aria-label="Imagen de perfil"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         name="weight"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <input
//               {...field}
//               type="number"
//               className="customInput"
//               placeholder="Peso (kg)"
//               aria-label="Peso"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         name="isSterilized"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <select
//               {...field}
//               className="customInput"
//               value={field.value ? "true" : "false"}
//               aria-label="¿Está esterilizado?"
//             >
//               <option value="true">Sí</option>
//               <option value="false">No</option>
//             </select>
//           </div>
//         )}
//       />

//       <Controller
//         name="clinicalNotes"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <textarea
//               {...field}
//               className="customInput"
//               placeholder="Notas clínicas"
//               aria-label="Notas clínicas"
//             />
//           </div>
//         )}
//       />

//       <button type="submit" className="customButton w-full mt-4">
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }

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

//   const onSubmit: SubmitHandler<PetFormInputs> = (data) => {
//     console.log("Pet data submitted: ", data);
//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
//     >
//       <Controller
//         name="name"
//         control={control}
//         rules={{ required: "El nombre de la mascota es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Nombre:
//             </label>
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Ej: Luna"
//             />
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="birthDate"
//         control={control}
//         rules={{ required: "La fecha de nacimiento es obligatoria" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Fecha de Nacimiento:
//             </label>
//             <input
//               {...field}
//               type="number"
//               className="customInput"
//               placeholder="Ej: 3"
//             />
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="animalType"
//         control={control}
//         rules={{ required: "El tipo de animal es obligatorio" }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Tipo de animal:
//             </label>
//             <select {...field} className="customInput">
//               <option value="">Selecciona...</option>
//               <option value="Perro">Perro</option>
//               <option value="Gato">Gato</option>
//               <option value="Ave">Ave</option>
//               <option value="Conejo">Conejo</option>
//               <option value="Otro">Otro</option>
//             </select>
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//           </div>
//         )}
//       />

//       <Controller
//         name="breed"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Raza:</label>
//             <input
//               {...field}
//               className="customInput"
//               placeholder="Ej: Labrador"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         name="sex"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Sexo:</label>
//             <select {...field} className="customInput">
//               <option value="">Selecciona...</option>
//               <option value="Macho">Macho</option>
//               <option value="Hembra">Hembra</option>
//             </select>
//           </div>
//         )}
//       />

//       <Controller
//         name="imgProfile"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Imagen de perfil:
//             </label>
//             <input
//               {...field}
//               type="text"
//               className="customInput"
//               placeholder="URL de la imagen"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         name="weight"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Peso (kg):</label>
//             <input
//               {...field}
//               type="number"
//               className="customInput"
//               placeholder="Ej: 5.2"
//             />
//           </div>
//         )}
//       />

// <Controller
//   name="isSterilized"
//   control={control}
//   render={({ field }) => (
//     <div className="mb-4">
//       <label className="block text-sm font-medium mb-1">¿Está esterilizado?</label>
//       <select
//         {...field}
//         className="customInput"
//         value={field.value ? "true" : "false"}
//       >
//         <option value="true">Sí</option>
//         <option value="false">No</option>
//       </select>
//     </div>
//   )}
// />

//       <Controller
//         name="clinicalNotes"
//         control={control}
//         render={({ field }) => (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Notas clínicas:</label>
//             <textarea
//               {...field}
//               className="customInput"
//               placeholder="Notas sobre la salud de la mascota"
//             />
//           </div>
//         )}
//       />

//       <button type="submit" className="customButton w-full mt-4">
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }
