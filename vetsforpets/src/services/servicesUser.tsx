import { IUserFormData, IUserResponseData, IVetFormData, IVetResponseData } from "@/interfaces/registerTypes";
import { ILoginResponse, IUserCredentials } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  userCredentials: IUserCredentials
): Promise<ILoginResponse> {
  try {
    const response = await fetch(`${apiURL}/users/login`, {
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



export async function RegisterUser(
  userRegisterData: IUserFormData
): Promise<IUserResponseData> {
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar formulario de registro de usuario");
    }

    const data: IUserResponseData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}


export async function RegisterVet (
  vetRegisterData: IVetFormData
): Promise<IVetResponseData> {
  try {
    const response = await fetch(`${apiURL}/auth/signupvet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vetRegisterData),
    });

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