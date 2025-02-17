import React from "react";

const ConnectCalendly = ({ id }: { id: string }) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI;

  const handleConnectCalendly = () => {
    if (!CLIENT_ID || !REDIRECT_URI) {
      console.error("Faltan variables de entorno: CLIENT_ID o REDIRECT_URI");
      alert("Error: Configuración incompleta para la conexión con Calendly.");
      return;
    }

    const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${id}`;

    window.location.href = authUrl;
  };

  return (
    <button onClick={handleConnectCalendly} className="btn-calendly">
      Conectar con Calendly
    </button>
  );
};

export default ConnectCalendly;
