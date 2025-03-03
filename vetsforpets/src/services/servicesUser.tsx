import { IUserFormData, IUserResponseData } from "@/interfaces/registerTypes";
import { IUserCredentials, IUserData } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserData = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del Usuario");
    }

    const data: IUserData = await response.json();
    console.log("Datos recibidos del backend:", data, token);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Ocurrió un error desconocido al obtener los datos");
  }
};

export const updateUser = async (
  userId: string,
  updatedData: Partial<IUserData>,
  token: string
) => {
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
): Promise<{ success: string; token: string; user: IUserData }> {
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

export const loginUserWithGoogle = async (code: string) => {
  try {
    const response = await fetch(
      "https://vetsforpets-api.onrender.com/auth/google/callback",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión con Google");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la autenticación con Google:", error);
    return null;
  }
};

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
      const error = await response.json();
      throw new Error(`${error.message}`);
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
