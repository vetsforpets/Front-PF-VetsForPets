"use client";

import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";

// Definir la interfaz para el tipo de veterinaria
interface Veterinaria {
    id: number;
    nombre: string;
    url: string;
}

const CalendlySearch = () => {
    const [busqueda, setBusqueda] = useState("");
    const [veterinarias, setVeterinarias] = useState<Veterinaria[]>([]);
    const [veterinariaSeleccionada, setVeterinariaSeleccionada] = useState<string | null>(null);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        const data: Veterinaria[] = [
            { id: 1, nombre: "Veterinaria Alfredo", url: "https://calendly.com/hugooeseverri?primary_color=DDA15E" },
            { id: 2, nombre: "Veterinaria Maria Paz", url: "https://calendly.com/pazroscianorivas?primary_color=DDA15E" },
            {id: 3, nombre: "Veterinaria Layus", url: "https://calendly.com/layusclinicaveterinaria/veterinaria-layus?primary_color=DDA15E"}
        ];
        setVeterinarias(data);
    }, []);

    const veterinariasFiltradas = veterinarias.filter(vet =>
        vet.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-4 App">
            <h2 className="m-5 text-4xl text-center text-black">Solicitar turno</h2>
            <div className="p-10 rounded-2xl">
                <div className="flex justify-center w-full">
                    <input
                        type="text"
                        placeholder="Lista de veterinarias"
                        className="border rounded-2xl w-[500px] px-[150px] text-center"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setTimeout(() => setFocus(false), 200)}
                    />
                </div>

                {(focus || busqueda) && (
                    <div className="flex justify-center">
                        <ul className="border rounded bg-white shadow-md w-[500px]">
                            {veterinariasFiltradas.map((vet) => (
                                <li
                                    key={vet.id}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onMouseDown={() => setVeterinariaSeleccionada(vet.url)}
                                >
                                    {vet.nombre}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {veterinariaSeleccionada && (
                    <div>
                        <InlineWidget url={veterinariaSeleccionada} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendlySearch;

































// "use client"

// import React, { useState, useEffect } from "react";
// import { InlineWidget } from "react-calendly";

// const CalendlySearch = () => {
//     const [busqueda, setBusqueda] = useState("");
//     const [veterinarias, setVeterinarias] = useState<any[]>([]);
//     const [veterinariaSeleccionada, setVeterinariaSeleccionada] = useState<string | null>(null);
//     const [focus, setFocus] = useState(false);

//     useEffect(() => {
//         const data = [
//             { id: 1, nombre: "Veterinaria Alfredo", url: "https://calendly.com/hugooeseverri?primary_color=DDA15E" },
//             { id: 2, nombre: "Veterinaria Maria Paz", url: "https://calendly.com/pazroscianorivas" },
//         ];
//         setVeterinarias(data);
//     }, []);

//     const veterinariasFiltradas = veterinarias.filter(vet =>
//         vet.nombre.toLowerCase().includes(busqueda.toLowerCase())
//     );

//     return (
//         <div className="p-4 App">
//             <h2 className="m-5 text-4xl text-center text-black">Solicitar turno</h2>
//             <div className="p-10 rounded-2xl">
//                 <div className="flex justify-center w-full">
//                     <input
//                         type="text"
//                         placeholder="Lista de veterinarias"
//                         className="border rounded-2xl w-[500px] px-[150px] text-center"
//                         value={busqueda}
//                         onChange={(e) => setBusqueda(e.target.value)}
//                         onFocus={() => setFocus(true)}
//                         onBlur={() => setTimeout(() => setFocus(false), 200)}
//                     />
//                 </div>

//                 {(focus || busqueda) && (
//                     <div className="flex justify-center">
//                         <ul className="border rounded bg-white shadow-md w-[500px]">
//                             {veterinariasFiltradas.map((vet) => (
//                                 <li
//                                     key={vet.id}
//                                     className="p-2 cursor-pointer hover:bg-gray-200"
//                                     onMouseDown={() => setVeterinariaSeleccionada(vet.url)}
//                                 >
//                                     {vet.nombre}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 {veterinariaSeleccionada && (
//                     <div >
//                         <InlineWidget url={veterinariaSeleccionada} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CalendlySearch;

// "use client";

// import React, { useState, useEffect } from "react";
// import { InlineWidget } from "react-calendly";

// interface Veterinaria {
//   id: number;
//   nombre: string;
//   url: string;
// }

// const CalendlySearch = () => {
//   const [busqueda, setBusqueda] = useState<string>("");
//   const [veterinarias, setVeterinarias] = useState<Veterinaria[]>([]);
//   const [veterinariaSeleccionada, setVeterinariaSeleccionada] = useState<
//     string | null
//   >(null);
//   const [focus, setFocus] = useState<boolean>(false);

//   useEffect(() => {
//     const data: Veterinaria[] = [
//       {
//         id: 1,
//         nombre: "Veterinaria Alfredo",
//         url: "https://calendly.com/hugooeseverri?primary_color=DDA15E",
//       },
//       {
//         id: 2,
//         nombre: "Veterinaria Maria Paz",
//         url: "https://calendly.com/pazroscianorivas",
//       },
//     ];
//     setVeterinarias(data);
//   }, []);

//   const veterinariasFiltradas = veterinarias.filter((vet) =>
//     vet.nombre.toLowerCase().includes(busqueda.toLowerCase())
//   );

//   return (
//     <div className="p-4 App">
//       <h2 className="m-5 text-4xl text-center text-black">Solicitar turno</h2>
//       <div className="p-10 rounded-2xl">
//         <div className="flex justify-center w-full">
//           <input
//             type="text"
//             placeholder="Lista de veterinarias"
//             className="border rounded-2xl w-[500px] px-[150px] text-center"
//             value={busqueda}
//             onChange={(e) => setBusqueda(e.target.value)}
//             onFocus={() => setFocus(true)}
//             onBlur={() => setTimeout(() => setFocus(false), 200)}
//           />
//         </div>

//         {(focus || busqueda) && (
//           <div className="flex justify-center">
//             <ul className="border rounded bg-white shadow-md w-[500px]">
//               {veterinariasFiltradas.map((vet) => (
//                 <li
//                   key={vet.id}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onMouseDown={() => setVeterinariaSeleccionada(vet.url)}
//                 >
//                   {vet.nombre}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {veterinariaSeleccionada && (
//           <div>
//             <InlineWidget url={veterinariaSeleccionada} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CalendlySearch;
