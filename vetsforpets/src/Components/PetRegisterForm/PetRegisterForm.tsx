"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PetFormInputs {
  petName: string;
  ownerName: string;
  age: number;
  animalType: string;
  breed: string;
  color: string;
  sex: string;
  birthDate: string;
  notes: string;
}

export default function PetRegisterForm() {
  const { handleSubmit, control, reset } = useForm<PetFormInputs>({
    defaultValues: {
      petName: "",
      ownerName: "",
      age: 0,
      animalType: "",
      breed: "",
      color: "",
      sex: "",
      birthDate: "",
      notes: "",
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
        name="petName"
        control={control}
        rules={{ required: "El nombre de la mascota es obligatorio" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nombre de la mascota:
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
        name="ownerName"
        control={control}
        rules={{ required: "El nombre del tutor es obligatorio" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nombre del tutor:
            </label>
            <input
              {...field}
              className="customInput"
              placeholder="Ej: Juan Pérez"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        name="age"
        control={control}
        rules={{ required: "La edad es obligatoria" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Edad:</label>
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
            <input {...field} className="customInput" placeholder="Ej: Labrador" />
          </div>
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color:</label>
            <input {...field} className="customInput" placeholder="Ej: Negro" />
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
        name="birthDate"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Fecha de nacimiento:
            </label>
            <input {...field} type="date" className="customInput" />
          </div>
        )}
      />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notas:</label>
            <textarea
              {...field}
              className="customInput"
              placeholder="Ej: Vacunado, castrado, etc."
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
