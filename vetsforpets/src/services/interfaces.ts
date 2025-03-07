import { Pet } from "@/components/pet/PetPreview";
import { dayOpenings } from "@/interfaces/registerTypes";

export interface IUserRegisterData {
  name: string;
  address: string;
  phone: number | undefined;
  email: string;
  password: string;
  repeatPassword: string;
}

interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IUserApiResponse {
  id: string;
  name: string;
  lastName: string;
  age: string;
  location?: ILocation[];
  pets: Pet[];
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: string;
  imgProfile: string;
  isPremium: boolean;
  isActive: boolean;
  role: string;
  userMembership: null | string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  pet?: { id: string; name: string; type: string }; 
}
export interface IPet {
  id: string;
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  isSterilized: boolean;
  notes?: string;
  profileImg?: string;
}



export interface IUserData {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: string;
  imgProfile: string;
  isAdmin: boolean;
  isPremium: boolean;
  location: ILocation[];
  appointments: IAppointment[];
  pets: Pet[];
  role: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IVetCredentials {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  is24Hours: boolean;
  imgProfile: string;
  location: ILocation[];
  createdAt: string;
  veterinarian: string;
  licenseNumber: number;
  businessHours: dayOpenings;
  emergencies: IEmergency[];
  role: string;
  isActive: boolean;
}

export interface IEmergency {
  userId: string;
  pet: Pet;
  chatId: string;
}

export interface IDayOpening {
  monday: {
    opening: string;
    closure: string;
  };
  tuesday: {
    open: string;
    close: string;
  };
  wednesday: {
    open: string;
    close: string;
  };
  thursday: {
    open: string;
    close: string;
  };
  friday: {
    open: string;
    close: string;
  };
  saturday: {
    open: string;
    close: string;
  };
  Sunday: {
    open: string;
    close: string;
  };
}

export interface IAppointment {
  id: string;
  date: string;
  time: string;
  description: string;
  status: string;
  user: string;
}

export interface IPetRegisterData {
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  notes: string;
  isSterilized: boolean;
  profileImg: string;
}

export interface IPetEditData {
  id: string;
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  notes: string;
  isSterilized: string;
  profileImg: string;
  userId: string;
}


export interface IVetLocation {
  id: string;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: string;
  longitude: string;
}

export interface IVet {
  id: string;
  name: string;
  email: string;
  veterinarian: string;
  phoneNumber: string;
  is24Hours: boolean;
  imgProfile: string;
  foundation: string;
  role: string;
  licenseNumber: string;
  location: IVetLocation[];
  isActive: boolean;
  }