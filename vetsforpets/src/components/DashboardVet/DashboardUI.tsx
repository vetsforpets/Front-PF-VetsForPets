import { useState, useEffect } from "react";
import { IVetCredentials } from "@/services/interfaces";
import Image from "next/image";
import ScheduledAppointments from "../Calendar/ScheduledAppointments";
import { updatePetshop } from "@/services/servicesVet";
import CloudinaryUploader from "../Cloudinary/Cloudinary";
import ConfirmModal from "../ConfirnModal/ConfirmModal";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import AppointmentsVet from "../Calendar/AppointmentsVet";

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
  const [veterinariaState, setVeterinaria] = useState<IVetCredentials>(veterinaria);
  const userData = useUserStore((state) => state.userData);
  const [showProfile, setShowProfile] = useState(true);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    setEditableVet(veterinaria);
    setVeterinaria(veterinaria);
  }, [veterinaria]);

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

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCalendly(false);

  };

  const handleCalendlyClick = () => {
    setShowCalendly(true);
    setShowProfile(false);

  };

  if (userData?.id === undefined) {
    return <div>Cargando....</div>;
  } else {
    return (
      <>
        <h1 className="mt-6 mb-6 text-3xl font-bold text-center">
          Perfil de Veterinaria
        </h1>
        <div className="flex items-start space-x-8">

          <div className="p-5 md:flex w-full max-w-sm md:w-[300px] lg:w-2/5 xl:w-1/4">
            <ul className="flex flex-col p-5 py-2 space-y-4 text-sm font-medium text-gray-500 ml-14 md:w-full">
              <li className="p-3">
                <a
                  href="#"
                  className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
                  onClick={handleProfileClick}
                >
                  <img src="/user.svg" alt="Calendly" className="w-12 h-12 me-2" />
                  Mi Perfil
                </a>
              </li>
              <li className="p-3">
                <a
                  href="#"
                  className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
                  onClick={handleCalendlyClick}
                >
                  <img
                    src="/calendar.svg"
                    alt="Calendly"
                    className="w-12 h-12 me-2"
                  />
                  Solicitar Turno
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-4xl mx-auto md:w-2/3 lg:w-3/5 xl:w-3/4">
          {showProfile && (
          <div>
            <h2 className="mt-5 ml-3 text-2xl font-bold text-gray-800 ">Mi Perfil</h2>
          </div>
          )}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 rounded-2xl place-items-center">
              {showProfile && (
                <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-[350px] h-auto relative">
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
              )}
              {showProfile && (
                <div className="flex flex-col w-full m-6 space-y-2">
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
                  <VetDetail
                    label="Teléfono:"
                    value={veterinariaState.phoneNumber}
                    field="phoneNumber"
                    isEditing={isEditing}
                    editableVet={editableVet}
                    handleChange={handleChange}
                  />
                </div>
              )}
            </div>

            {showProfile && isEditing && (
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
            {showCalendly && <AppointmentsVet />}
          </div>
        </div>
      </>
    );
  }

}

export default VetProfile;