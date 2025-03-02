"use client"
import dynamic from "next/dynamic";

// Deshabilitamos SSR para el componente de mapas
const MapComponent = dynamic(
  () => import("../../components/Maps/Maps"),
  { ssr: false }
);

export default function Login() {
  return (
    <div>
      <MapComponent />
    </div>
  );
}
