import { IAppointment } from "./interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchAppointments(): Promise<IAppointment[] | null> {
    try {
        const response = await fetch(`${apiURL}/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los turnos");
        }

        const data: IAppointment[] = await response.json();
        console.log("Turnos obtenidos:", data);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Ocurrió un error desconocido al obtener los turnos");
    }
}
