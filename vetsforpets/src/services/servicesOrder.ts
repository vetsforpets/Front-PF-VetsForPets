import { IMembershipResponse, IPostOrder } from "@/interfaces/registerTypes";
import { fetchUserData } from "./servicesUser";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchOrderData(token: string ): Promise<IMembershipResponse[] | void> {
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

export async function postOrder(
    postOrder: IPostOrder,
  token: string,  
  id: string, 
) {
  try {
    const userPremium = await fetchUserData(id, token)
    if(!userPremium.isPremium){
    const response = await fetch(`${apiURL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postOrder),
    });

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`${error.message}`);
    }

    const data = await response.json();
    return data;
  }
    else {
      throw new Error("El usuario ya adquirio una membresia");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}



