import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  profileImage?: string; // Opcional para permitir imágenes personalizadas
}

const Profile: React.FC<UserProfileProps> = ({
  name,
  email,
  phone,
  address,
  city,
  profileImage = "/Dog.svg", // Imagen por defecto si no se pasa ninguna
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl overflow-hidden w-full max-w-4xl place-items-center">
      
      {/* //!Información de la imagen de perfil */}
      <div className="bg-customLightBrown flex flex-col items-center justify-center p-6 rounded-3xl shadow-[6px_12px_10.8px_rgba(188,108,37,0.25)] w-80 h-80 relative">
        <img src={profileImage} alt="Perfil" className="w-40 h-40 rounded-full object-cover shadow-md" />

        <button className="absolute top-2 right-2 rounded-full px-1 py-2 hover:bg-customBrown transition">
          <img src="/images/icon.png" alt="editar" className="w-10 h-7 m-2" />
        </button>

        <h1 className="mt-4 text-3xl font-bold text-DarkGreen px-4 py-2 rounded-lg">{name}</h1>
      </div>

      {/* //!Detalles del usuario */}
      <div className="m-6 flex flex-col">
        <div className="space-y-2">
          <UserDetail label="Correo Electrónico:" value={email} />
          <UserDetail label="Teléfono:" value={phone} />
          <UserDetail label="Dirección:" value={address} />
          <UserDetail label="Ciudad:" value={city} />
        </div>
      </div>
    </div>
  );
};

//! Subcomponente para simplificar los detalles del usuario
const UserDetail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h2 className="text-customBrown font-semibold py-1 pl-4">{label}</h2>
    <p className="text-customDarkGreen bg-customLightBrown rounded-2xl text-left py-3 pl-4 min-w-96">
      {value}
    </p>
  </div>
);

export default Profile;
