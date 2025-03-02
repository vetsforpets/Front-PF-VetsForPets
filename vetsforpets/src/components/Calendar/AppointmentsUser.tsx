"use client";

import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/store";

export interface IQuestionAnswer {
    question: string;
    answer: string;
    position?: number;
}

export interface IInvitee {
    email: string;
    name?: string;
    questions_and_answers?: IQuestionAnswer[];
}

export interface IAppointment {
    id: string;
    start_time: string;
    end_time: string;
    status: "active" | "cancelled";
    invitees: IInvitee[];
    veterinariaNombre: string;
}

interface IVeterinaria {
    id: number;
    nombre: string;
    email: string;
    calendlyUserUri: string;
    calendlyToken?: string;
}

interface ICalendlyEvent {
    uri: string;
    start_time: string;
    end_time: string;
    status: "active" | "cancelled";
}

interface ICalendlyInvitee {
    email: string;
    name?: string;
    questions_and_answers?: { question: string; answer: string }[];
}

function AppointmentsUser() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userData = useUserStore((state) => state.userData);
    const userEmail = userData?.email || null;

    // Definimos el arreglo de veterinarias con sus credenciales
    const veterinarias: IVeterinaria[] = useMemo(
        () => [
            {
                id: 1,
                nombre: "Veterinaria Animal House",
                email: "veterinariaanimalhousemdq@gmail.com",
                calendlyUserUri:
                    "https://api.calendly.com/users/d4676ecb-4fc5-4272-b0ed-50208e713f81",
                calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANIMAL,
            },
            {
                id: 2,
                nombre: "Veterinaria Antartida Argentina",
                email: "veterinariaantartidaargentina@gmail.com",
                calendlyUserUri:
                    "https://api.calendly.com/users/82a1b7b9-2490-4e2e-b6bc-fc70431203cb",
                calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANTARTIDA,
            },
            {
                id: 3,
                nombre: "Veterinaria Alberti",
                email: "veterinariaalberti95@gmail.com",
                calendlyUserUri:
                    "https://api.calendly.com/users/76e49f90-162b-41ea-8638-bd8c21794f93",
                calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ALBERTI,
            },
            {
                id: 4,
                nombre: "Veterinaria Layus",
                email: "layusclinicaveterinaria@gmail.com",
                calendlyUserUri:
                    "https://api.calendly.com/users/f41e5086-afe3-4db1-84a1-787a3a82139b",
                calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
            },
        ],
        []
    );


    const userAppointments = useMemo(() => {
        if (!userEmail) return [];
        const lowerCaseUserEmail = userEmail.toLowerCase();
        return appointments.filter((appointment) =>
            appointment.invitees.some(
                (invitee) => invitee.email.toLowerCase() === lowerCaseUserEmail
            )
        );
    }, [appointments, userEmail]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!userEmail) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                let allAppointments: IAppointment[] = [];

                for (const veterinaria of veterinarias) {
                    const apiUrl = `https://api.calendly.com/scheduled_events?user=${veterinaria.calendlyUserUri}`;

                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${veterinaria.calendlyToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    const data: { collection: ICalendlyEvent[] } = await response.json();

                    const events: IAppointment[] = await Promise.all(
                        data.collection.map(async (event) => {
                            const eventId = event.uri.split("/").pop() || "";

                            const inviteesResponse = await fetch(
                                `https://api.calendly.com/scheduled_events/${eventId}/invitees`,
                                {
                                    method: "GET",
                                    headers: {
                                        Authorization: `Bearer ${veterinaria.calendlyToken}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );

                            if (!inviteesResponse.ok) {
                                throw new Error(
                                    `Error ${inviteesResponse.status}: ${inviteesResponse.statusText}`
                                );
                            }

                            const inviteesData: { collection: ICalendlyInvitee[] } =
                                await inviteesResponse.json();

                            return {
                                id: eventId,
                                start_time: event.start_time,
                                end_time: event.end_time,
                                status: event.status,
                                invitees: inviteesData.collection.map((invitee) => ({
                                    email: invitee.email,
                                    name: invitee.name,
                                    questions_and_answers:
                                        invitee.questions_and_answers?.map((qa) => ({
                                            question: qa.question,
                                            answer: qa.answer,
                                        })) || [],
                                })),
                                veterinariaNombre: veterinaria.nombre,
                            };
                        })
                    );

                    allAppointments = [...allAppointments, ...events];
                }

                setAppointments(allAppointments);
            } catch (err) {
                console.error("Error obteniendo turnos:", err);
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [userEmail, veterinarias]);

    return (
        <div className="container max-w-4xl p-6 mx-auto">
            <h2 className="mt-5 ml-3 text-2xl font-bold text-gray-800">
                Tus Turnos Agendados
            </h2>

            {isLoading ? (
                <p className="text-gray-600">Cargando turnos...</p>
            ) : error ? (
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            ) : userAppointments.length > 0 ? (
                <ul className="space-y-6">
                    {userAppointments.map((appointment) => (
                        <li
                            key={appointment.id}
                            className="p-6 border border-gray-200 rounded-lg shadow-lg bg-[#DDA15E] dark:border-gray-700"
                        >
                            <p className="text-lg font-medium text-gray-800">
                                <strong>Veterinaria:</strong> {appointment.veterinariaNombre}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                <strong>Inicio:</strong>{" "}
                                {new Date(appointment.start_time).toLocaleString()}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                <strong>Fin:</strong>{" "}
                                {new Date(appointment.end_time).toLocaleString()}
                            </p>
                            <p
                                className={`text-lg font-semibold ${appointment.status === "active"
                                        ? "text-green-600"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                <strong>Estado:</strong>{" "}
                                {appointment.status === "active" ? "Activo" : "Cancelado"}
                            </p>

                            {appointment.invitees && appointment.invitees.length > 0 ? (
                                <div className="p-4 mt-4 rounded-lg bg-[#bc6c25]">
                                    <h3 className="text-lg font-semibold text-gray-200">
                                        Datos del Tutor:
                                    </h3>
                                    {appointment.invitees.map((invitee, idx) => (
                                        <div key={idx} className="mt-2">
                                            <p className="pl-4 text-gray-800 border-l-4 border-blue-500 dark:text-gray-200">
                                                <strong>Email:</strong> {invitee.email}
                                            </p>
                                            {invitee.name && (
                                                <p className="pl-4 text-gray-800 border-l-4 border-blue-500 dark:text-gray-200">
                                                    <strong>Nombre:</strong> {invitee.name}
                                                </p>
                                            )}
                                            {invitee.questions_and_answers &&
                                                invitee.questions_and_answers.length > 0 && (
                                                    <div className="mt-2 border-gray-400">
                                                        <h4 className="text-lg font-semibold text-gray-200">
                                                            Nombre de Mascota que se atiende:
                                                        </h4>
                                                        {invitee.questions_and_answers.map((qa, index) => (
                                                            <p
                                                                key={index}
                                                                className="pl-4 mt-2 text-gray-800 border-l-4 border-blue-500 dark:text-gray-200"
                                                            >
                                                                {qa.answer}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    No hay datos de invitados
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-700 dark:text-gray-300">
                    No hay turnos disponibles.
                </p>
            )}
        </div>
    );
}

export default AppointmentsUser;
