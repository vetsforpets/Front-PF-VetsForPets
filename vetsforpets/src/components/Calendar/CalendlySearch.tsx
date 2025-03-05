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
            { id: 1, nombre: "Veterinaria Layus", url: "https://calendly.com/veterinarialayus?primary_color=DDA15E" },
            { id: 2, nombre: "Veterinaria Dr.Paso", url: "https://calendly.com/veterinariapaso65?primary_color=DDA15E" },
            { id: 3, nombre: "Veterinaria Crena", url: "https://calendly.com/veterinariacrena8?primary_color=DDA15E" },
            { id: 4, nombre: "Veterinaria Copello", url: "https://calendly.com/veterinariacopello2?primary_color=DDA15E" },
            { id: 5, nombre: "Veterinaria Animal House", url: "https://calendly.com/veterinariaanimalhousemdq?primary_color=DDA15E" },
            { id: 6, nombre: "Veterinaria Antartida Argentina", url: "https://calendly.com/veterinariaantartidaargentina?primary_color=DDA15E" },
            { id: 7, nombre: "Veterinaria Alberti", url: "https://calendly.com/veterinariaalberti95?primary_color=DDA15E" },
            { id: 8, nombre: "Veterinaria Sigismondi", url: "https://calendly.com/veterinariasigismondi19?primary_color=DDA15E" },
            { id: 9, nombre: "Veterinaria Los Corrales", url: "https://calendly.com/veterinarialoscorrales9?primary_color=DDA15E" },
            { id: 10, nombre: "Veterinaria La Rinconada", url: "https://calendly.com/veterinarialarinconada28?primary_color=DDA15E" },


        ];
        setVeterinarias(data);
    }, []);

    const veterinariasFiltradas = veterinarias.filter(vet =>
        vet.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-4 App">
            <h2 className="m-5 text-2xl text-center text-customDarkGreen">Elegí tu veterinaria de confianza y reservá un turno de manera rápida y sencilla</h2>
            <div className="p-10 rounded-2xl">
                <div className="flex justify-center w-full">
                    <input
                        type="text"
                        placeholder="Lista de veterinarias"
                        className="border border-customBrown bg-customBeige rounded-2xl w-full sm:w-[500px] px-4 py-2 text-center"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setTimeout(() => setFocus(false), 200)}
                    />
                </div>

                {(focus || busqueda) && (
                    <div className="flex justify-center mt-4">
                        <ul className="border rounded bg-white shadow-md w-full sm:w-[500px]">
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
                    <div className="mt-4">
                        <InlineWidget url={veterinariaSeleccionada} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendlySearch;