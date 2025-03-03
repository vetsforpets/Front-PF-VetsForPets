// import React from 'react'
// import Link from "next/link"

// const IndexRegister = () => {

//   return (
//     <div className="flex items-center justify-center min-h-80 ">
//       <div className="flex flex-wrap items-center justify-center gap-8 py-8">
//         <Link href={"/pet-owner-form"}>
//         <div
//           className="flex flex-col items-center justify-center w-64 h-40 transition duration-500 shadow-lg cursor-pointer bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige rounded-2xl hover:shadow-xl"
//           >
//           <h2 className="text-lg font-semibold">Registro de Tutor</h2>
//         </div>
//           </Link>
//           <Link href={"/vet-form"}>
//         <div
//           className="flex flex-col items-center justify-center w-64 h-40 transition duration-500 shadow-lg cursor-pointer bg-customLightBrown hover:bg-customHardBrown hover:text-customBeige rounded-2xl hover:shadow-xl"
//           >
//           <h2 className="text-lg font-semibold">Registro de Veterinario</h2>
//         </div>
//           </Link>
//       </div>
//     </div>
//   );
// };

// export default IndexRegister
import React from 'react';
import Link from 'next/link';

const PetImageSection: React.FC = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Imagen izquierda */}
      <Link href="/pet-owner-form">
        <div className="relative w-1/2 overflow-hidden md:w-full h-1/2 md:h-full group">
          <img
            src="/woman-growing-plants-home-holding-cat 8.11.37 p. m..jpg"
            alt="Imagen 1"
            className="object-cover w-full h-full transition-all duration-300 filter blur-none md:blur-sm saturate-60 group-hover:saturate-100 group-hover:blur-none"
          />
          <h1 className="absolute text-5xl font-bold text-white transform -translate-y-1/2 top-1/2 right-10 text-shadow">
            Dueño
          </h1>
          <div className="absolute inset-y-0 right-0 w-1 transition-all duration-300 bg-white shadow-lg opacity-0 group-hover:opacity-100"></div>
        </div>
      </Link>

      {/* Imagen derecha */}
      <Link href="/vet-form">
        <div className="relative w-1/2 overflow-hidden md:w-full h-1/2 md:h-full group">
          <img
            src="/veterinarian-taking-care-pet-dog.jpg 20-10-39-116.jpg"
            alt="Imagen 2"
            className="object-cover w-full h-full transition-all duration-300 filter md:blur-sm blur-none saturate-60 group-hover:saturate-100 group-hover:blur-none"
          />
          <h1 className="absolute text-5xl font-bold text-white transform -translate-y-1/2 top-1/2 left-10 text-shadow">
            Veterinaria
          </h1>
          <div className="absolute inset-y-0 left-0 w-1 transition-all duration-300 bg-white shadow-lg opacity-0 group-hover:opacity-100"></div>
        </div>
      </Link>
    </div>
  );
};

export default PetImageSection;