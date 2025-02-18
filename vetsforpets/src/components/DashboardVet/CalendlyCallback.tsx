import { useEffect } from "react";

const CalendlyCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // Intercambia el código por un token de acceso
      const exchangeCodeForToken = async () => {
        const CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID;
        const CLIENT_SECRET = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_SECRET;
        const REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI;

        try {
          const response = await fetch("https://api.calendly.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: CLIENT_ID || "",
              client_secret: CLIENT_SECRET || "",
              code: code,
              redirect_uri: REDIRECT_URI || "",
              grant_type: "authorization_code",
            }),
          });

          const data = await response.json();

          if (data.access_token) {
            // Aquí tienes el access_token. Puedes almacenarlo en el estado o en el almacenamiento local
            console.log("Access Token:", data.access_token);
            // Ejemplo: guardar el token en localStorage o en el estado global
            localStorage.setItem("calendly_access_token", data.access_token);
          } else {
            console.error("No se pudo obtener el access token.");
          }
        } catch (error) {
          console.error("Error al intercambiar el código por el token:", error);
        }
      };

      exchangeCodeForToken();
    } else {
      console.error("No se recibió el código de autorización.");
    }
  }, []);

  return (
    <div>
      <h2>Procesando...</h2>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default CalendlyCallback;
