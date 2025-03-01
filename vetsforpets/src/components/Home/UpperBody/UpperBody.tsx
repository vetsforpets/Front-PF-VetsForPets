"use client";
import Image from "next/image";
import dog2 from "@/../public/images/dog2.png";
import lupa from "@/../public/images/lupa.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function UpperBody() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <div>
      <div className="bg-[#DDA15E] h-[850px] flex justify-evenly items-center flex-col md:flex-row">
        <div className="flex flex-col justify-center h-full mt-12 md:w-1/2 md:ml-32">
          <Image
            src={dog2}
            width={350}
            height={300}
            alt="Perro corriendo"
            className="self-start md:self-start md:w-[70%]"
          />
        </div>

        <div className="flex flex-col items-center pt-10 text-center md:pt-0 md:w-1/2 md:text-left md:mr-8">
          <p className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl">
            <strong>Vets For Pets</strong>
          </p>

          <p className="p-1 text-xl sm:text-2xl">Encontrá tu</p>
          <p className="p-1 text-xl sm:text-2xl">
            <strong>VETERINARIA</strong>
          </p>
          <p className="p-1 text-xl sm:text-2xl">mas cercana</p>
          <div className="flex items-center mt-3 text-lg sm:text-xl w-full md:w-[80%] mb-12">
            <input
              type="text"
              placeholder="Tu ubicación..."
              className="p-2 rounded-md w-full h-12 border-none focus:outline-none focus:ring-2 focus:ring-[#F4A300] shadow-md transition-shadow duration-300 ease-in-out focus:shadow-lg"
            />
            <button className="ml-2">
              <Image src={lupa} width={30} height={30} alt="Lupa" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
