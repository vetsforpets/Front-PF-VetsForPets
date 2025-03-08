"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Pet } from "./PetPreview";
import { editPet } from "@/services/servicesPets";
import { toast } from "sonner";
import Image from "next/image";
import CloudinaryUploader from "../Cloudinary/Cloudinary";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

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
  medicalRecord: string;
}

interface PetDetailsProps {
  pet: Pet;
  token?: string;
  onUpdatePet: (updatedPet: Pet) => void;
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet, token, onUpdatePet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petData, setPetData] = useState<Pet>(pet);
  // Estado para el modal de la libreta sanitaria
  const [isMedicalModalOpen, setMedicalModalOpen] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm<PetFormInputs>({
    defaultValues: pet,
    mode: "onChange",
  });

  useEffect(() => {
    setPetData(pet);
  }, [pet]);

  useEffect(() => {
    if (pet) {
      reset(pet);
    }
  }, [pet, reset]);

  const handleImageUpload = (imageUrl: string) => {
    setValue("profileImg", imageUrl);
  };

  const handleMedicalUpload = (imageUrl: string) => {
    setValue("medicalRecord", imageUrl);
  };

  const onSubmit: SubmitHandler<PetFormInputs> = async (updatedPet) => {
    setLoading(true);
    setIsModalOpen(false);
    try {
      const response = await editPet(pet.id, updatedPet, token);
      if (response.success) {
        const updatedPetWithId = { ...updatedPet, id: pet.id };
        setPetData(updatedPetWithId);
        reset(updatedPetWithId);
        onUpdatePet(updatedPetWithId);
        toast.success("Mascota actualizada", {
          duration: 3000,
          style: {
            color: "#155724",
            background: "#d4edda",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #c3e6cb",
          },
        });
      } else {
        toast.error("Error al editar la mascota", {
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
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      alert("Error al actualizar mascota");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="bg-[#deb887] rounded-2xl p-5 px-10 shadow-lg mx-5">
          <div className="space-y-4">
            {isEditing ? (
              <div className="flex flex-col items-center space-y-6">
                {/* Subir imagen de perfil */}
                <div className="flex flex-col items-center">
                  <span className="mb-3 font-bold">
                    ¿Deseas actualizar la imagen de perfil?
                  </span>
                  <div className="mb-4">
                    <CloudinaryUploader
                      onImageUpload={handleImageUpload}
                      inputId="profile-img-input"
                    />
                  </div>
                </div>
                {/* Subir estudio médico */}
                <div className="flex flex-col items-center">
                  <span className="mb-3 font-bold">
                    Subir libreta sanitaria
                  </span>
                  <div className="mb-4">
                    <CloudinaryUploader
                      onImageUpload={handleMedicalUpload}
                      inputId="medical-record-input"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Vista de no edición: imagen de perfil y libreta sanitaria, una al lado de la otra.
              <div className="flex flex-row items-center justify-center space-x-6">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold">Imagen de Perfil</h3>
                  <Image
                    src={petData.profileImg || "/Cat.svg"}
                    alt={`Imagen de ${petData.name}`}
                    width={200}
                    height={200}
                    className="object-cover w-40 h-40 rounded-full shadow-lg"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold">Libreta Sanitaria</h3>
                  <div className="flex flex-col items-center">
                    {petData.medicalRecord ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setMedicalModalOpen(true);
                        }}
                        className="block"
                      >
                        <Image
                          src={petData.medicalRecord}
                          alt={`Estudio médico de ${petData.name}`}
                          width={200}
                          height={200}
                          className="object-cover w-40 h-40 rounded-full shadow-lg"
                        />
                      </a>
                    ) : (
                      <p className="text-center text-gray-600">
                        Aún no agregada
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
                  placeholder="Nombre"
                  disabled={!isEditing}
                />
              )}
            />
            <div className="flex items-center w-full h-12 px-3 py-2 rounded-2xl bg-customBeige">
              {calculateAge(petData.birthdate)} años
            </div>
            <Controller
              name="animalType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border-none rounded-2xl disabled:opacity-100 bg-customBeige"
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
                  className="w-full h-12 px-3 py-2 border-none rounded-2xl bg-customBeige"
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
                  className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                  placeholder="Raza"
                  disabled={!isEditing}
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
                    value={value !== undefined ? String(value) : ""}
                    onChange={(e) =>
                      onChange(
                        e.target.value === "true"
                          ? true
                          : e.target.value === "false"
                          ? false
                          : undefined
                      )
                    }
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
                  className="w-full px-3 py-2 border-none rounded-2xl bg-customBeige"
                  placeholder="Comentarios adicionales"
                  rows={4}
                  disabled={!isEditing}
                />
              )}
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="self-end px-6 py-2 mt-6 text-white transition bg-customBrown rounded-2xl hover:bg-opacity-90"
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={loading}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="self-end px-6 py-2 mt-6 text-white transition bg-customGreen rounded-2xl hover:bg-opacity-90"
                onClick={() => setIsModalOpen(true)}
              >
                Guardar Cambios
              </button>
            )}
            <ConfirmModal
              isOpen={isModalOpen}
              onConfirm={() => {
                setIsModalOpen(false);
                handleSubmit(onSubmit)();
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </form>

      {/* Modal para mostrar la libreta sanitaria en grande */}
      {isMedicalModalOpen && petData.medicalRecord && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-80"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMedicalModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-3xl p-4 mx-4 bg-white rounded-lg">
            <button
              type="button"
              onClick={() => setMedicalModalOpen(false)}
              className="absolute text-2xl font-bold text-gray-700 top-2 right-2"
            >
              ×
            </button>
            <Image
              src={petData.medicalRecord}
              alt={`Estudio médico de ${petData.name}`}
              width={800}
              height={800}
              className="object-contain w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PetDetails;
