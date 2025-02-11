import { fetchUserData } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import React, { useEffect, useState } from "react";

// Definir la interfaz de las citas
interface IAppointment {
  id: string;
  date: string; // Puede ser `Date` si lo parseas
  time: string;
  description: string;
  status: string;
  user: string;
}

// Definir la interfaz de usuario
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

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id) {
        try {
          const data = await fetchUserData();
          setUsers(data);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
          setUsers([]);
        }
      }
    };

    fetchData();
  }, [userData?.id]);

  const user = users.find((u) => u.id === userData?.id);
  console.log(userData);
  console.log(user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl overflow-hidden w-full max-w-4xl place-items-center">
      <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">
        <img
          src={user?.imgProfile}
          alt="Perfil"
          className="w-40 h-40 rounded-full object-cover shadow-md"
        />

        <button
          className="absolute top-2 right-2 rounded-full px-1 py-2 hover:bg-customBrown transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          <img src="/images/icon.png" alt="editar" className="w-10 h-7 m-2" />
        </button>

        <h1 className="mt-4 text-3xl font-bold text-DarkGreen px-4 py-2 rounded-lg">
          {user?.name}
        </h1>
      </div>

      {/* //Detalles del usuario */}
      <div className="m-6 flex flex-col">
        <input type="text" />
        {/* <div className="space-y-2">
          <UserDetail label="Correo Electrónico:" value={email} />
          <UserDetail label="Teléfono:" value={phone} />
          <UserDetail label="Dirección:" value={address} />
          <UserDetail label="Ciudad:" value={city} />
        </div> */}
      </div>
    </div>
  );
};

// Subcomponente para simplificar los detalles del usuario
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
