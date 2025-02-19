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

    const veterinarias = useMemo(() => [
        {
            id: 1,
            nombre: "Veterinaria Alfredo",
            email: "hugooeseverri@gmail.com",
            url: "https://calendly.com/hugooeseverri/veterinaria-alfredo",
            calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81",
            calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN,
        },
        {
            id: 2,
            nombre: "Veterinaria Maria Paz",
            email: "pazroscianorivas@gmail.com",
            url: "https://calendly.com/pazroscianorivas",
            calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/5fe4d7ec-c635-487c-a068-9b8d5b7f0390",
            calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_MARIA,
        },
        {
            id: 3,
            nombre: "Veterinaria Layus",
            email: "layusclinicaveterinaria@gmail.com",
            url: "https://calendly.com/layusclinicaveterinaria/veterinaria-layus",
            calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/f41e5086-afe3-4db1-84a1-787a3a82139b",
            calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
        },
    ], []);

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
        <div className="container p-4 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Turnos</h1>

            {userEmail ? (
                veterinariaUsuario ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-700">Veterinaria: {veterinariaUsuario.nombre}</h2>

                        {turnosSolicitados.length === 0 ? (
                            <p className="text-xl text-gray-600">No tienes turnos solicitados.</p>
                        ) : (
                            <ul className="space-y-4">
                                {turnosSolicitados.map((turno) => (
                                    <li
                                        key={turno.uri}
                                        className="bg-[#EEB87C] p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-800">{turno.name}</h2>
                                        <p className="mt-2 text-black">
                                            <strong>Fecha:</strong> {new Date(turno.start_time).toLocaleString()}
                                        </p>
                                        <p
                                            className={`text-sm mt-2 ${turno.status === "active" ? "text-green-500" : "text-red-800"}`}
                                        >
                                            <strong>Estado:</strong> {turno.status === "active" ? "Activo" : "Cancelado"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <p className="text-xl text-red-600">No tienes una veterinaria registrada.</p>
                )
            ) : (
                <p className="text-xl text-red-600">Por favor, inicia sesión para ver tus turnos.</p>
            )}
        </div>
    );
};

export default ScheduledAppointments;

















// "use client";
// import { useEffect, useState, useMemo } from "react";
// import { useUserStore } from "@/store";

// const ScheduledAppointments = () => {
//     const [turnosSolicitados, setTurnosSolicitados] = useState<any[]>([]);
//     const userData = useUserStore((state) => state.userData);

//     const veterinarias = [
//         {
//             id: 1,
//             nombre: "Veterinaria Alfredo",
//             email: "hugooeseverri@gmail.com",
//             url: "https://calendly.com/hugooeseverri/veterinaria-alfredo",
//             calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81",
//             calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN,
//         },
//         {
//             id: 2,
//             nombre: "Veterinaria Maria Paz",
//             email: "pazroscianorivas@gmail.com",
//             url: "https://calendly.com/pazroscianorivas",
//             calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/5fe4d7ec-c635-487c-a068-9b8d5b7f0390",
//             calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_MARIA,
//         },
//         {
//             id: 3,
//             nombre: "Veterinaria Layus",
//             email: "layusclinicaveterinaria@gmail.com",
//             url: "https://calendly.com/layusclinicaveterinaria/veterinaria-layus",
//             calendlyUserUri: "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/f41e5086-afe3-4db1-84a1-787a3a82139b",
//             calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
//         },
//     ];

//     const userEmail = userData?.email || null;

//     const veterinariaUsuario = useMemo(() => {
//         console.log("Buscando veterinaria para el usuario con email:", userEmail);
//         const vet = veterinarias.find((vet) => vet.email === userEmail);
//         console.log("Veterinaria encontrada:", vet);
//         return vet;
//     }, [userEmail]);

//     useEffect(() => {
//         const fetchTurnosSolicitados = async () => {
//             console.log("Ejecutando fetch de turnos solicitados...");
//             if (!userEmail || !veterinariaUsuario) {
//                 console.log("No se ha encontrado un usuario o veterinaria válida.");
//                 return; // Si no hay un correo de usuario o veterinaria válida, no hacer la solicitud
//             }

//             try {
//                 console.log("Fetching turnos for:", veterinariaUsuario?.nombre);
//                 console.log("URI de Calendly:", veterinariaUsuario?.calendlyUserUri);

//                 const res = await fetch(veterinariaUsuario.calendlyUserUri, {
//                     headers: {
//                         Authorization: `Bearer ${veterinariaUsuario.calendlyToken}`,
//                     },
//                 });

//                 console.log("Respuesta del fetch:", res);

//                 if (!res.ok) {
//                     const errorText = await res.text();
//                     console.error("Error de API Calendly:", errorText);
//                     throw new Error("Failed to fetch turnos");
//                 }

//                 const data = await res.json();
//                 console.log("Datos obtenidos de la API Calendly:", data);

//                 if (data.collection) {
//                     console.log("Colección de turnos:", data.collection);
//                     setTurnosSolicitados(data.collection);
//                 } else {
//                     console.error("No se encontraron turnos.");
//                     setTurnosSolicitados([]);
//                 }
//             } catch (error) {
//                 console.error("Error al obtener los turnos:", error);
//             }
//         };

//         console.log("Dependencias de useEffect:", [userEmail, veterinariaUsuario]);
//         fetchTurnosSolicitados();
//     }, [userEmail, veterinariaUsuario]); // Dependencias del useEffect

//     const eliminarTurnosCancelados = () => {
//         console.log("Eliminando turnos cancelados...");
//         const turnosActivos = turnosSolicitados.filter((turno) => !turno.cancellation);
//         console.log("Turnos después de eliminar los cancelados:", turnosActivos);

//         setTurnosSolicitados(turnosActivos);
//         localStorage.setItem("turnosSolicitados", JSON.stringify(turnosActivos));
//     };

//     return (
//         <div className="container p-4 mx-auto">
//             <h1 className="mb-6 text-3xl font-bold text-gray-800">Turnos</h1>

//             {userEmail ? (
//                 veterinariaUsuario ? (
//                     <>
//                         <h2 className="text-2xl font-semibold text-gray-700">Veterinaria: {veterinariaUsuario.nombre}</h2>

//                         {turnosSolicitados.length === 0 ? (
//                             <p className="text-xl text-gray-600">No tienes turnos solicitados.</p>
//                         ) : (
//                             <ul className="space-y-4">
//                                 {turnosSolicitados.map((turno: any) => (
//                                     <li
//                                         key={turno.uri}
//                                         className="bg-[#EEB87C] p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
//                                     >
//                                         <h2 className="text-2xl font-bold text-gray-800">{turno.name}</h2>
//                                         <p className="mt-2 text-black">
//                                             <strong>Fecha:</strong> {new Date(turno.start_time).toLocaleString()}
//                                         </p>
//                                         <p
//                                             className={`text-sm mt-2 ${
//                                                 turno.status === "active" ? "text-green-500" : "text-red-800"
//                                             }`}
//                                         >
//                                             <strong>Estado:</strong> {turno.status === "active" ? "Activo" : "Cancelado"}
//                                         </p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </>
//                 ) : (
//                     <p className="text-xl text-red-600">No tienes una veterinaria registrada.</p>
//                 )
//             ) : (
//                 <p className="text-xl text-red-600">Por favor, inicia sesión para ver tus turnos.</p>
//             )}
//         </div>
//     );
// };

// export default ScheduledAppointments;










// "use client";
// import { useEffect, useState, useMemo } from "react";
// import { useUserStore } from "@/store";

// interface Veterinaria {
//   id: number;
//   nombre: string;
//   email: string;
//   url: string;
//   calendlyUserUri: string;
//   calendlyToken?: string;
// }

// interface Turno {
//   uri: string;
//   name: string;
//   start_time: string;
//   status: "active" | "canceled";
// }

// const ScheduledAppointments = () => {
//   const [turnosSolicitados, setTurnosSolicitados] = useState<Turno[]>([]);
//   const userData = useUserStore((state) => state.userData);

//   const veterinarias: Veterinaria[] = [
//     {
//       id: 1,
//       nombre: "Veterinaria Alfredo",
//       email: "hugooeseverri@gmail.com",
//       url: "https://calendly.com/hugooeseverri/veterinaria-alfredo",
//       calendlyUserUri:
//         "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/fbc5db7a-8c9e-4442-bfa4-b51cbc78ef81",
//       calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN,
//     },
//     {
//       id: 2,
//       nombre: "Veterinaria Maria Paz",
//       email: "pazroscianorivas@gmail.com",
//       url: "https://calendly.com/pazroscianorivas",
//       calendlyUserUri:
//         "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/5fe4d7ec-c635-487c-a068-9b8d5b7f0390",
//       calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_MARIA,
//     },
//     {
//       id: 3,
//       nombre: "Veterinaria Layus",
//       email: "layusclinicaveterinaria@gmail.com",
//       url: "https://calendly.com/layusclinicaveterinaria/veterinaria-layus",
//       calendlyUserUri:
//         "https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/f41e5086-afe3-4db1-84a1-787a3a82139b",
//       calendlyToken: process.env.NEXT_PUBLIC_CALENDLY_TOKEN_LAYUS,
//     },
//   ];

//   const userEmail = userData?.email || null;

//   const veterinariaUsuario = useMemo<Veterinaria | undefined>(() => {
//     console.log("Buscando veterinaria para el usuario con email:", userEmail);
//     const vet = veterinarias.find((vet) => vet.email === userEmail);
//     console.log("Veterinaria encontrada:", vet);
//     return vet;
//   }, [userEmail]);

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

//         const res = await fetch(veterinariaUsuario.calendlyUserUri, {
//           headers: {
//             Authorization: `Bearer ${veterinariaUsuario.calendlyToken}`,
//           },
//         });

//         console.log("Respuesta del fetch:", res);

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error("Error de API Calendly:", errorText);
//           throw new Error("Failed to fetch turnos");
//         }

//         const data: { collection: Turno[] } = await res.json();
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
