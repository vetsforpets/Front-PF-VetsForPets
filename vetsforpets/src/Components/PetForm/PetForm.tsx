// "use client";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";

// interface PetFormInputs {
//   name: string;
//   birthDate: string; 
//   animalType: string;
//   breed: string;
//   sex: string;
//   notes: string;
//   imgProfile: string;
//   weight: string; 
//   isSterilized: string; 
//   clinicalNotes: string;
//   previousConditions: string;
// }

// export default function PetRegisterForm() {
//   const { handleSubmit, control, reset } = useForm<PetFormInputs>({
//     defaultValues: {
//       name: "",
//       birthDate: "",
//       animalType: "",
//       breed: "",
//       sex: "",
//       notes: "",
//       imgProfile: "",
//       weight: "",
//       isSterilized: "",
//       clinicalNotes: "",
//       previousConditions: "",
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

//       <div className="mb-4">
//         <Controller
//           name="name"
//           control={control}
//           rules={{ required: "El nombre de la mascota es obligatorio" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <input
//                 {...field}
//                 id="name"
//                 className="customInput"
//                 placeholder="Escribe el nombre de tu mascota"
//                 aria-label="Nombre de la Mascota"
//               />
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="birthDate"
//           control={control}
//           rules={{ required: "La fecha de nacimiento de la mascota es obligatoria" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <input
//                 {...field}
//                 id="birthDate"
//                 type="date"
//                 className="customInput"
//                 aria-label="Fecha de Nacimiento"
//               />
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="animalType"
//           control={control}
//           rules={{ required: "El tipo de animal es obligatorio" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <select {...field} id="animalType" className="customInput" aria-label="Tipo de animal">
//                 <option value="">Tipo de mascota</option>
//                 <option value="Perro">Perro</option>
//                 <option value="Gato">Gato</option>
//                 <option value="Hamster">Hamster</option>
//                 <option value="Conejo">Conejo</option>
//                 <option value="Aves">Aves</option>
//                 <option value="Otros">Otros</option>
//               </select>
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="breed"
//           control={control}
//           rules={{ required: "La raza es obligatoria" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <input
//                 {...field}
//                 id="breed"
//                 className="customInput"
//                 placeholder="Escribe la raza"
//                 aria-label="Raza"
//               />
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="sex"
//           control={control}
//           rules={{ required: "El sexo es obligatorio" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <select {...field} id="sex" className="customInput" aria-label="Sexo">
//                 <option value="">Sexo</option>
//                 <option value="Macho">Macho</option>
//                 <option value="Hembra">Hembra</option>
//               </select>
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="weight"
//           control={control}
//           rules={{ required: "El peso es obligatorio" }}
//           render={({ field, fieldState: { error } }) => (
//             <div>
//               <input
//                 {...field}
//                 id="weight"
//                 type="text"
//                 className="customInput"
//                 placeholder="Escribe el peso (kg)"
//                 aria-label="Peso"
//               />
//               {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//             </div>
//           )}
//         />
//       </div>

//       {/* <div className="mb-4">  //!dato brindado por el veterinario//
//         <Controller
//           name="isSterilized"
//           control={control}
//           render={({ field }) => (
//             <div>
//               <select {...field} id="isSterilized" className="customInput" aria-label="Esterilización">
//                 <option value="">Selecciona</option>
//                 <option value="Esterilizado">Esterilizado</option>
//                 <option value="No esterilizado">No esterilizado</option>
//               </select>
//             </div>
//           )}
//         />
//       </div> */}

//       <div className="mb-4">
//         <Controller
//           name="previousConditions"
//           control={control}
//           render={({ field }) => (
//             <div>
//               <textarea
//                 {...field}
//                 id="previousConditions"
//                 className="customInput"
//                 placeholder="Condiciones previas"
//                 aria-label="Condiciones previas"
//                 rows={4}
//               />
//             </div>
//           )}
//         />
//       </div>

//       <div className="mb-4">
//         <Controller
//           name="notes"
//           control={control}
//           render={({ field }) => (
//             <div>
//               <textarea
//                 {...field}
//                 id="notes"
//                 className="customInput"
//                 placeholder="Comentarios clínicos"
//                 aria-label="Comentarios clínicos"
//                 rows={6}
//               />
//             </div>
//           )}
//         />
//       </div>

//       <button type="submit" className="customButton mt-6">
//         Registrar Mascota
//       </button>
//     </form>
//   );
// }
