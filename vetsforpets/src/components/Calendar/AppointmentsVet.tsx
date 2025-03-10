"use client";

import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/store";
import { useFetchPets } from "../DashboardVet/PetsButton";
import PetCard from "../PetAppointment/PetCard";

export interface IQuestionAnswer {
  question: string;
  answer: string;
  position?: number;
}

export interface IInvitee {
  email: string;
  name?: string;
  questions_and_answers: IQuestionAnswer[];
}

export interface IAppointment {
  id: string;
  start_time: string;
  end_time: string;
  status: "active" | "cancelled";
  invitees: IInvitee[];
}

export interface IVeterinaria {
  id: number;
  nombre: string;
  email: string;
  calendlyUserUri: string;
  calendlyToken?: string;
}

export interface ICalendlyEvent {
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

function AppointmentsVet() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { pets, error: petsError, isLoading: petsLoading } = useFetchPets();

  const userData = useUserStore((state) => state.userData);
  const userEmail = userData?.email || null;

  const veterinarias: IVeterinaria[] = useMemo(
    () => [
      {
        id: 1,
        nombre: "Veterinaria Layus",
        email: "veterinarialayus@gmail.com",
        url: "https://calendly.com/veterinarialayus",
        calendlyUserUri:
          "https://api.calendly.com/users/78ef42db-1481-4042-adea-cd88f8e2fd1f",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
      },
      {
        id: 2,
        nombre: "Veterinaria Dr Paso",
        email: "veterinariapaso65@gmail.com",
        url: "https://calendly.com/veterinariapaso65",
        calendlyUserUri:
          "https://api.calendly.com/users/aa1e5196-3a71-4b07-9cb0-3f836fd998df",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_PASO,
      },
      {
        id: 3,
        nombre: "Veterinaria Crena",
        email: "veterinariacrena8@gmail.com",
        url: "https://calendly.com/veterinariacrena8",
        calendlyUserUri:
          "https://api.calendly.com/users/07708693-e755-4bf3-9092-025e1464b5ec",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_CRENA,
      },
      {
        id: 4,
        nombre: "Veterinaria Copello",
        email: "veterinariacopello2@gmail.com",
        url: "https://calendly.com/veterinariacopello2",
        calendlyUserUri:
          "https://api.calendly.com/users/9332733b-e30e-4751-9926-cf482899429b",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_COPELLO,
      },
      {
        id: 5,
        nombre: "Veterinaria Animal House",
        email: "veterinariaanimalhousemdq@gmail.com",
        url: "https://calendly.com/veterinariaanimalhousemdq",
        calendlyUserUri:
          "https://api.calendly.com/users/d4676ecb-4fc5-4272-b0ed-50208e713f81",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANIMAL,
      },
      {
        id: 6,
        nombre: "Veterinaria Antartida Argentina",
        url: "https://calendly.com/veterinariaantartidaargentina",
        email: "veterinariaantartidaargentina@gmail.com",
        calendlyUserUri:
          "https://api.calendly.com/users/82a1b7b9-2490-4e2e-b6bc-fc70431203cb",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ANTARTIDA,
      },
      {
        id: 7,
        nombre: "Veterinaria Alberti",
        email: "veterinariaalberti95@gmail.com",
        url: "https://calendly.com/veterinariaalberti95",
        calendlyUserUri:
          "https://api.calendly.com/users/76e49f90-162b-41ea-8638-bd8c21794f93",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_ALBERTI,
      },
      {
        id: 8,
        nombre: "Veterinaria Sigismondi",
        email: "veterinariasigismondi19@gmail.com",
        url: "https://calendly.com/veterinariasigismondi19?primary_color=DDA15E",
        calendlyUserUri:
          "https://api.calendly.com/users/bee8bd72-57d2-4aae-b087-17d186ecc9fc",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_SIGISMONDI,
      },
      {
        id: 9,
        nombre: "Veterinaria Los Corrales",
        email: "veterinarialoscorrales9@gmail.com",
        url: "https://calendly.com/veterinarialoscorrales9",
        calendlyUserUri:
          "https://api.calendly.com/users/41172d08-d5a1-407c-b83a-a0579a38eeed",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_CORRALES,
      },
      {
        id: 10,
        nombre: "Veterinaria La Rinconada",
        email: "veterinarialarinconada28@gmail.com",
        url: "https://calendly.com/veterinarialarinconada28",
        calendlyUserUri:
          "https://api.calendly.com/users/93cdefcb-e388-4596-b598-c0b537631f3b",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_RINCONADA,
      },
    ],
    []
  );

  const veterinariaUsuario = useMemo(() => {
    return veterinarias.find((vet) => vet.email === userEmail);
  }, [userEmail, veterinarias]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!veterinariaUsuario) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const apiUrl = `https://api.calendly.com/scheduled_events?user=${veterinariaUsuario.calendlyUserUri}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${veterinariaUsuario.calendlyToken}`,
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
                  Authorization: `Bearer ${veterinariaUsuario.calendlyToken}`,
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
            };
          })
        );

        setAppointments(events);
      } catch (err) {
        console.error("Error obteniendo turnos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [veterinariaUsuario, userEmail]);

  if (isLoading || petsLoading) return <p>Cargando citas y mascotas...</p>;

  if (error || petsError) return <p>Error: {error || petsError}</p>;

  return (
    <div className="container max-w-4xl p-6 mx-auto ">
      <h2 className="mt-5 ml-3 text-2xl font-bold text-gray-800">
        Turnos Agendados
      </h2>
      {isLoading ? (
        <p className="text-gray-600">Cargando turnos...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      ) : appointments.length > 0 ? (
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg bg-[#DDA15E] dark:border-gray-700"
            >
              <p className="text-lg font-medium text-gray-800">
                <strong>Inicio:</strong>{" "}
                {new Date(appointment.start_time).toLocaleString()}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Fin:</strong>{" "}
                {new Date(appointment.end_time).toLocaleString()}
              </p>
              <p
                className={`text-lg font-semibold ${
                  appointment.status === "active"
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

                            {invitee.questions_and_answers.some((qa) => {
                              return pets.some(
                                (pet) =>
                                  pet.name === qa.answer &&
                                  pet.user.email === invitee.email
                              );
                            }) && (
                              <div className="mt-2">
                                <p className="text-lg font-semibold text-gray-200">
                                  <strong>Datos de la Mascota:</strong>
                                </p>
                                {pets
                                  .filter((pet) =>
                                    invitee.questions_and_answers.some(
                                      (qa) =>
                                        qa.answer === pet.name &&
                                        pet.user.email === invitee.email
                                    )
                                  )
                                  .map((pet, index) => (
                                    <div key={index}>
                                      <PetCard
                                        pet={pet}
                                        invitee={invitee}
                                        pets={pets}
                                      />
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-800">No hay tutores para este turno.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tienes turnos agendados.</p>
      )}
    </div>
  );
}

export default AppointmentsVet;
