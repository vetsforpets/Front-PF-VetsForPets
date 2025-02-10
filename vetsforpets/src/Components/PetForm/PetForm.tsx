"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PetFormInputs {
  name: string;
  birthDate: number;
  animalType: string;
  breed: string;
  sex: string;
  notes: string;
  imgProfile: string;
  weight: number;
  isSterilized: boolean;
  clinicalNotes: string;
}

export default function PetRegisterForm() {
  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      name: "",
      birthDate: 0,
      animalType: "",
      breed: "",
      sex: "",
      notes: "",
      imgProfile: "",
      weight: 0,
      isSterilized: false,
      clinicalNotes: "",
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
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "El nombre de la mascota es obligatorio" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nombre:
            </label>
            <input
              {...field}
              className="customInput"
              placeholder="Ej: Luna"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="birthDate"
        control={control}
        rules={{ required: "La fecha de nacimiento es obligatoria" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Fecha de Nacimiento:
            </label>
            <input
              {...field}
              type="number"
              className="customInput"
              placeholder="Ej: 3"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="animalType"
        control={control}
        rules={{ required: "El tipo de animal es obligatorio" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tipo de animal:
            </label>
            <select {...field} className="customInput">
              <option value="">Selecciona...</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Conejo">Conejo</option>
              <option value="Otro">Otro</option>
            </select>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="breed"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Raza:</label>
            <input
              {...field}
              className="customInput"
              placeholder="Ej: Labrador"
            />
          </div>
        )}
      />

      <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sexo:</label>
            <select {...field} className="customInput">
              <option value="">Selecciona...</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
        )}
      />

      <Controller
        name="imgProfile"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Imagen de perfil:
            </label>
            <input
              {...field}
              type="text"
              className="customInput"
              placeholder="URL de la imagen"
            />
          </div>
        )}
      />

      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Peso (kg):</label>
            <input
              {...field}
              type="number"
              className="customInput"
              placeholder="Ej: 5.2"
            />
          </div>
        )}
      />

<Controller
  name="isSterilized"
  control={control}
  render={({ field }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">¿Está esterilizado?</label>
      <select
        {...field}
        className="customInput"
        value={field.value ? "true" : "false"} 
      >
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  )}
/>

 

      <Controller
        name="clinicalNotes"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notas clínicas:</label>
            <textarea
              {...field}
              className="customInput"
              placeholder="Notas sobre la salud de la mascota"
            />
          </div>
        )}
      />

      <button type="submit" className="customButton w-full mt-4">
        Registrar Mascota
      </button>
    </form>
  );
}
