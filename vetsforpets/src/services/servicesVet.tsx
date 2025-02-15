import { IVetFormDataPrev, IVetResponseData } from "@/interfaces/registerTypes";
import { IVetCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getVetById(token: string, id:string): Promise<IVetCredentials | null> {
    try {
        const response = await fetch(`${apiURL}/petshop/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
        throw new Error("Error al enviar formulario de registro de veterinaria");
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
  