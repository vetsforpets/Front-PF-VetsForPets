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

      <div>
        <h2 className="text-6xl text-center font-tenor mt-9">Noticias</h2>
      </div>

      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-[1000px]">
          <div
            className="w-full sm:w-[400px] md:w-[500px] text-center rounded-2xl p-2 flex flex-col items-center"
            data-aos="fade-right"
          >
            <Image
              src="/imagenparahome.svg"
              width={500}
              height={500}
              alt="Perro corriendo"
              layout="intrinsic"
              className="mx-auto font-tenor-sans"
            />
            <p className="w-full p-4 mx-auto text-gray-700 bg-customLightBrown rounded-b-2xl">
              La vacunación antirrabica es anual y obligatoria en perros y gatos
              a partir de los 3 meses de edad y debe cumplirse durante toda su
              vida. Recomendamos que la revacunación sea antes que se cumpla la
              fecha de validez de la vacuna anterior y recorda llevar esta
              constancia en caso de viajar.
            </p>
          </div>

          <div
            className="w-full sm:w-[400px] md:w-[500px] text-center rounded-2xl p-2 flex flex-col items-center"
            data-aos="fade-left"
          >
            <Image
              src="/imagenparahome.svg"
              width={500}
              height={500}
              alt="Perro corriendo"
              layout="intrinsic"
              className="mx-auto font-tenor-sans"
            />
            <p className="w-full p-4 mx-auto text-gray-700 bg-customLightBrown rounded-b-2xl">
              Descripción de la imagen 2 Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Fugiat porro natus sapiente pariatur adipisci
              hic sunt ipsum iure libero exercitationem aperiam inventore
              distinctio eveniet sit officiis repellat neque, numquam commodi.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <div
          className="w-[1000px] text-center rounded-2xl p-2 flex flex-col items-center"
          data-aos="fade-up"
        >
          <Image
            src="/gatos 2.svg"
            width={1000}
            height={1000}
            alt="Perro corriendo"
            layout="intrinsic"
            className="mx-auto font-tenor-sans"
          />
          <p className="w-full p-4 mx-auto text-gray-700 font-kiwi bg-customLightBrown rounded-b-2xl">
            Descripción de la imagen 2 Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Fugiat porro natus sapiente pariatur adipisci hic
            sunt ipsum iure libero exercitationem aperiam inventore distinctio
            eveniet sit officiis repellat neque, numquam commodi.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-6xl text-center font-tenor m-9">
          Veterinarias destacadas
        </h2>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
                <Image
                  src="/estrellas.svg"
                  width={100}
                  height={100}
                  alt="Estrellas"
                  className="min-w-[150px] h-auto object-contain"
                />
              </div>
            </div>

            <div
              className="w-[300px] text-center rounded-2xl p-2"
              data-aos="fade-up"
            >
              <Image
                src="/veterinaria.svg"
                width={300}
                height={300}
                alt="Perro corriendo"
                className="object-cover w-full h-auto mx-auto font-tenor-sans"
              />
              <div className="flex justify-end p-3 bg-customLightBrown rounded-b-2xl">
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
