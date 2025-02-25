import { IVetFormDataPrev, IVetResponseData } from "@/interfaces/registerTypes";
import { IVetCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getVetById(token: string, id:string): Promise<IVetCredentials | null> {
    try {
        const response = await fetch(`${apiURL}/petshop/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de veterinarias");
        }

        const data: IVetCredentials = await response.json();
        console.log("Datos de veterinarias:", data); 
        return data;
    } catch (error) {
        if (error instanceof Error) {
          console.error("Error al buscar veterinaria por ID:", error);
            throw new Error(error.message);
          }
          throw new Error("Ocurrió un error desconocido al obtener los datos");
    }
}


export async function RegisterVet(
    vetRegisterData: IVetFormDataPrev
  ): Promise<IVetResponseData> {
    try {
      if(typeof(vetRegisterData.licenseNumber) == "string") vetRegisterData.licenseNumber = parseInt(vetRegisterData.licenseNumber)
      const response = await fetch(`${apiURL}/auth/vetsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vetRegisterData),
      });
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (!response.ok) {
        const error = await response.json()
        throw new Error(`${error.message}`);
      }
  
      const data: IVetResponseData = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Ocurrió un error desconocido");
    }
  }
  


  export const updatePetshop = async (
    petshopId: string,
    updatedData: Partial<IVetCredentials>,
    token: string
  ) => {
    try {
      const response = await fetch(`${apiURL}/petshop/${petshopId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Obtiene el mensaje de error del backend
        console.error("Error en la respuesta del servidor:", errorMessage);
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en updatePetshop:", error);
      throw new Error("Ocurrió un error desconocido al actualizar los datos");
    }
  };
  