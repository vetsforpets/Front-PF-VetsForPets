// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image"; 
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function AboutUs() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1500,
//       once: true, 
//     });
//   }, []);


//   const teamMembers = [
//     { name: "Elias Abad", role: "Desarrollador Backend", img: "/team/carlos.jpg" },
//     { name: "Angélica Bengelsdorff", role: "Desarrolladora Frontend", img: "/team/angie.jpeg" },
//     { name: "Cristian Camelo", role: "Desarrollador Frontend", img: "/team/laura.jpg" },
//     { name: "Hugo Eseverri", role: "Desarrollador Frontend", img: "/team/ana.jpg" },
//     { name: "Juan David Esparza", role: "Desarrollador Backend", img: "/team/diego.jpg" },
//     { name: "Carlos Figueira", role: "Desarrollador Backend", img: "/team/pedro.jpg" },
//     { name: "María Paz Rivas", role: "Desarrolladora Frontend", img: "/team/sofia.jpg" },
//     { name: "Sebastián SanJorge", role: "Desarrollador Frontend", img: "/nosotros2.jpg" },
  
   
//   ];

//   return (
//     <div className="min-h-screen p-6 flex flex-col items-center justify-center w-[90%] mx-auto">
//       <h1 
//         className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
//         data-aos="fade-up" 
//       >
//         QUIÉNES SOMOS
//       </h1>

//       <div className="flex flex-col w-full mb-12 md:flex-row">
//         <div className="flex items-center justify-center mb-4 md:w-1/2 md:mb-0">
//           <Image
//             src="/vfp.svg"
//             alt="Imagen de nosotros"
//             width={600}  
//             height={400}
//             className="object-contain w-full max-w-full md:w-2/3"
//             data-aos="fade-up" 
//           />
//         </div>

//         <div className="flex items-center justify-center md:w-1/2">
//           <p 
//             className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru"
//             data-aos="fade-left" 
//           >
//            Somos una comunidad comprometida con el bienestar y la salud integral de tu mascota.
//            Nuestro propósito es actuar como un puente confiable entre los dueños de mascotas y los profesionales
//            de la salud veterinaria, facilitando el acceso a servicios de calidad de manera rápida y segura.
//           </p>
//         </div>
//       </div>

//       <Image
//         src="/AboutUsPrints2.svg"
//         alt="Imagen de huellas"
//         width={500}  
//         height={300} 
//         className="object-contain w-full max-w-full mt-8 mb-12 md:w-2/3"
//       />

//       <div className="flex flex-col w-full mb-8 ml-auto md:flex-row">
//         <div className="flex items-center justify-center md:w-1/2">
//           <p 
//             className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru pr-4"
//             data-aos="fade-right" 
//           >
//            Creemos que cada mascota merece recibir la mejor atención posible, por eso conectamos a los dueños
//            con veterinarios calificados, brindando la posibilidad de agendar turnos, consultar resultados clínicos
//            y obtener asesoramiento especializado en cualquier momento.
//           </p>
//         </div>

//         <div className="flex items-center justify-center mt-8 mb-4 ml-auto md:w-1/2 md:mb-8 md:mt-0">
//           <Image
//             src="/dogandcat1.svg"
//             alt="Imagen de nosotros"
//             width={500} 
//             height={300} 
//             className="object-contain w-full max-w-full md:w-2/3"
//             data-aos="fade-left" 
//           />
//         </div>
//       </div>

//       <div className="flex flex-col w-full md:flex-row">
//         <div className="flex items-center justify-center mb-4 ml-8 md:w-1/2 md:mb-8">
//           <Image
//             src="/AboutUsPerro2.svg"
//             alt="Imagen de nosotros"
//             width={600}  
//             height={400} 
//             className="object-contain w-full max-w-full md:w-2/3"
//             data-aos="zoom-in" 
//           />
//         </div>

//         <div className="flex items-center justify-center md:w-1/2">
//           <p
//             className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru"
//             data-aos="fade-up" 
//           >
//           Además, fomentamos una red de apoyo donde los profesionales pueden gestionar de forma eficiente sus
//           consultas y mantenerse en contacto directo con sus pacientes.
//           </p>
//         </div>
//       </div>

//       <Image
//         src="/AboutUsPrints.svg"
//         alt="Imagen de huellas"
//         width={500}  
//         height={300} 
//         className="object-contain w-full max-w-full mt-8 mb-12 md:w-2/3"
//       />

//       <h2 
//         className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
//         data-aos="fade-up"
//       >
//         Cuidamos a Quienes Amas
//       </h2>
//       <p
//         className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru mx-12"
//         data-aos="fade-left" 
//       >
//         Juntos construimos un espacio donde la salud, el cuidado y el amor por los animales son nuestra prioridad.
//       </p>

  
//       <h2 
//         className="mt-32 mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
//         data-aos="fade-up"
//       >
//       Conocé a nuestro Equipo de Desarrollo
//       </h2>

//       <div className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
//         {teamMembers.map((member, index) => (
//           <div 
//             key={index} 
//             className="flex flex-col items-center p-6 transition transform bg-white shadow-lg rounded-2xl hover:scale-105"
//             data-aos="zoom-in"
//           >
//             <Image
//               src={member.img}
//               alt={member.name}
//               width={120}
//               height={120}
//                className="w-[120px] h-[120px] object-cover rounded-full border-4 border-customBrown transition-transform duration-500 hover:scale-125"
//               // className="object-cover border-4 rounded-full border-customBrown"
//             />
//             <h3 className="mt-4 text-xl font-semibold text-customBrown">{member.name}</h3>
//             <p className="text-gray-600">{member.role}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


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


  return (
 
    <div className="min-h-screen p-6 flex flex-col items-center justify-center w-[90%] mx-auto">
      <h1 
      
        className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-5xl font-poppins text-customBrown"
        data-aos="fade-up" 
      >
        QUIENES SOMOS
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
        // data-aos="fade-up" // Animación de desvanecimiento hacia arriba
      />

      <div className="flex flex-col w-full mb-8 ml-auto md:flex-row">
        <div className="flex items-center justify-center md:w-1/2">
          <p 
            className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru pr-4"
            data-aos="fade-right" 
          >
           Creemos que cada mascota merece recibir la mejor atención posible, por eso te contactamos a los dueños
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
        Juntos construimos  un espacio donde la salud, el cuidado y el amor por los animales son nuestra prioridad.
      </p>
    </div>
  );
}
