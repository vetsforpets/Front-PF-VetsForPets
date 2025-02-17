import { IMembershipResponse } from "@/interfaces/registerTypes";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchOrderData(token: string): Promise<IMembershipResponse[] | void> {
    try {
        const response = await fetch(`${apiURL}/membership`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de la membresia");
        }

        const data: IMembershipResponse[] = await response.json();
        console.log("Datos de membresias:", data); 
        return data;
    } catch (error) {
        if (error instanceof Error) {
          console.error("Error al traer membresisa:", error);
            throw new Error(error.message);
          }
          throw new Error("Ocurrió un error desconocido al obtener los datos");
    }
}