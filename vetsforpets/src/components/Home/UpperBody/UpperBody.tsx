"use client";
import Image from "next/image";
import dog2 from "@/../public/images/dog2.png";
import lupa from "@/../public/images/lupa.png";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUserStore } from "@/store";
import { getVetById } from "@/services/servicesVet";
import GotEmergencieModal from "@/components/GotEmergencieModal/GotEmergencieModal";
import Link from "next/link";

export function UpperBody() {
  const { userData } = useUserStore();
  const [emergenciesModalOpen, setEmergenciesModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (userData?.token && userData?.id && userData.role === "PETSHOP") {
      const fetchVetEmergencies = async () => {
        try {
          const vet = await getVetById(userData.id, userData.token);
          if (vet && vet.emergencies.length > 0) {
            setEmergenciesModalOpen(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchVetEmergencies();
    }
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
          <Link
            href="/veterinary"
            className="flex gap-3 justify-evenly bg-customBeige hover:bg-customHardBeige cursor-pointer text-dark items-center mt-3 text-lg sm:text-xl w-fit mb-12 py-2 px-10 rounded-full"
          >
            <p>Ver mapa</p>
            <Image src={lupa} width={30} height={30} alt="Lupa" />
          </Link>
        </div>
      </div>
      <GotEmergencieModal
        isOpen={emergenciesModalOpen}
        onClose={() => setEmergenciesModalOpen(false)}
      />
    </div>
  );
}
