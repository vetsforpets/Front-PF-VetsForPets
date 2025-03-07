"use client";

import { fetchUserData, updateUser } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import React, { useEffect, useState } from "react";
import CloudinaryUploader from "../Cloudinary/Cloudinary";
import { toast } from "sonner";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Image from "next/image";
import LocationSearch from "../Maps/Search";

interface IAppointment {
  id: string;
  date: string;
  time: string;
  description: string;
  status: string;
  user: string;
}

interface ILocation {
  latitude: number;
  longitude: number;
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
  location: ILocation[];
  appointments: IAppointment[];
  role: string;
}

const Admin = () => {
  const { userData } = useUserStore();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<IUserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id && userData?.token) {
        try {
          const data = await fetchUserData(userData.id, userData.token);
          setUsers([data]);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          setUsers([]);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [userData?.id, userData?.token]);

  const user = userData && users.find((u) => u.id === userData.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-4">
          <p className="mb-4 text-2xl font-bold text-customBrown">
            Cargando...
          </p>
          <Image src="/loading.svg" width={100} height={100} alt="cargando" />
        </div>
      </div>
    );
  }

  if (!user) return <p>No fue posible obtener los datos del usuario...</p>;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableUser({ ...user });
    }
  };

  // const handleSave = async () => {
  //   if (editableUser) {
  //     console.log("datos actualizados enviados.... ", editableUser)
  //     try {
  //       const updatedUser = await updateUser(
  //         userData.id,
  //         editableUser,
  //         userData.token
  //       );
  //       console.log("Usuario actualizado:", updatedUser);
  //       setUsers([updatedUser]);
  //       toast.success("Perfil editado con éxito", {
  //         duration: 3000,
  //         style: {
  //           color: "#155724",
  //           background: "#d4edda",
  //           borderRadius: "8px",
  //           padding: "16px",
  //           border: "1px solid #c3e6cb",
  //         },
  //       });
  //       setIsEditing(false);
  //     } catch (error) {
  //       console.error("Error al guardar los cambios:", error);
  //     }
  //   }
  // };



  const handleSave = async () => {
    if (editableUser) {
      // Verificamos si location está definido y en el formato correcto
      const updatedUser = {
        ...editableUser,
        location: Array.isArray(editableUser.location) && editableUser.location.length > 0
          ? editableUser.location.map((loc) => ({
              latitude: Number(loc.latitude),
              longitude: Number(loc.longitude),
            }))
          : [{ latitude: 0, longitude: 0 }], // 🔹 Si no tiene ubicación, enviamos un valor por defecto
      };
  
      console.log("Datos enviados a updateUser:", updatedUser); // 🔹 Verificar estructura correcta antes de enviar
  
      try {
        const response = await updateUser(userData.id, updatedUser, userData.token);
        console.log("Usuario actualizado:", response);
        setUsers([response]);
        toast.success("Perfil editado con éxito", { duration: 3000 });
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };
  

  const handleChange = (field: keyof IUserData,  value: string | number | { latitude: number; longitude: number })  => {
    if (!editableUser) return;
    
    setEditableUser((prev) => ({
      ...prev!,
      [field]: field === "age" ? String(value) : value,
    }));
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    setEditableUser((prev) => ({
      ...prev!,
      location: [{ latitude: Number(lat), longitude: Number(lon) }], 
    }));
  };

  const handleImageUpload = (url: string) => {
    if (editableUser) {
      setEditableUser({ ...editableUser, imgProfile: url });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    handleSave();
    handleCloseModal();
  };


  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-8 xl:grid-cols-2 place-items-center">
      <div className="bg-customLightBrown flex flex-col items-center justify-center px-6 py-20 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 min-h-80 relative">

        {isEditing ? (
          <div className="flex flex-col items-center">
            <CloudinaryUploader onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <Image
            src={user?.imgProfile || "/Generic avatar.png"}
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

        <h1 className="flex items-center justify-center w-full px-4 py-2 mt-4 text-3xl font-bold text-center rounded-lg">
          {user?.name} {user.lastName}
        </h1>
      </div>

      <div className="flex flex-col m-6 space-y-4">
        {isEditing ? (
          <>
            <div className="mt-4">
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Nombre:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
                type="text"
                value={editableUser?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Apellido:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
                type="text"
                value={editableUser?.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Edad:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
                type="number"
                value={editableUser?.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div>
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Correo Electrónico:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
                type="text"
                value={editableUser?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>


            <div className="mt-4">
  <label className="block py-1 pl-4 font-semibold text-customBrown">Ubicación:</label>
  <LocationSearch
    onSelect={(lat, lon) => handleLocationSelect(lat, lon)}
    onReset={() => handleChange("location", { latitude: 0, longitude: 0 })}
    onSubmit={(e, resetSearch) => {
      e.preventDefault();
      resetSearch();
    }}
  />
</div>

            <div>
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Teléfono:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
                type="text"
                value={editableUser?.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>

            <div>
              <label className="block py-1 pl-4 font-semibold text-customBrown">
                Usuario Premium:
              </label>
              <input
                className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96"
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
            
            <UserDetail
  label="Ubicación:"
  value={
    user.location && user.location.length > 0
      ? user.location.map((loc) => `Lat: ${loc.latitude}, Lon: ${loc.longitude}`).join(" | ")
      : "No disponible"
  }
/>
    
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
            className="self-end px-6 py-2 mt-6 text-white transition bg-customBrown rounded-2xl hover:bg-opacity-90"
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
    <h2 className="py-1 pl-4 font-semibold text-customBrown">{label}</h2>
    <p className="py-3 pl-4 text-left text-customDarkGreen bg-customLightBrown rounded-2xl min-w-96">
      {value}
    </p>
  </div>
);

export default Admin;
