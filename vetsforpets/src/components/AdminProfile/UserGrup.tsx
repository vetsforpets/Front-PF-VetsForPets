// import { useState } from "react";
// import DeleteUser from "./DeleteUser";
// import UserList from "./UserList";

// interface MyComponentProps {
//     userData: { id: string; token: string } | null;
// }

// export const MyUserComponent = ({ userData }: MyComponentProps) => {
//     const [selectedComponent, setSelectedComponent] = useState("UserList");

//     const handleButtonClick = (component: string) => {
//         setSelectedComponent(component);
//     };

//     if (userData?.id === undefined) {
//         return <div>Cargando....</div>;
//     } else {
//         return (
//             <div className="p-5 md:flex">
//                 <ul className="flex flex-col w-full p-5 py-2 space-y-4 text-sm font-medium text-gray-500 ml-14 md:w-2/4 lg:w-1/3 xl:w-1/4">
//                     {/* Tus otros botones */}
//                     <li className="p-3">
//                         <button
//                             className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
//                             onClick={() => handleButtonClick("UserList")}
//                         >
//                             Lista de Usuarios
//                         </button>
//                     </li>
//                     <li className="p-3">
//                         <button
//                             className="inline-flex items-center w-full px-4 py-3 text-base border text-customDarkGreen rounded-2xl border-customBrown bg-customBeige hover:bg-customLightBrown active"
//                             onClick={() => handleButtonClick("deletePetShop")}
//                         >
//                             Eliminar Usuario
//                         </button>
//                     </li>
//                 </ul>


//                 <div className="flex-1 p-4 bg-customBeige bg-opacity-20">
//                     <div className="max-w-6xl mx-auto space-y-4">
//                         {selectedComponent === "UserList" && <UserList />}
//                         {selectedComponent === "deletePetShop" && <DeleteUser />}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };
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

  if (!userData?.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-4">
          <p className="mb-4 text-2xl font-bold text-[#BC6C25]">Cargando...</p>
          <img src="/loading.svg" width={100} height={100} alt="cargando" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-4 lg:p-6 bg-[#FFFAD7] flex flex-col lg:flex-row">
      {/* Panel lateral de opciones */}
      <div className="w-full p-4 mb-6 lg:w-1/4 lg:mb-0 lg:mr-6">
        <h2 className="text-lg font-bold text-[#606C38] mb-4">Opciones</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full p-3 text-sm lg:text-base rounded-2xl border border-[#BC6C25] transition-all duration-300 ease-in-out ${
                selectedComponent === "UserList"
                  ? "bg-[#BC6C25] text-white"
                  : " text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white"
              }`}
              onClick={() => handleButtonClick("UserList")}
            >
              Lista de Usuarios
            </button>
          </li>
          <li>
            <button
              className={`w-full p-3 text-sm lg:text-base rounded-2xl border border-[#BC6C25] transition-all duration-300 ease-in-out ${
                selectedComponent === "deletePetShop"
                  ? "bg-[#BC6C25] text-white"
                  : " text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white"
              }`}
              onClick={() => handleButtonClick("deletePetShop")}
            >
              Eliminar Usuario
            </button>
          </li>
        </ul>
      </div>

      {/* Contenedor del contenido dinámico */}
      <div className="flex-1 p-6 ">
        {selectedComponent === "UserList" && <UserList />}
        {selectedComponent === "deletePetShop" && <DeleteUser />}
      </div>
    </div>
  );
};
