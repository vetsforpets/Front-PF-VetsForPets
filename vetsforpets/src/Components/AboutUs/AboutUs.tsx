import React from "react";
import Image from "next/image"; 

export default function AboutUs() {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center w-[90%] mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-poppins text-customBrown text-center">
        QUIENES SOMOS
      </h1>

    
      <div className="flex flex-col md:flex-row w-full mb-12">
    
        <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <Image
            src="/AboutUsPet.svg"
            alt="Imagen de nosotros"
            width={500}  
            height={300}
            className="w-full md:w-2/3 max-w-full object-contain"
          />
        </div>

  
        <div className="md:w-1/2 flex justify-center items-center">
          <p className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru">
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
        className="w-full md:w-2/3 max-w-full object-contain mt-8 mb-12" 
      />

      

     
<div className="flex flex-col md:flex-row w-full mb-8 ml-auto">

  <div className="md:w-1/2 flex justify-center items-center">
  <p className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru pr-4">
      Creemos que cada mascota merece recibir la mejor atención posible, por eso te contactamos a los dueños
      con veterinarios calificados, brindando la posibilidad de agendar turnos, consultar resultados clínicos
      y obtener asesoramiento especializado en cualquier momento.
    </p>
  </div>


  <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-8 mt-8 md:mt-0 ml-auto">
  <Image
      src="/AboutUsDogCat.svg"
      alt="Imagen de nosotros"
      width={500} 
      height={300} 
      className="w-full md:w-2/3 max-w-full object-contain"
    />
  </div>
</div>

      
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-8 ml-8">
          <Image
            src="/AboutUsPerro2.svg"
            alt="Imagen de nosotros"
            width={600}  
            height={400} 
            className="w-full md:w-2/3 max-w-full object-contain"
          />
        </div>

        <div className="md:w-1/2 flex justify-center items-center">
          <p className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru">
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
        className="w-full md:w-2/3 max-w-full object-contain mt-8 mb-12" 
      />


      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-poppins text-customBrown text-center">Cuidamos a Quienes Amas</h2>
    <p className="text-s sm:text-m md:text-xl lg:text-2xl text-[#283618] text-center font-kiwi-maru mx-12">Juntos construimos  un espacio donde la salud, el cuidado y el amor por los animales son nuestra prioridad.</p>
    
    </div>
  );
}
