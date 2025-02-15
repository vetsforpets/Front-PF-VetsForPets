import { IPetEditData, IPetRegisterData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function newPet(petRegisterData: IPetRegisterData, token?: string) {
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
  petEditData: IPetEditData
): Promise<{ success: string; token: string }> {
  try {
    const response = await fetch(`${apiURL}/pets/${petEditData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petEditData),
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
