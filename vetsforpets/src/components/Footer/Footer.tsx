"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 mt-14">
      <div className="relative w-full flex justify-center items-start pt-[139px]">
        {/* Imagen SVG */}
        <div className="absolute top-0 left-0 w-full flex justify-center z-10 overflow-hidden">
          <Image
            src="/Footer.svg"
            alt="Logo SVG"
            width={800}
            height={300}
            className="max-w-full h-auto object-contain"
            style={{ maxWidth: "1115.84px", height: "auto" }}
          />
        </div>

        {/* Contenedor del Footer */}
        <div className="w-full px-0 py-24 pb-0 relative z-0 ">
          <div className="w-full flex flex-col md:flex-row justify-evenly items-center md:items-start md:gap-8 bg-customLightBrown">
            {/* Vets For Pets */}
            <div className="flex-auto text-center flex flex-col items-center mt-20 mb-14">
              <h2 className="text-black text-lg font-tenor mb-4">
                Vets For Pets
              </h2>
              <p className="font-kiwi text-center">
                Cuidamos la salud y el bienestar de tus mascotas. <br></br> Con
                un equipo profesional listo para brindar la mejor atención.
              </p>
            </div>

            {/* Enlaces Rápidos */}
            <div className="flex-auto text-center flex flex-col items-center mt-10">
              <h2 className="text-black text-lg font-tenor mb-4">
                Enlaces Rápidos
              </h2>
              <ul className="font-kiwi space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-customDarkGreen transition-colors duration-300"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-customGreen transition-colors duration-300"
                  >
                    Botón de emergencia
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-customBrown transition-colors duration-300"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-customBeige transition-colors duration-300"
                  >
                    Veterinarias
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contáctanos */}
            <div className="flex-auto text-center flex flex-col items-center mt-20 mb-6">
              <h2 className="text-black text-lg font-tenor mb-4">
                Contáctanos
              </h2>
              <p className="mb-2">📞 +1 234 567 890</p>
              <p>✉️ contacto@innova.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
