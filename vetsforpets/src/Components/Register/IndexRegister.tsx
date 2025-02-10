import React from 'react'
import Link from "next/link"

const IndexRegister = () => {

  return (
    <div className="flex items-center justify-center min-h-80 ">
      <div className="flex gap-6 flex-wrap items-center justify-center py-6">
        <Link href={"/pet-owner-form"}>
        <div
          className="w-64 h-40 flex flex-col items-center justify-center bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition duration-500"
          >
          <h2 className="text-lg font-semibold">Registro de Dueño</h2>
        </div>
          </Link>
          <Link href={"/vet-form"}>
        <div
          className="w-64 h-40 flex flex-col items-center justify-center bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition duration-500"
          >
          <h2 className="text-lg font-semibold">Registro de Veterinario</h2>
        </div>
          </Link>
      </div>
    </div>
  );
};

export default IndexRegister