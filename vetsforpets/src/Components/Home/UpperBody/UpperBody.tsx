"use client"
import Image from "next/image";
import dog2 from "@/../public/images/dog2.png";
import lupa from "@/../public/images/lupa.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function UpperBody() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Duración de la animación en milisegundos
      once: true,     // La animación se ejecuta solo una vez al hacer scroll
    });
  }, []);


  return (
    <div>
      <div className="bg-[#DDA15E] h-[700px] flex justify-evenly items-center">
        <div>
          <Image
            src={dog2}
            width={600}
            height={500}
            alt="Perro corriendo"
            className="mb-[115px]"
          />
        </div>
        <div className="text-black text-5xl flex items-center flex-col">
          <p className="p-2">Encontrá tu</p>
          <p className="p-2">
            <strong>VETERINARIA</strong>
          </p>
          <p className="p-2">más</p>
          <p className="p-2">
            <strong>CERCANA</strong>
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Tu zona o ubicación"
              className="p-2 rounded-md w-[100px] md:w-[300px] border-none focus:outline-none focus:ring-2 focus:ring-[#F4A300] shadow-md transition-shadow duration-300 ease-in-out focus:shadow-lg"
            />
            <button className="ml-2">
              <Image src={lupa} width={30} height={30} alt="Lupa" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center text-6xl font-tenor mt-9">Noticias</h2>
        </div>


      <div className="flex justify-center items-center p-12">      
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-[1000px]">
    <div className="w-full sm:w-[400px] md:w-[500px] text-center rounded-2xl p-2 flex flex-col items-center" data-aos="fade-right">
      <Image
        src="/imagenparahome.svg"
        width={500}
        height={500}
        alt="Perro corriendo"
        layout="intrinsic"
        className="mx-auto font-tenor-sans"
      />
      <p className="text-gray-700 p-4 w-full mx-auto bg-customLightBrown rounded-b-2xl">
        Descripción de la imagen 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat porro natus
        sapiente pariatur adipisci hic sunt ipsum iure libero exercitationem aperiam inventore distinctio eveniet sit
        officiis repellat neque, numquam commodi.
      </p>
    </div>

    <div className="w-full sm:w-[400px] md:w-[500px] text-center rounded-2xl p-2 flex flex-col items-center" data-aos="fade-left">
      <Image
        src="/imagenparahome.svg"
        width={500}
        height={500}
        alt="Perro corriendo"
        layout="intrinsic"
        className="mx-auto font-tenor-sans"
      />
      <p className="text-gray-700 p-4 w-full mx-auto bg-customLightBrown rounded-b-2xl">
        Descripción de la imagen 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat porro natus
        sapiente pariatur adipisci hic sunt ipsum iure libero exercitationem aperiam inventore distinctio eveniet sit
        officiis repellat neque, numquam commodi.
      </p>
    </div>
  </div>
</div>


      <div className="flex justify-center items-center space-x-4">
        <div className="w-[1000px] text-center rounded-2xl p-2 flex flex-col items-center" data-aos="fade-up">
          <Image
            src="/gatos 2.svg"
            width={1000}
            height={1000}
            alt="Perro corriendo"
            layout="intrinsic"
            className="mx-auto font-tenor-sans"
          />
          <p className="font-kiwi text-gray-700 p-4 w-full mx-auto bg-customLightBrown rounded-b-2xl">
            Descripción de la imagen 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat porro natus
            sapiente pariatur adipisci hic sunt ipsum iure libero exercitationem aperiam inventore distinctio eveniet sit
            officiis repellat neque, numquam commodi.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-center text-6xl font-tenor m-9">Veterinarias destacadas</h2>
        <div className="flex justify-center items-center">


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>


            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-[300px] text-center rounded-2xl p-2" data-aos="fade-up">
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="mx-auto font-tenor-sans w-full h-auto object-cover"
              />
              <div className="bg-customLightBrown rounded-b-2xl flex justify-end p-3">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
