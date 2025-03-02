import { useState, useEffect } from "react";
import { IVetCredentials } from "@/services/interfaces";
import Image from "next/image";
import ScheduledAppointments from "../Calendar/ScheduledAppointments";
import { updatePetshop } from "@/services/servicesVet";
import CloudinaryUploader from "../Cloudinary/Cloudinary";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { toast } from "sonner";
import LocationSearch from "../Maps/Search";

interface DashboardUIProps {
  veterinaria: IVetCredentials;
  token: string;
}

interface VetDetailProps {
  label: string;
  value: string;
  field: keyof IVetCredentials;
  isEditing: boolean;
  editableVet: IVetCredentials | null;
  handleChange: (field: keyof IVetCredentials, value: string | number) => void;
}

const VetDetail = ({
  label,
  value,
  field,
  isEditing,
  editableVet,
  handleChange,
}: VetDetailProps) => {
  const sanitizedValue =
    typeof editableVet?.[field] === "boolean"
      ? editableVet?.[field]
        ? "true"
        : "false"
      : Array.isArray(editableVet?.[field])
      ? JSON.stringify(editableVet?.[field])
      : editableVet?.[field] ?? "";

  return (
    <div>
      <h2 className="py-1 pl-4 font-semibold text-customBrown">{label}</h2>
      {isEditing ? (
        <input
          className="py-3 pl-4 text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
          type="text"
          value={sanitizedValue}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <p className="py-3 pl-4 text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96">
          {value}
        </p>
      )}
    </div>
  );
};

const VetProfile = ({ veterinaria, token }: DashboardUIProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableVet, setEditableVet] = useState<IVetCredentials | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [veterinariaState, setVeterinaria] =
    useState<IVetCredentials>(veterinaria);

  useEffect(() => {
    setEditableVet(veterinaria);
    setVeterinaria(veterinaria);
  }, [veterinaria]);

  console.log("Ubicación en veterinariaState:", veterinariaState.location);
  console.log("Ubicación en veterinariaState:", veterinariaState);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableVet({ ...veterinaria });
    }
  };

  const handleSave = async () => {
    if (editableVet) {
      const validLicenseNumber =
        editableVet.licenseNumber && !isNaN(Number(editableVet.licenseNumber))
          ? Number(editableVet.licenseNumber)
          : veterinaria.licenseNumber;

      const updatedVet = { ...editableVet, licenseNumber: validLicenseNumber };

      console.log("Datos enviados al actualizar la veterinaria:", updatedVet);

      try {
        const response = await updatePetshop(veterinaria.id, updatedVet, token);
        console.log("Veterinaria actualizada:", response);

        setVeterinaria(updatedVet);
        setEditableVet(updatedVet);

        toast.success("Perfil editado con éxito", {
          duration: 3000,
          style: {
            color: "#155724",
            background: "#d4edda",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #c3e6cb",
          },
        });

        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleChange = (
    field: keyof IVetCredentials,
    value: string | number
  ) => {
    if (editableVet) {
      setEditableVet((prev) => ({
        ...prev!,
        [field]: field === "licenseNumber" ? Number(value) || "" : value,
      }));
    }
  };

  const handleImageUpload = (url: string) => {
    if (editableVet) {
      setEditableVet({ ...editableVet, imgProfile: url });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    handleSave();
    handleCloseModal();
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    if (editableVet) {
      setEditableVet((prev) => ({
        ...prev!,
        location: [{ latitude: lat, longitude: lon }],
      }));
    }
  };

  useEffect(() => {
    console.log("Datos recibidos en veterinaria:", veterinaria);
    setEditableVet(veterinaria);
    setVeterinaria(veterinaria);
  }, [veterinaria]);
  


  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mt-6 mb-6 text-3xl font-bold text-center">
        Perfil de Veterinaria
      </h1>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 rounded-2xl place-items-center">
        <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">
          {isEditing ? (
            <div className="flex flex-col items-center">
              <CloudinaryUploader onImageUpload={handleImageUpload} />
            </div>
          ) : (
            <Image
              src={veterinariaState?.imgProfile || "/Generic avatar.png"}
              alt="Perfil"
              width={1920}
              height={500}
              className="object-cover w-40 h-40 rounded-full shadow-md"
            />
          )}
          <button
            className="absolute px-1 py-2 transition rounded-full top-2 right-2 hover:bg-customBrown"
            onClick={handleEdit}
          >
            <Image
              src="/images/icon.png"
              width={1920}
              height={500}
              alt="editar"
              className="w-10 m-2 h-7"
            />
          </button>
          <h2 className="px-4 py-2 mt-4 text-3xl font-bold rounded-lg text-DarkGreen">
            {veterinariaState.name}
          </h2>
        </div>

        <div className="flex flex-col m-6 space-y-2">
          <VetDetail
            label="Veterinario a cargo:"
            value={veterinariaState.veterinarian}
            field="veterinarian"
            isEditing={isEditing}
            editableVet={editableVet}
            handleChange={handleChange}
          />
          <VetDetail
            label="Número de matrícula:"
            value={veterinariaState.licenseNumber.toString()}
            field="licenseNumber"
            isEditing={isEditing}
            editableVet={editableVet}
            handleChange={handleChange}
          />
          <VetDetail
            label="Email:"
            value={veterinariaState.email}
            field="email"
            isEditing={isEditing}
            editableVet={editableVet}
            handleChange={handleChange}
          />



           {/* 🔹 Agregamos LocationSearch SOLO cuando se está editando */}
        {isEditing ? (
          <div>
            <label className="block py-1 pl-4 font-semibold text-customBrown">
              Ubicación:
            </label>
            <LocationSearch
              onSelect={(lat, lon) => handleLocationSelect(lat, lon)}
              onReset={() => setEditableVet((prev) => ({
                ...prev!,
                location: [{ latitude: 0, longitude: 0 }],
              }))}
              onSubmit={(e, resetSearch) => {
                e.preventDefault();
                resetSearch();
              }}
            />
          </div>
        ) : (
          <VetDetail
            label="Ubicación:"
            value={
              veterinariaState.location && veterinariaState.location.length > 0
                ? veterinariaState.location.map((loc) => `Lat: ${loc.latitude}, Lon: ${loc.longitude}`).join(" | ")
                : "No disponible"
            }
            field="location"
            isEditing={isEditing}
            editableVet={editableVet}
            handleChange={handleChange}
          />
        )}


          
          <VetDetail
            label="Teléfono:"
            value={veterinariaState.phoneNumber}
            field="phoneNumber"
            isEditing={isEditing}
            editableVet={editableVet}
            handleChange={handleChange}
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={handleOpenModal}
          >
            Guardar cambios
          </button>
        </div>
      )}

      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}

      <ScheduledAppointments />
    </div>
  );
};

export default VetProfile;
