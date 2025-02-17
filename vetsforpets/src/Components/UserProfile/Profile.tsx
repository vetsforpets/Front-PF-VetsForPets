"use client";

import { fetchUserData, updateUser } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import React, { useEffect, useState } from "react";
import CloudinaryUploader from "../Cloudinary/Cloudinary"; 
import { toast } from "sonner";
import ConfirmModal from "../ConfirnModal/ConfirmModal";
import Image from "next/image";

interface IAppointment {
  id: string;
  date: string;
  time: string;
  description: string;
  status: string;
  user: string;
}

interface IUserData {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: string;
  imgProfile: string;
  isPremium: boolean;
  appointments: IAppointment[];
  isVet: boolean;
}

const Profile = () => {
  const { userData } = useUserStore();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<IUserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id && userData?.token) {
        try {
          const data = await fetchUserData(userData.id, userData.token);

          console.log(data);

          setUsers([data]);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          setUsers([]);
        }
      }
    };

    fetchData();
  }, [userData?.id, userData?.token]);

  const user = userData && users.find((u) => u.id === userData.id);

  console.log("userData:", userData);
  console.log("user:", user);

  console.log("Ruta de la imagen:", user?.imgProfile);


  if (!user) return <p>Cargando datos del usuario...</p>;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableUser({ ...user });
    }
  };

  const handleSave = async () => {
    if (editableUser) {
      try {

        const updatedUser = await updateUser(userData.id, editableUser, userData.token);
        console.log("Usuario actualizado:", updatedUser);
        setUsers([updatedUser]);
         toast.success("Perfil editado con éxito", {
              duration: 3000,
              style: {
                color: "#155724",
                background: "#d4edda",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid #c3e6cb",
              },
            })
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleChange = (field: keyof IUserData, value: string | number) => {
    if (!editableUser) return;
    setEditableUser((prev) => ({
      ...prev!,
      [field]: field === "age" ? Number(value) : value,
    }));
  };

  // Esta función se pasa al CloudinaryUploader para actualizar la imagen
  const handleImageUpload = (url: string) => {
    if (editableUser) {
      setEditableUser({ ...editableUser, imgProfile: url });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleConfirm = () => {
    handleSave();  
    handleCloseModal(); 
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl overflow-hidden w-full max-w-4xl place-items-center">
      <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">


      {isEditing ? (
  <div className="flex flex-col items-center">
    
    <CloudinaryUploader onImageUpload={handleImageUpload} />
  </div>
) : (
  // En modo no edición, mostramos la imagen actual o un avatar genérico
  <Image
    src={user?.imgProfile || "/Generic avatar.png"}
    alt="Perfil"
    className="w-40 h-40 rounded-full object-cover shadow-md"
  />
)}
        <button
          className="absolute top-2 right-2 rounded-full px-1 py-2 hover:bg-customBrown transition"
          onClick={handleEdit}
        >
          <Image src="/images/icon.png" alt="editar" className="w-10 h-7 m-2" />
        </button>

        <h1 className="mt-4 text-3xl font-bold px-4 py-2 rounded-lg w-full flex justify-center items-center text-center">
          {user?.name} {user.lastName}
        </h1>
      </div>

      <div className="m-6 flex flex-col space-y-4">
        {isEditing ? (
          <>
            <div className="mt-4">
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Nombre:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="text"
                value={editableUser?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Apellido:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="text"
                value={editableUser?.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Edad:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="number"
                value={editableUser?.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div>
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Correo Electrónico:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="text"
                value={editableUser?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Teléfono:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="text"
                value={editableUser?.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>

            <div>
              <label className="text-customBrown font-semibold py-1 pl-4 block">
                Usuario Premium:
              </label>
              <input
                className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96"
                type="text"
                value={editableUser?.isPremium ? "Sí" : "No"}
                readOnly
              />
            </div>
          </>
        ) : (
          <>
            <UserDetail label="Edad:" value={user.age.toString()} />
            <UserDetail label="Correo Electrónico:" value={user.email} />
            <UserDetail label="Teléfono:" value={user.phoneNumber} />
            <UserDetail
              label="Fecha de Registro:"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <UserDetail
              label="Usuario Premium:"
              value={user.isPremium ? "Sí" : "No"}
            />
          </>
        )}
        {isEditing && (
          <button
            className="mt-6 self-end bg-customBrown text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 transition"
            onClick={handleOpenModal}
          >
            Guardar Cambios
          </button>
        )}
      </div>

      {isModalOpen && (
        <ConfirmModal
        isOpen={isModalOpen} 
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
};

const UserDetail: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <h2 className="text-customBrown font-semibold py-1 pl-4">{label}</h2>
    <p className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96">
      {value}
    </p>
  </div>
);

export default Profile;
