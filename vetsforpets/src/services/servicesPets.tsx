import { IPetRegisterData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function newPet(
  petRegisterData: IPetRegisterData
): Promise<{ success: string; token: string }> {
  try {
    const response = await fetch(`${apiURL}/pets/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
