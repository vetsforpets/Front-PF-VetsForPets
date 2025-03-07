import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/store";

interface Turno {
  uri: string;
  name: string;
  start_time: string;
  status: string;
}

const ScheduledAppointments = () => {
  const [turnosSolicitados, setTurnosSolicitados] = useState<Turno[]>([]);
  const userData = useUserStore((state) => state.userData);

  const veterinarias = useMemo(
    () => [
      {
        id: 1,
        nombre: "Veterinaria Layus",
        email: "veterinarialayus@gmail.com",
        url: "https://calendly.com/veterinarialayus",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/78ef42db-1481-4042-adea-cd88f8e2fd1f",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
      },
      {
        id: 2,
        nombre: "Veterinaria Dr Paso",
        email: "veterinariapaso65@gmail.com",
        url: "https://calendly.com/veterinariapaso65",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/aa1e5196-3a71-4b07-9cb0-3f836fd998df",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_PASO,
      },
      {
        id: 3,
        nombre: "Veterinaria Crena",
        email: "veterinariacrena8@gmail.com",
        url: "https://calendly.com/veterinariacrena8",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/07708693-e755-4bf3-9092-025e1464b5ec",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_CRENA,
      },
      {
        id: 4,
        nombre: "Veterinaria Copello",
        email: "veterinariacopello2@gmail.com",
        url: "https://calendly.com/veterinariacopello2",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/9332733b-e30e-4751-9926-cf482899429b",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_COPELLO,
      },
      {
        id: 5,
        nombre: "Veterinaria Animal House",
        email: "veterinariaanimalhousemdq@gmail.com",
        url: "https://calendly.com/veterinariaanimalhousemdq",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/d4676ecb-4fc5-4272-b0ed-50208e713f81",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_ANIMAL,
      },
      {
        id: 6,
        nombre: "Veterinaria Antartida Argentina",
        email: "veterinariaantartidaargentina@gmail.com ",
        url: "https://calendly.com/veterinariaantartidaargentina",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/82a1b7b9-2490-4e2e-b6bc-fc70431203cb",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_ANTARTIDA,
      },
      {
        id: 7,
        nombre: "Veterinaria Alberti",
        email: "veterinariaalberti95@gmail.com",
        url: "https://calendly.com/veterinariaalberti95",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/76e49f90-162b-41ea-8638-bd8c21794f93",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_ALBERTI,
      },
      {
        id: 8,
        nombre: "Veterinaria Sigismondi",
        email: "veterinariasigismondi19@gmail.com",
        url: "https://calendly.com/veterinariasigismondi19?primary_color=DDA15E",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/bee8bd72-57d2-4aae-b087-17d186ecc9fc",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_SIGISMONDI,
      },
      {
        id: 9,
        nombre: "Veterinaria Los Corrales",
        email: "veterinarialoscorrales9@gmail.com",
        url: "https://calendly.com/veterinarialoscorrales9",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/41172d08-d5a1-407c-b83a-a0579a38eeed",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_CORRALES,
      },
      {
        id: 10,
        nombre: "Veterinaria La Rinconada",
        email: "veterinarialarinconada28@gmail.com",
        url: "https://calendly.com/veterinarialarinconada28",
        calendlyUserUri:
          "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/93cdefcb-e388-4596-b598-c0b537631f3b",
        calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_RINCONADA,
      },
    ],
    []
  );

  const userEmail = userData?.email || null;

  const veterinariaUsuario = useMemo(() => {
    console.log("Buscando veterinaria para el usuario con email:", userEmail);
    const vet = veterinarias.find((vet) => vet.email === userEmail);
    console.log("Veterinaria encontrada:", vet);
    return vet;
  }, [userEmail, veterinarias]);

  useEffect(() => {
    const fetchTurnosSolicitados = async () => {
      console.log("Ejecutando fetch de turnos solicitados...");
      if (!userEmail || !veterinariaUsuario) {
        console.log("No se ha encontrado un usuario o veterinaria válida.");
        return;
      }

      try {
        console.log("Fetching turnos for:", veterinariaUsuario?.nombre);
        console.log("URI de Calendly:", veterinariaUsuario?.calendlyUserUri);

        const res = await fetch(veterinariaUsuario?.calendlyUserUri, {
          headers: {
            Authorization: `Bearer ${veterinariaUsuario?.calendlyToken}`,
          },
        });

        console.log("Respuesta del fetch:", res);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error de API Calendly:", errorText);
          throw new Error("Failed to fetch turnos");
        }

        const data = await res.json();
        console.log("Datos obtenidos de la API Calendly:", data);

        if (data.collection) {
          console.log("Colección de turnos:", data.collection);
          setTurnosSolicitados(data.collection);
        } else {
          console.error("No se encontraron turnos.");
          setTurnosSolicitados([]);
        }
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    console.log("Dependencias de useEffect:", [userEmail, veterinariaUsuario]);
    fetchTurnosSolicitados();
  }, [userEmail, veterinariaUsuario]);

  return (
    <div className="container max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800 sm:text-2xl">
        Turnos
      </h1>

      {userEmail ? (
        veterinariaUsuario ? (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Veterinaria: {veterinariaUsuario.nombre}
            </h2>

            {turnosSolicitados.length === 0 ? (
              <p className="text-xl text-gray-600">
                No tienes turnos solicitados.
              </p>
            ) : (
              <ul className="space-y-4">
                {turnosSolicitados.map((turno) => (
                  <li
                    key={turno.uri}
                    className="w-full sm:w-4/5 lg:w-1/2 mx-auto bg-[#EEB87C] p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <h2 className="text-2xl font-bold text-gray-800">
                      {turno.name}
                    </h2>
                    <p className="mt-2 text-black">
                      <strong>Fecha:</strong>{" "}
                      {new Date(turno.start_time).toLocaleString()}
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        turno.status === "active"
                          ? "text-green-500"
                          : "text-red-800"
                      }`}
                    >
                      <strong>Estado:</strong>{" "}
                      {turno.status === "active" ? "Activo" : "Cancelado"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-xl text-red-600">No tienes turnos registrados.</p>
        )
      ) : (
        <p className="text-xl text-red-600">
          Por favor, inicia sesión para ver tus turnos.
        </p>
      )}
    </div>
  );
};

export default ScheduledAppointments;

// import { useEffect, useState, useMemo } from "react";
// import { useUserStore } from "@/store";

// interface Turno {
//   uri: string;
//   name: string;
//   start_time: string;
//   status: string;
// }

// const ScheduledAppointments = () => {
//   const [turnosSolicitados, setTurnosSolicitados] = useState<Turno[]>([]);
//   const userData = useUserStore((state) => state.userData);

//   const veterinarias = useMemo(
//     () => [
//       {
//         id: 1,
//         nombre: "Veterinaria Alfredo",
//         email: "hugooeseverri@gmail.com",
//         url: "https://calendly.com/hugooeseverri/veterinaria-alfredo",
//         calendlyUserUri:
//           "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81",
//         calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN,
//       },
//       {
//         id: 2,
//         nombre: "Veterinaria Maria Paz",
//         email: "pazroscianorivas@gmail.com",
//         url: "https://calendly.com/pazroscianorivas",
//         calendlyUserUri:
//           "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/5fe4d7ec-c635-487c-a068-9b8d5b7f0390",
//         calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_MARIA,
//       },
//       {
//         id: 3,
//         nombre: "Veterinaria Layus",
//         email: "layusclinicaveterinaria@gmail.com",
//         url: "https://calendly.com/layusclinicaveterinaria/veterinaria-layus",
//         calendlyUserUri:
//           "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/f41e5086-afe3-4db1-84a1-787a3a82139b",
//         calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
//       },
//     ],
//     []
//   );

//   const userEmail = userData?.email || null;

//   const veterinariaUsuario = useMemo(() => {
//     console.log("Buscando veterinaria para el usuario con email:", userEmail);
//     const vet = veterinarias.find((vet) => vet.email === userEmail);
//     console.log("Veterinaria encontrada:", vet);
//     return vet;
//   }, [userEmail, veterinarias]);

//   useEffect(() => {
//     const fetchTurnosSolicitados = async () => {
//       console.log("Ejecutando fetch de turnos solicitados...");
//       if (!userEmail || !veterinariaUsuario) {
//         console.log("No se ha encontrado un usuario o veterinaria válida.");
//         return;
//       }

//       try {
//         console.log("Fetching turnos for:", veterinariaUsuario?.nombre);
//         console.log("URI de Calendly:", veterinariaUsuario?.calendlyUserUri);

//         const res = await fetch(veterinariaUsuario?.calendlyUserUri, {
//           headers: {
//             Authorization: `Bearer ${veterinariaUsuario?.calendlyToken}`,
//           },
//         });

//         console.log("Respuesta del fetch:", res);

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error("Error de API Calendly:", errorText);
//           throw new Error("Failed to fetch turnos");
//         }

//         const data = await res.json();
//         console.log("Datos obtenidos de la API Calendly:", data);

//         if (data.collection) {
//           console.log("Colección de turnos:", data.collection);
//           setTurnosSolicitados(data.collection);
//         } else {
//           console.error("No se encontraron turnos.");
//           setTurnosSolicitados([]);
//         }
//       } catch (error) {
//         console.error("Error al obtener los turnos:", error);
//       }
//     };

//     console.log("Dependencias de useEffect:", [userEmail, veterinariaUsuario]);
//     fetchTurnosSolicitados();
//   }, [userEmail, veterinariaUsuario]);

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold text-gray-800">Turnos</h1>

//       {userEmail ? (
//         veterinariaUsuario ? (
//           <>
//             <h2 className="text-2xl font-semibold text-gray-700">
//               Veterinaria: {veterinariaUsuario.nombre}
//             </h2>

//             {turnosSolicitados.length === 0 ? (
//               <p className="text-xl text-gray-600">
//                 No tienes turnos solicitados.
//               </p>
//             ) : (
//               <ul className="space-y-4">
//                 {turnosSolicitados.map((turno) => (
//                   <li
//                     key={turno.uri}
//                     className="bg-[#EEB87C] p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
//                   >
//                     <h2 className="text-2xl font-bold text-gray-800">
//                       {turno.name}
//                     </h2>
//                     <p className="mt-2 text-black">
//                       <strong>Fecha:</strong>{" "}
//                       {new Date(turno.start_time).toLocaleString()}
//                     </p>
//                     <p
//                       className={`text-sm mt-2 ${
//                         turno.status === "active"
//                           ? "text-green-500"
//                           : "text-red-800"
//                       }`}
//                     >
//                       <strong>Estado:</strong>{" "}
//                       {turno.status === "active" ? "Activo" : "Cancelado"}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </>
//         ) : (
//           <p className="text-xl text-red-600">
//             No tienes una veterinaria registrada.
//           </p>
//         )
//       ) : (
//         <p className="text-xl text-red-600">
//           Por favor, inicia sesión para ver tus turnos.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ScheduledAppointments;
