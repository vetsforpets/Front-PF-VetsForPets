"use client";

import React, { useEffect } from "react";
import Image from "next/image"; 
import AOS from "aos";
import "aos/dist/aos.css";


export default function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true, 
    });
  }, []);


  const teamMembers = [
    { 
      name: "Elias Adad", 
      role: "Desarrollador Backend", 
      img: "/team/elias.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/elias-nahuel-adad", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/EliasAdad", icon: "/icons/github.png" },
    
      ]
    },
    { 
      name: "Angélica Bengelsdorff", 
      role: "Desarrolladora Frontend", 
      img: "/team/angelica.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/angelicab", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/angieb", icon: "icons/github.png" },
       
      ]
    },
    { 
      name: "Cristian Camelo", 
      role: "Desarrollador Frontend", 
      img: "/team/cristian.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/cristiancamelo", icon:"icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/CristianCamelo" , icon: "icons/github.png" },
      
      ]
    },
    { 
      name: "Hugo Eseverri", 
      role: "Desarrollador Frontend", 
      img: "/team/hugo.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/hugoeseverri", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/hugoe", icon: "icons/github.png" },
        
      ]
    },
    { 
      name: "Juan David Esparza", 
      role: "Desarrollador Backend", 
      img: "/team/juan.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/juanesparza", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/juanesparza", icon: "icons/github.png" },
      
      ]
    },
    { 
      name: "Carlos Figueira", 
      role: "Desarrollador Backend", 
      img: "/team/carlos.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/carlos-eduardo-figueira-214a64275/?locale=es_ES", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/Carlosf12", icon: "/icons/github.png" },
       
      ]
    },
    { 
      name: "Rivas Maria Paz", 
      role: "Desarrolladora Frontend", 
      img: "/team/maria.png",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/maría-paz-rivas-3aabb32bb", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/Maria-Paz-Rivas", icon: "/icons/github.png" },
      
      ]
    },
    { 
      name: "Sebastian Sanjorge", 
      role: "Desarrollador Frontend", 
      img: "/team/sebastian.jpeg",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/sebastian-sanjorge-frontend-developer", icon: "icons/linkedin.png" },
        { name: "GitHub", url: "https://github.com/tiansanjorge", icon: "/icons/github.png" },
      
      ]
    },

  ];

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center w-[90%] mx-auto">
      <h1 
        className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
        data-aos="fade-up" 
      >
        QUIÉNES SOMOS
      </h1>

      <div className="flex flex-col w-full mb-12 md:flex-row">
        <div className="flex items-center justify-center mb-4 md:w-1/2 md:mb-0">
          <Image
            src="/vfp.svg"
            alt="Imagen de nosotros"
            width={600}  
            height={400}
            className="object-contain w-full max-w-full md:w-2/3"
            data-aos="fade-up" 
          />
        </div>

        <div className="flex items-center justify-center md:w-1/2">
          <p 
            className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru"
            data-aos="fade-left" 
          >
           Somos una comunidad comprometida con el bienestar y la salud integral de tu mascota.
           Nuestro propósito es actuar como un puente confiable entre los dueños de mascotas y los profesionales
           de la salud veterinaria, facilitando el acceso a servicios de calidad de manera rápida y segura.
          </p>
        </div>
      </div>

      <Image
        src="/AboutUsPrints2.svg"
        alt="Imagen de huellas"
        width={500}  
        height={300} 
        className="object-contain w-full max-w-full mt-8 mb-12 md:w-2/3"
      />

      <div className="flex flex-col w-full mb-8 ml-auto md:flex-row">
        <div className="flex items-center justify-center md:w-1/2">
          <p 
            className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru pr-4"
            data-aos="fade-right" 
          >
           Creemos que cada mascota merece recibir la mejor atención posible, por eso conectamos a los dueños
           con veterinarios calificados, brindando la posibilidad de agendar turnos, consultar resultados clínicos
           y obtener asesoramiento especializado en cualquier momento.
          </p>
        </div>

        <div className="flex items-center justify-center mt-8 mb-4 ml-auto md:w-1/2 md:mb-8 md:mt-0">
          <Image
            src="/dogandcat1.svg"
            alt="Imagen de nosotros"
            width={500} 
            height={300} 
            className="object-contain w-full max-w-full md:w-2/3"
            data-aos="fade-left" 
          />
        </div>
      </div>

      <div className="flex flex-col w-full md:flex-row">
        <div className="flex items-center justify-center mb-4 ml-8 md:w-1/2 md:mb-8">
          <Image
            src="/AboutUsPerro2.svg"
            alt="Imagen de nosotros"
            width={600}  
            height={400} 
            className="object-contain w-full max-w-full md:w-2/3"
            data-aos="zoom-in" 
          />
        </div>

        <div className="flex items-center justify-center md:w-1/2">
          <p
            className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru"
            data-aos="fade-up" 
          >
          Además, fomentamos una red de apoyo donde los profesionales pueden gestionar de forma eficiente sus
          consultas y mantenerse en contacto directo con sus pacientes.
          </p>
        </div>
      </div>

      <Image
        src="/AboutUsPrints.svg"
        alt="Imagen de huellas"
        width={500}  
        height={300} 
        className="object-contain w-full max-w-full mt-8 mb-12 md:w-2/3"
      />

      <h2 
        className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
        data-aos="fade-up"
      >
        Cuidamos a Quienes Amas
      </h2>
      <p
        className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru mx-12"
        data-aos="fade-left" 
      >
        Juntos construimos un espacio donde la salud, el cuidado y el amor por los animales son nuestra prioridad.
      </p>

  
     
      <h2 
        className="mt-32 mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
        data-aos="fade-up"
      >
      Conocé a nuestro Equipo de Desarrollo
      </h2>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-6 transition transform bg-white shadow-lg rounded-2xl hover:scale-105"
            data-aos="zoom-in"
          >
            <Image
              src={member.img}
              alt={member.name}
              width={120}
              height={120}
              className="w-[120px] h-[120px] object-cover rounded-full border-4 border-customBrown transition-transform duration-500 hover:scale-125"
            />
            <h3 className="mt-4 text-xl font-semibold text-customBrown">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>

            {/* Redes sociales */}
            <div className="flex mt-3 space-x-4">
              {member.socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110"
                >
                  <Image src={social.icon} alt={social.name} width={24} height={24} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
}
