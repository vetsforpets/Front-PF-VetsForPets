"use client";

import { useState, useEffect, useMemo } from "react";
import { ICalendlyEvent } from "../Calendar/AppointmentsVet";
import { IVeterinaria } from "../Calendar/AppointmentsVet";



const AdminVet = () => {
    const [appointmentsByVet, setAppointmentsByVet] = useState<{ [key: string]: number }>({});
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVet, setSelectedVet] = useState<string | null>(null);
    const [vetAppointmentsDetails, setVetAppointmentsDetails] = useState<ICalendlyEvent[] | null>(null);

    const veterinarias: IVeterinaria[] = useMemo(() => [
        { id: 1, nombre: "Veterinaria Layus", email: "veterinarialayus01@gmail.com", url: "https://calendly.com/veterinarialayus01", calendlyUserUri: "https://api.calendly.com/users/092dfca1-32d1-4668-9c17-72e90a90753d", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS },
        { id: 2, nombre: "Veterinaria Dr Paso", email: "veterinariadrpaso02@gmail.com", url: "https://calendly.com/veterinariadrpaso02", calendlyUserUri: "https://api.calendly.com/users/da7ea90e-d6b9-4778-8431-4bf658e73326", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_PASO },
        { id: 3, nombre: "Veterinaria Crena", email: "veterinariacrena8@gmail.com", url: "https://calendly.com/veterinariacrena8", calendlyUserUri: "https://api.calendly.com/users/07708693-e755-4bf3-9092-025e1464b5ec", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_CRENA },
        { id: 4, nombre: "Veterinaria Copello", email: "veterinariacopello2@gmail.com", url: "https://calendly.com/veterinariacopello2", calendlyUserUri: "https://api.calendly.com/users/9332733b-e30e-4751-9926-cf482899429b", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_COPELLO },
        { id: 5, nombre: "Veterinaria Animal House", email: "veterinariaanimalhousemdq@gmail.com", url: "https://calendly.com/veterinariaanimalhousemdq", calendlyUserUri: "https://api.calendly.com/users/d4676ecb-4fc5-4272-b0ed-50208e713f81", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANIMAL },
        { id: 6, nombre: "Veterinaria Antartida Argentina", email: "veterinariaantartidaargentina@gmail.com", url: "https://calendly.com/veterinariaantartidaargentina", calendlyUserUri: "https://api.calendly.com/users/82a1b7b9-2490-4e2e-b6bc-fc70431203cb", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANTARTIDA },
        { id: 7, nombre: "Veterinaria Alberti", email: "veterinariaalberti01@gmail.com", url: "https://calendly.com/veterinariaalberti01", calendlyUserUri: "https://api.calendly.com/users/1369ebc0-766d-408c-a88a-1092458065bb", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ALBERTI },
        { id: 8, nombre: "Veterinaria Sigismondi", email: "veterinariasigismondi19@gmail.com", url: "https://calendly.com/veterinariasigismondi19?primary_color=DDA15E", calendlyUserUri: "https://api.calendly.com/users/bee8bd72-57d2-4aae-b087-17d186ecc9fc", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_SIGISMONDI },
        { id: 9, nombre: "Veterinaria Los Corrales", email: "veterinarialoscorrales9@gmail.com", url: "https://calendly.com/veterinarialoscorrales9", calendlyUserUri: "https://api.calendly.com/users/41172d08-d5a1-407c-b83a-a0579a38eeed", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_CORRALES },
        { id: 10, nombre: "Veterinaria La Rinconada", email: "veterinarialarinconada28@gmail.com", url: "https://calendly.com/veterinarialarinconada28", calendlyUserUri: "https://api.calendly.com/users/93cdefcb-e388-4596-b598-c0b537631f3b", calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_RINCONADA },
    ], []);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const vetAppointments: { [key: string]: number } = {};
                let total = 0;

                for (const vet of veterinarias) {
                    const apiUrl = `https://api.calendly.com/scheduled_events?user=${vet.calendlyUserUri}`;

                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${vet.calendlyToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    const data: { collection: ICalendlyEvent[] } = await response.json();
                    const appointmentsCount = data.collection.length;

                    vetAppointments[vet.nombre] = appointmentsCount;
                    total += appointmentsCount;
                }

                setAppointmentsByVet(vetAppointments);
                setTotalAppointments(total);
            } catch (err) {
                console.error("Error obteniendo turnos:", err);
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [veterinarias]);

    const handleVetClick = async (vetName: string) => {
        setSelectedVet(vetName);
        setVetAppointmentsDetails(null);
        const vet = veterinarias.find((v) => v.nombre === vetName);

        if (!vet || !vet.calendlyToken || !vet.calendlyUserUri) {
            console.error("Veterinaria no encontrada o no tiene token/URI válidos.");
            return;
        }

        try {
            const response = await fetch(`https://api.calendly.com/scheduled_events?user=${vet.calendlyUserUri}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${vet.calendlyToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data: { collection: ICalendlyEvent[] } = await response.json();
            setVetAppointmentsDetails(data.collection);
        } catch (error) {
            console.error("Error al obtener detalles de los turnos:", error);
        }
    };


    if (isLoading) return <p>Cargando citas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container max-w-4xl p-6 mx-auto">
            <h2 className="mt-5 ml-3 text-2xl font-bold text-gray-800">Turnos por Veterinaria</h2>

            {Object.keys(appointmentsByVet).length > 0 ? (
                <ul className="space-y-4">
                    {Object.entries(appointmentsByVet).map(([vetName, count]) => (
                        <li
                            key={vetName}
                            className="p-4 border border-gray-300 rounded-lg shadow-lg bg-[#f1bd81]"
                            onClick={() => handleVetClick(vetName)}
                        >
                            <p className="text-lg font-medium text-gray-800">
                                <strong>{vetName}:</strong> {count} turnos
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No hay turnos registrados.</p>
            )}

            <div className="p-4 mt-6 border-t border-gray-400">
                <p className="text-lg font-bold text-gray-800">
                    <strong>Total general:</strong> {totalAppointments} turnos
                </p>
            </div>
            {selectedVet && vetAppointmentsDetails && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">Detalles de turnos para {selectedVet}</h3>
                    {vetAppointmentsDetails.length > 0 ? (

                        <ul className="space-y-4 ">
                            {vetAppointmentsDetails.map((appointment, index) => (
                                <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-[#f1bd81]">

                                    <p className="text-lg font-medium text-gray-800">
                                        <strong>Inicio:</strong> {new Date(appointment.start_time).toLocaleString()}
                                    </p>
                                    <p className="text-lg font-medium text-gray-800">
                                        <strong>Fin:</strong> {new Date(appointment.end_time).toLocaleString()}
                                    </p>
                                    <p className={`text-lg font-semibold ${appointment.status === "active" ? "text-green-600" : "text-red-600 dark:text-red-400"}`}>
                                        <strong>Estado:</strong> {appointment.status === "active" ? "Activo" : "Cancelado"}
                                    </p>

                                </li>
                            ))}
                        </ul>

                    ) : (
                        <p>No hay turnos para mostrar.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminVet;