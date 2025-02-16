import { useEffect, useState } from "react";

const Turnos = () => {
    const [turnos, setTurnos] = useState<any[]>([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            const res = await fetch('https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81', {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`,
                },
            });
            const data = await res.json();
            setTurnos(data.collection);
        };
        fetchTurnos();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Mis Turnos</h1>
            {turnos.length === 0 ? (
                <p>No tienes turnos programados.</p>
            ) : (
                <ul>
                    {turnos.map((turno: any) => (
                        <li key={turno.uri} className="p-4 mb-4 border rounded shadow">
                            <h2 className="text-xl">{turno.name}</h2>
                            <p><strong>Fecha:</strong> {new Date(turno.start_time).toLocaleString()}</p>
                            <p><strong>Ubicación:</strong> {turno.location?.location || "No especificada"}</p>
                            <p><strong>Estado:</strong> {turno.status === "active" ? "Activo" : "Cancelado"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Turnos;
