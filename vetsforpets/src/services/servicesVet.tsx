import { IVetFormDataPrev, IVetResponseData } from "@/interfaces/registerTypes";
import { IVetCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchVetData(): Promise<IVetCredentials[] | null> {
    try {
        const response = await fetch(`${apiURL}/petshop`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de veterinarias");
        }

        const data: IVetCredentials[] = await response.json();
        console.log("Datos de veterinarias:", data); 
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Ocurrió un error desconocido al obtener los datos");
    }
}

export const getVetById = async (vetId: string | null): Promise<IVetCredentials | null> => {
    try {
        const data = await fetchVetData();

        if (data) {
            const vet = data.find((vet) => vet.id === vetId);
            console.log("Veterinaria encontrada:", vet); 
            return vet || null;
        }

        return null;
    } catch (error) {
        console.error("Error al buscar veterinaria por ID:", error);
        return null;
    }
};



export async function RegisterVet(
    vetRegisterData: IVetFormDataPrev
  ): Promise<IVetResponseData> {
    try {
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
  