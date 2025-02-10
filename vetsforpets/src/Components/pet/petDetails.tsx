// components/PetDetails.js
import React from "react";

const PetDetails = () => {
  return (
    <div className="bg-[#deb887] rounded-2xl p-4 shadow-lg max-w-lg sm:max-w-lg w-full mx-auto">
      <div className="space-y-4">
        <img
          src="/Dog.svg"
          alt="user"
          className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto"
        />
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Firulais"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="Perro"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="Caniche"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="Macho"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="2 años"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="5 kg"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <input
            type="text"
            placeholder="Esterilizado si"
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <textarea
            placeholder="Enfermedades o condiciones previas"
            rows={3}
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
          <textarea
            placeholder="Comentarios adicionales"
            rows={3}
            className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
