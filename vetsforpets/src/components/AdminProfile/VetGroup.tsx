import { useState } from "react";
import AdminVet from "./AdminVet";
import PetShopsList from "./AdminVetCards";
import DeletePetShop from "./DeletePetshop";

interface MyComponentProps {
  userData: { id: string; token: string } | null;
}

export const MyComponent = ({ userData }: MyComponentProps) => {
  const [selectedComponent, setSelectedComponent] = useState("adminVet");

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  if (userData?.id === undefined) {
    return <div>Cargando....</div>;
  } else {
    return (
      <div className="flex flex-col items-center p-5">
        <ul className="flex flex-wrap justify-center w-full max-w-4xl gap-4 mb-6 text-sm font-medium text-gray-500">
          <li>
            <button
              className="inline-flex items-center px-6 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown"
              onClick={() => handleButtonClick("adminVet")}
            >
              Turnos
            </button>
          </li>
          <li>
            <button
              className="inline-flex items-center px-6 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown"
              onClick={() => handleButtonClick("petShopsList")}
            >
              Veterinarias
            </button>
          </li>
          <li>
            <button
              className="inline-flex items-center px-6 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown"
              onClick={() => handleButtonClick("deletePetShop")}
            >
              Banear
            </button>
          </li>
        </ul>

        <div className="w-full max-w-6xl p-4 bg-customBeige bg-opacity-20">
          {selectedComponent === "adminVet" && <AdminVet />}
          {selectedComponent === "petShopsList" && <PetShopsList />}
          {selectedComponent === "deletePetShop" && <DeletePetShop />}
        </div>
      </div>
    );
  }
};
