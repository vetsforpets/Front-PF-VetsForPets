import { useState } from "react";
import DeleteUser from "./DeleteUser";
import UserList from "./UserList";

interface MyComponentProps {
    userData: { id: string; token: string } | null;
}

export const MyUserComponent = ({ userData }: MyComponentProps) => {
    const [selectedComponent, setSelectedComponent] = useState("UserList");

    const handleButtonClick = (component: string) => {
        setSelectedComponent(component);
    };

    if (userData?.id === undefined) {
        return <div>Cargando....</div>;
    } else {
        return (
            <div className="p-5 md:flex">
                <ul className="flex flex-col w-full p-5 py-2 space-y-4 text-sm font-medium text-gray-500 ml-14 md:w-2/4 lg:w-1/3 xl:w-1/4">
                    {/* Tus otros botones */}
                    <li className="p-3">
                        <button
                            className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
                            onClick={() => handleButtonClick("UserList")}
                        >
                            Lista de Usuarios
                        </button>
                    </li>
                    <li className="p-3">
                        <button
                            className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
                            onClick={() => handleButtonClick("deletePetShop")}
                        >
                            Eliminar Usuario
                        </button>
                    </li>
                </ul>

                <div className="flex-1 p-4 bg-customBeige bg-opacity-20">
                    <div className="max-w-6xl mx-auto space-y-4">
                        {selectedComponent === "UserList" && <UserList />}
                        {selectedComponent === "deletePetShop" && <DeleteUser />}
                    </div>
                </div>
            </div>
        );
    }
};
