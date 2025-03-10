import { IVetFormDataPrev, IVetResponseData } from "@/interfaces/registerTypes";
import { IVetCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllVets = async (token: string) => {
  try {
    const response = await fetch(`${apiURL}/petshop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error en la API: ${response.status} - ${response.statusText} - ${errorMessage}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de veterinarias:", error);
    throw new Error(
      "Ocurrió un error al obtener los datos de las veterinarias"
    );
  }
};

export async function getVetById(
  id: string,
  token: string
): Promise<IVetCredentials | null> {
  try {
    const response = await fetch(`${apiURL}/petshop/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    const data: IVetCredentials = await response.json();
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
    if (typeof vetRegisterData.licenseNumber == "string")
      vetRegisterData.licenseNumber = parseInt(vetRegisterData.licenseNumber);
    const response = await fetch(`${apiURL}/auth/vetsignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vetRegisterData),
    });

    if (!response.ok) {
      const error = await response.json();
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

export const deletePetShop = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiURL}/petshop/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo eliminar el pet shop");
    }

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al eliminar el pet shop:", error.message);
      return { error: error.message };
    } else {
      console.error("Error desconocido al eliminar el pet shop:", error);
      return { error: "Error desconocido" };
    }
  }
};
