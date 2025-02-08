"use client";

import PetRegisterForm from "../../Components/PetRegisterForm/PetRegisterForm";

export default function PetRegisterPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Registro de Mascotas</h1>
      <PetRegisterForm />
    </div>
  );
}
