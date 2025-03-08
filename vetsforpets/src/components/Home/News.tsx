"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string | StaticImageData;
  detalles: string;
}

const News = () => {
  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: "Vacunación Antirrábica Anual",
      descripcion:
        "La vacunación antirrábica es anual y obligatoria en perros y gatos...",
      imagenUrl: "/imagenparahome.svg",
      detalles:
        "La vacunación antirrábica es un procedimiento fundamental para la salud pública y el bienestar animal. Es obligatoria y debe aplicarse anualmente a perros y gatos a partir de los tres meses de edad, asegurando así una protección continua contra esta enfermedad mortal.  La vacunación es un acto de responsabilidad y compromiso con la salud de nuestras mascotas y con la prevención de brotes de rabia en la población. Por ello, se recomienda acudir a un veterinario de confianza o a campañas de vacunación organizadas por entidades gubernamentales para cumplir con este requisito de manera segura y oportuna.",
    },
    {
      id: 2,
      titulo: "Control de Peso en Mascotas",
      descripcion:
        "El sobrepeso en mascotas puede causar diversos problemas de salud...",
      imagenUrl: "/images/perroacostado.jpg",
      detalles:
        "El sobrepeso en perros y gatos puede generar una serie de problemas de salud que afectan su bienestar y calidad de vida. Entre las principales complicaciones se encuentran enfermedades cardiovasculares, ya que el exceso de peso obliga al corazón a trabajar más, aumentando el riesgo de insuficiencia cardíaca. Además, la diabetes es una de las afecciones más comunes en mascotas con sobrepeso, especialmente en los gatos, ya que el exceso de grasa puede generar resistencia a la insulina. Otros problemas incluyen trastornos articulares y óseos, como artritis y displasia de cadera, que pueden dificultar el movimiento y causar dolor crónico.  Por último, las visitas periódicas al veterinario permiten llevar un control del peso de la mascota y detectar a tiempo cualquier problema de salud asociado. Un plan de alimentación supervisado por un profesional y un estilo de vida activo contribuirán a que la mascota tenga una vida más larga, saludable y feliz.",
    },
    {
      id: 3,
      titulo: "Importancia de las Visitas Regulares al Veterinario",
      descripcion:
        "Las visitas regulares al veterinario son esenciales para detectar...",
      imagenUrl: "/gatos 2.svg",
      detalles:
        "Las visitas regulares al veterinario son fundamentales para garantizar la salud y el bienestar de tu mascota, ya que permiten detectar cualquier problema de salud en sus primeras etapas, antes de que se convierta en una afección grave." +
        "Muchas enfermedades pueden no presentar síntomas evidentes en sus fases iniciales, y solo un examen veterinario puede identificarlas a tiempo, facilitando un tratamiento más efectivo y aumentando las posibilidades de recuperación." +
        "Otro aspecto clave de estas visitas es el cumplimiento del calendario de vacunación y desparasitación." +
        "Las vacunas protegen contra enfermedades graves como:" +
        "- La rabia, el moquillo, la leptospirosis y la parvovirosis en perros." +
        "- La rinotraqueítis, la panleucopenia y la leucemia felina en gatos." +
        "La desparasitación, tanto interna como externa, es esencial para evitar infecciones por parásitos intestinales, pulgas, garrapatas y otros agentes que pueden comprometer la salud de tu mascota e incluso transmitirse a los humanos.",
    },
  ];

  const [modalContent, setModalContent] = useState<Noticia | null>(null);

  const openModal = (noticia: Noticia) => {
    setModalContent(noticia);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <h2 className="text-6xl text-center font-tenor mt-9">Noticias</h2>

      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-[1000px]">
          {noticias.slice(0, 2).map((noticia) => (
            <div
              key={noticia.id}
              className="w-full sm:w-[400px] md:w-[500px] text-center flex flex-col items-center  sm:mx-4"
              data-aos="fade-right"
            >
              <div className="relative w-full h-96">
                <Image
                  src={noticia.imagenUrl}
                  alt={noticia.titulo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
              </div>
              <div className="flex flex-col flex-grow w-full p-4 rounded-b-2xl bg-customLightBrown">
                <p className="flex-grow text-gray-700">{noticia.descripcion}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => openModal(noticia)}
                    className="px-4 py-2 rounded-md customButton"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-[1000px]">
          {noticias.slice(2, 3).map((noticia) => (
            <div
              key={noticia.id}
              className="w-full sm:w-[400px] sm:mx-4 md:w-full text-center flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="relative w-full h-96">
                <Image
                  src={noticia.imagenUrl}
                  alt={noticia.titulo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
              </div>
              <div className="flex flex-col flex-grow w-full p-4 rounded-b-2xl bg-customLightBrown">
                <p className="flex-grow text-gray-700">{noticia.descripcion}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => openModal(noticia)}
                    className="px-4 py-2 rounded-md customButton"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalClick}
        >
          <div className="w-3/4 max-w-4xl p-8 bg-white rounded-xl overflow-y-auto max-h-[80vh]">
            <h2 className="mb-4 text-2xl font-bold">{modalContent.titulo}</h2>
            <div className="relative w-full h-48 mb-4">
              <Image
                src={modalContent.imagenUrl}
                alt={modalContent.titulo}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="mb-4 text-gray-700">{modalContent.detalles}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white customButton"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
