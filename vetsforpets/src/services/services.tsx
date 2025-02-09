import { ILoginResponse, IUserCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  userCredentials: IUserCredentials
): Promise<ILoginResponse> {
  try {
    const response = await fetch(`${apiURL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    if (!response.ok) {
      throw new Error("Error al enviar formulario de inicio de sesión");
    }

    const data: ILoginResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}
