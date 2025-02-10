// components/pet/PetPreview.tsx

import React from 'react';

interface Pet {
  name: string;
  breed: string;
  age: string;
}

interface PetPreviewProps {
  pet: Pet;
 
  index: number;
}

const PetPreview: React.FC<PetPreviewProps> = ({ pet }) => {
  return (
    <div className="flex gap-4 ">
      <img
        src="/Cat.svg"
        alt="user"
        className="w-40 h-40 m-4 rounded-full object-cover shadow-md"
      />
      
      {/* Pet Information */}
      <div className='py-6'>
      <div className="flex-grow space-y-2 ">
        <input
          disabled
          type="text"
          placeholder="Benito"
          value={pet.name}
          className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
        />
        <input
          disabled
          type="text"
          placeholder="Gato"
          value={pet.breed}
          className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
        />
        <input
          disabled
          type="text"
          placeholder="Orange"
          value={pet.age}
          
          className="w-full px-3 py-2 rounded-2xl bg-customBeige border-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
        />
      </div>
      </div>
      

      {/* Botones en forma vertical */}
      <div className="flex flex-col justify-between h-30 py-3 px-3 bg-customBrown rounded-2xl">
        <button className="rounded-full hover:bg-customBeige flex items-center justify-center">
          <img src="/images/send.png" alt="ver" className="w-7 h-7 m-2" />
        </button>

        <button className="rounded-2xl hover:bg-customBeige flex items-center justify-center">
          <img src="/images/icon.png" alt="editar" className="w-10 h-7 m-2" />
        </button>

        <button className="rounded-2xl hover:bg-customBeige flex items-center justify-center">
          <img src="/images/delete.png" alt="eliminar" className="w-10 h-7 m-2" />
        </button>
      </div>
    </div>
  );
};

export default PetPreview;
