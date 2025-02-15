import {
  IUserFormData,
  IUserResponseData,
 
} from "@/interfaces/registerTypes";
import { IUserCredentials, IUserData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;



export const fetchUserData = async (id: string, token:string) => {
  try {
    const response = await fetch(`${apiURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔹 Agrega el token en los headers
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del Usuario");
    }

    const data: IUserData = await response.json();
    console.log("Datos recibidos del backend:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Ocurrió un error desconocido al obtener los datos");
  }
}

export const updateUser = async (userId: string, updatedData: Partial<IUserData>, token: string) => {
  try {
    const response = await fetch(`${apiURL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar los datos del usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Ocurrió un error desconocido al actualizar los datos");
  }
};


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
