"use client";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
   return (
    <footer className="w-full mt-14">

      <div className="w-full mt-0">
        <Image
          src="/footer modificado.png"
          alt="Logo SVG"
          width={1800}
          height={500}
          className="object-contain w-full h-auto"
          style={{ maxWidth: "2000px", height: "auto" }}
        />
      </div>

    
      <div className="flex flex-col items-center justify-center w-full px-8 py-12 pb-8 mt-0 space-y-8 bg-customLightBrown md:flex-row md:items-start md:gap-8 md:space-y-0">
        {/* Vets For Pets */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-0 md:w-1/4">
          <h2 className="mb-4 text-lg text-black font-tenor">
            Vets For Pets
          </h2>
          <p className="text-center font-kiwi">
            Cuidamos la salud y el bienestar de tus mascotas. Con
            un equipo profesional listo para brindar la mejor atención.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex flex-col items-center mb-12 text-center md:mb-8 md:w-1/2">
          <h2 className="mb-4 text-lg text-black font-tenor">
            Enlaces Rápidos
          </h2>
          <ul className="space-y-2 font-kiwi">
            <li>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-customDarkGreen"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors duration-300 hover:text-customGreen"
              >
                Botón de emergencia
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-customBrown"
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-customBeige"
              >
                Veterinarias
              </Link>
            </li>
          </ul>
        </div>

        {/* Contáctanos */}
        <div className="flex flex-col items-center text-center md:w-1/4">
          <h2 className="mb-4 text-lg text-black font-tenor">Contáctanos</h2>
          <p className="mb-2">📞 +54 935 767 890</p>
          <p>✉️ vetsforpets.00@gmail.com</p>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;




// "use client";
// import Image from "next/image";
// import Link from "next/link";


// const Footer = () => {
//   return (
//     <footer className="bottom-0 w-full mt-14">
//       <div className="relative w-full flex justify-center items-start pt-[139px]">
//         {/* Imagen SVG */}
//         <div className="absolute left-0 z-10 flex justify-center w-full top-16">
//           <Image
//             src="/Footer.svg"
//             alt="Logo SVG"
//             width={800}
//             height={300}
//             className="object-contain h-auto max-w-full"
//             style={{ maxWidth: "1115.84px", height: "auto" }}
//           />
//         </div>

//         {/* Contenedor del Footer */}
//         <div className="relative z-0 w-full px-0 py-24 pb-0 ">
//           <div className="flex flex-col items-center w-full md:flex-row justify-evenly md:items-start md:gap-8 bg-customLightBrown">
//             {/* Vets For Pets */}
//             <div className="flex flex-col items-center flex-auto mt-20 text-center mb-14">
//               <h2 className="mb-4 text-lg text-black font-tenor">
//                 Vets For Pets
//               </h2>
//               <p className="text-center font-kiwi">
//                 Cuidamos la salud y el bienestar de tus mascotas. <br></br> Con
//                 un equipo profesional listo para brindar la mejor atención.
//               </p>
//             </div>

//             {/* Enlaces Rápidos */}
//             <div className="flex flex-col items-center flex-auto mt-10 text-center">
//               <h2 className="mb-4 text-lg text-black font-tenor">
//                 Enlaces Rápidos
//               </h2>
//               <ul className="space-y-2 font-kiwi">
//                 <li>
//                   <Link
//                     href="#"
//                     className="transition-colors duration-300 hover:text-customDarkGreen"
//                   >
//                     Inicio
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/about"
//                     className="transition-colors duration-300 hover:text-customGreen"
//                   >
//                     Botón de emergencia
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="transition-colors duration-300 hover:text-customBrown"
//                   >
//                     Sobre nosotros
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="transition-colors duration-300 hover:text-customBeige"
//                   >
//                     Veterinarias
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contáctanos */}
//             <div className="flex flex-col items-center flex-auto mt-20 mb-6 text-center">
//               <h2 className="mb-4 text-lg text-black font-tenor">
//                 Contáctanos
//               </h2>
//               <p className="mb-2">📞 +1 234 567 890</p>
//               <p>✉️ contacto@innova.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
