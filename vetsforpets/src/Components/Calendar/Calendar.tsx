"use client"

import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";

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
        const data = [
            { id: 1, nombre: "Veterinaria Alfredo", url: "https://calendly.com/hugooeseverri" },
            { id: 2, nombre: "Veterinaria Maria Paz", url: "https://calendly.com/pazroscianorivas" },
            { id: 3, nombre: "Veterinaria Dr. Paso", url: "https://calendly.com/veterninariadrpaso" },
            { id: 4, nombre: "Clínica Veterinaria Layús", url: "https://calendly.com/layusclinicaveterinaria" },
        ];
        setVeterinarias(data);
    }, []);

    const veterinariasFiltradas = veterinarias.filter(vet =>
        vet.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="App p-4">
            <h2 className="text-black text-center text-4xl m-5">Buscar veterinaria</h2>
            <div className=" rounded-2xl p-10">
                <input
                    type="text"
                    placeholder="Buscar veterinaria..."
                    className="border rounded-2xl w-full px-[150px]"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setTimeout(() => setFocus(false), 200)}
                />
                
                {(focus || busqueda) && (
                    <ul className="border rounded bg-white shadow-md ">
                        {veterinariasFiltradas.map((vet) => (
                            <li
                                key={vet.id}
                                className="cursor-pointer p-2 hover:bg-gray-200"
                                onMouseDown={() => setVeterinariaSeleccionada(vet.url)}
                            >
                                {vet.nombre}
                            </li>
                        ))}
                    </ul>
                )}
                
                {veterinariaSeleccionada && (
                    <div >
                        <InlineWidget url={veterinariaSeleccionada} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendlySearch;
