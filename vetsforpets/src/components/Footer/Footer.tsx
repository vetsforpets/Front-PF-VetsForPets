"use client";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bottom-0 w-full mt-14">
      <div className="relative w-full flex justify-center items-start pt-[139px]">
        {/* Imagen SVG */}
        <div className="absolute left-0 z-10 flex justify-center w-full top-16">
          <Image
            src="/Footer.svg"
            alt="Logo SVG"
            width={800}
            height={300}
            className="object-contain h-auto max-w-full"
            style={{ maxWidth: "1115.84px", height: "auto" }}
          />
        </div>

        {/* Contenedor del Footer */}
        <div className="relative z-0 w-full px-0 py-24 pb-0 ">
          <div className="flex flex-col items-center w-full md:flex-row justify-evenly md:items-start md:gap-8 bg-customLightBrown">
            {/* Vets For Pets */}
            <div className="flex flex-col items-center flex-auto mt-20 text-center mb-14">
              <h2 className="mb-4 text-lg text-black font-tenor">
                Vets For Pets
              </h2>
              <p className="text-center font-kiwi">
                Cuidamos la salud y el bienestar de tus mascotas. <br></br> Con
                un equipo profesional listo para brindar la mejor atención.
              </p>
            </div>

            {/* Enlaces Rápidos */}
            <div className="flex flex-col items-center flex-auto mt-10 text-center">
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
            <div className="flex flex-col items-center flex-auto mt-20 mb-6 text-center">
              <h2 className="mb-4 text-lg text-black font-tenor">
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
