import {
  IUserFormData,
  IUserResponseData,
  IVetFormData,
  IVetFormDataPrev,
  IVetResponseData,
} from "@/interfaces/registerTypes";
import { IUserCredentials, IUserData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${apiURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del Usuario");
    }

    const data: IUserData[] = await response.json();
    console.log("Datos recibidos del backend:", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido al obtener los datos");
  }
};

// export function getUserById(userId: string): IUserData | null {
//   const storedData = localStorage.getItem("userData");

//   if (storedData) {
//     const userData: IUserData[] = JSON.parse(storedData);

//     const user = userData.find((user) => user.id === userId);
//     return user || null;
//   }

//   return null;
// }

export async function loginUser(
  userCredentials: IUserCredentials
): Promise<{ success: string; token: string }> {
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

    const data = await response.json();
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
