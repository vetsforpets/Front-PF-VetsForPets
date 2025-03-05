import { Pet } from "@/components/pet/PetPreview";

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
  isAdmin:boolean;
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
  businessHours: null;
  emergencies: IEmergency[];
  role: string;
}

export interface IEmergency {
  userId: string;
  pet: Pet;
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
