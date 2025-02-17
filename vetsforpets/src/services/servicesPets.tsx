import { Pet } from "@/Components/pet/PetPreview";
import { IPetRegisterData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function newPet(
  petRegisterData: IPetRegisterData,
  token?: string
) {
  try {
    const response = await fetch(`${apiURL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petRegisterData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar formulario de creación de mascota");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function editPet(
  id: string,
  petEditData: Partial<Pet>,
  token?: string
) {
  try {
    const response = await fetch(`${apiURL}/pets/${petEditData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petEditData),
    });

    if (response.ok) {
      return { success: true };
    }

    let errorMessage = "Error al editar la mascota";
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch (error) {
      console.error("No se pudo parsear JSON en editPet:", error);
    }

    return { success: false, error: errorMessage };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Ocurrió un error desconocido" };
  }
}

export async function deletePet(id: string, token?: string) {
  try {
    const response = await fetch(`${apiURL}/pets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    }

    let errorMessage = "Error al eliminar la mascota";
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch (error) {
      console.error("No se pudo parsear JSON en deletePet:", error);
    }

    return { success: false, error: errorMessage };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Ocurrió un error desconocido" };
  }
}
