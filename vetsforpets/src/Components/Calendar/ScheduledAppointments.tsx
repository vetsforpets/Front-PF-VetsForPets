import { useEffect, useState } from "react";

interface EventGuest {
  email: string;
}

interface EventMembership {
  user_email: string;
}

interface Turno {
  uri: string;
  name: string;
  start_time: string;
  status: "active" | "canceled";
  event_guests?: EventGuest[];
  event_memberships?: EventMembership[];
  cancellation?: unknown;
}

const TurnosSolicitados = () => {
  const [turnosSolicitados, setTurnosSolicitados] = useState<Turno[]>([]);
  const userEmail = "hugooeseverri@gmail.com";

  useEffect(() => {
    const fetchTurnosSolicitados = async () => {
      const res = await fetch(
        "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      console.log("Datos recibidos de la API:", data);

      const turnosDeUsuario = data.collection.filter(
        (turno: Turno) =>
          (turno.event_guests?.some((guest) => guest.email === userEmail) ||
            turno.event_memberships?.some(
              (membership) => membership.user_email === userEmail
            )) ??
          false
      );

      setTurnosSolicitados(turnosDeUsuario);
    };

    fetchTurnosSolicitados();
  }, []);

  const eliminarTurnosCancelados = () => {
    const turnosActivos = turnosSolicitados.filter(
      (turno) => !turno.cancellation
    );

    console.log("Turnos después de eliminar los cancelados:", turnosActivos);

    setTurnosSolicitados(turnosActivos);
    localStorage.setItem("turnosSolicitados", JSON.stringify(turnosActivos));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Turnos</h1>

      <button
        onClick={eliminarTurnosCancelados}
        className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 mb-6"
      >
        Eliminar turnos cancelados
      </button>

      {turnosSolicitados.length === 0 ? (
        <p className="text-xl text-gray-600">No tienes turnos solicitados.</p>
      ) : (
        <ul className="space-y-4">
          {turnosSolicitados.map((turno) => (
            <li
              key={turno.uri}
              className="bg-[#EEB87C]  p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">{turno.name}</h2>
              <p className="text-black mt-2">
                <strong>Fecha:</strong>{" "}
                {new Date(turno.start_time).toLocaleString()}
              </p>
              <p
                className={`text-sm mt-2 ${
                  turno.status === "active" ? "text-green-500" : "text-red-800"
                }`}
              >
                <strong>Estado:</strong>{" "}
                {turno.status === "active" ? "Activo" : "Cancelado"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TurnosSolicitados;
