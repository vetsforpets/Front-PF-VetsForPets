import { IStripeMetricsFinancialResponse, IStripeMetricsTransactionResponse, IStripeMetricsUserActiveResponse } from "@/interfaces/stripeTypes";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchFinancialData(token: string ): Promise<IStripeMetricsFinancialResponse | void> {
    try {
       
        const response = await fetch(`${apiURL}/payments/admin/reports/financial`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener los datos del balance general");
          }
          
          const data: IStripeMetricsFinancialResponse = await response.json();
          console.log("Balance Stripe:", data); 
          return data; 
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error al traer balance general:", error);
            throw new Error(error.message);
          }
          throw new Error("Ocurrió un error desconocido al obtener el balance");
        }
}
export async function fetchTransactionData(token: string ): Promise<IStripeMetricsTransactionResponse[] | void> {
    try {
       
        const response = await fetch(`${apiURL}/payments/admin/reports/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener los datos de las transacciones");
          }
          
          const data: IStripeMetricsTransactionResponse[] = await response.json();
          console.log("Datos de las transacciones:", data); 
          return data; 
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error al traer transacciones:", error);
            throw new Error(error.message);
          }
          throw new Error("Ocurrió un error desconocido al obtener las transacciones");
        }
}
export async function fetchUsersActiveData(token: string ): Promise<IStripeMetricsUserActiveResponse[] > {
    try {
       
        const response = await fetch(`${apiURL}/payments/admin/reports/usersActive`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener los datos de los usuarios activos");
          }
          
          const data: IStripeMetricsUserActiveResponse[] = await response.json();
          console.log("Datos de usuarios activos:", data); 
          return data; 
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error al traer usuarios activos:", error);
            throw new Error(error.message);
          }
          throw new Error("Ocurrió un error desconocido al obtener los datos de los usuarios activos");
        }
}
