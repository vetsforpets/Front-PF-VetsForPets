import React from 'react'
import Link from "next/link"

const IndexRegister = () => {

  return (
    <div className="flex items-center justify-center min-h-80 ">
      <div className="flex flex-wrap items-center justify-center gap-8 py-8">
        <Link href={"/pet-owner-form"}>
        <div
          className="flex flex-col items-center justify-center w-64 h-40 transition duration-500 shadow-lg cursor-pointer bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige rounded-2xl hover:shadow-xl"
          >
          <h2 className="text-lg font-semibold">Registro de Tutor</h2>
        </div>
          </Link>
          <Link href={"/vet-form"}>
        <div
          className="flex flex-col items-center justify-center w-64 h-40 transition duration-500 shadow-lg cursor-pointer bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige rounded-2xl hover:shadow-xl"
          >
          <h2 className="text-lg font-semibold">Registro de Veterinario</h2>
        </div>
          </Link>
      </div>
    </div>
  );
};

export default IndexRegister