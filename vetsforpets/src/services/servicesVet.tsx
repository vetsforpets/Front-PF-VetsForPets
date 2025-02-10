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
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Ocurrió un error desconocido al obtener los datos");
    }
}
