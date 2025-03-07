"use client"
import dynamic from "next/dynamic";
import CalendlySearch from "../Calendar/CalendlySearch";

const Veterinary = () => {

    const MapComponent = dynamic(() => import("../Maps/Maps"), { ssr: false });

    return (
        <>
        <MapComponent />
        <CalendlySearch />
        </>
  )
}

export default Veterinary