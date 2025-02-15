"use client"
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import notFoundImage from "../../public/not-found.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotFound() {
  useEffect(() => {
    AOS.init({
      once: true,  
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen space-y-4" data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="1500">
      <Image src={notFoundImage} alt="Página no encontrada" width={600} height={400} className="mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"/>
      <h1 className="text-4xl font-bold mb-5">Página no encontrada</h1>
      <p className="text-xl mb-8">
        Lo sentimos, la página que está buscando no existe o ha sido movida.
      </p>
      <Link href="/" className="customButton">
        Ir al inicio
      </Link>
    </div>
  );
}
