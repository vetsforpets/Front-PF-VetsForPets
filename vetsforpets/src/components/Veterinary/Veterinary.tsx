"use client";
import dynamic from "next/dynamic";
import CalendlySearch from "../Calendar/CalendlySearch";
import { useUserStore } from "@/store";

const Veterinary = () => {
  const { userData } = useUserStore();

  const MapComponent = dynamic(() => import("../Maps/Maps"), { ssr: false });

  return (
    <>
      {userData?.role === "USER" ? (
        <>
          <MapComponent />
          <CalendlySearch />
        </>
      ) : (
        <MapComponent />
      )}
    </>
  );
};

export default Veterinary;
