"use client"
import { useState } from "react";
import LocationSearch from "./Search";

const Formulario = ({ onUbicacionSeleccionada }: { onUbicacionSeleccionada: (lat: number, lon: number) => void }) => {
  const [ubicacion, setUbicacion] = useState({ lat: 0, lon: 0 });
  const [nombre, setNombre] = useState("");

  const limpiarFormulario = () => {
    setNombre("");
    setUbicacion({ lat: 0, lon: 0 });
  };

  const manejarSeleccionUbicacion = (lat: number, lon: number) => {
    console.log("Ubicación seleccionada:", lat, lon, );
    setUbicacion({ lat, lon });
    onUbicacionSeleccionada(lat, lon);
  };

  const manejarEnvio = (e: React.FormEvent, resetSearch: () => void) => {
    e.preventDefault();

    console.log("Datos del formulario guardados localmente:", { nombre, ubicacion });

    limpiarFormulario();
    resetSearch(); 
  };

  return (
    <LocationSearch
      onSelect={manejarSeleccionUbicacion}
      onReset={limpiarFormulario} 
      onSubmit={manejarEnvio} 
    />
  );
};

export default Formulario;
