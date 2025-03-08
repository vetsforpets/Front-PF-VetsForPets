"use client";
import dynamic from "next/dynamic";
import CalendlySearch from "../Calendar/CalendlySearch";
import { useUserStore } from "@/store";
import Link from "next/link";

const Veterinary = () => {
  const { userData } = useUserStore();

  const MapComponent = dynamic(() => import("../Maps/Maps"), { ssr: false });

  return (
    <>
      {!userData ? (
        <div className="flex gap-3 flex-col items-center text-center mx-auto w-1/3 p-10 rounded-full mt-10 bg-customHardBrown text-white">
          Debes estar Logeado para acceder a las veterinarias
          <Link
            href="/login"
            className=" bg-customBrown hover:bg-customHardBeige cursor-pointer text-black mt-3 text-lg sm:text-xl w-fit py-2 px-10 rounded-full"
          >
            Iniciar sesión
          </Link>
        </div>
      ) : userData?.role === "USER" ? (
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
