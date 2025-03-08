export interface IUser {
  id: string;
  name: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: string;
  imgProfile: string;
  isPremium: boolean;
  isActive: boolean;
  role: string;
}

export interface IPetApiResponse {
  id: string;
  name: string;
  animalType: string;
  birthdate: string;
  age: number;
  breed: string;
  sex: string;
  isSterilized: boolean;
  notes: string;
  profileImg: string;
  userId: string;
  user: IUser;
  medicalRecord: string;
}
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPets = async (token: string) => {
  try {
    const response = await fetch(`${apiURL}/pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al obtener las mascotas:", errorData);
      throw new Error("Error al obtener las mascotas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la función fetchPets:", error);
    throw error;
  }
};
