import { Pet } from "@/components/pet/PetPreview";

export interface IUserRegisterData {
  name: string;
  address: string;
  phone: number | undefined;
  email: string;
  password: string;
  repeatPassword: string;
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
  isPremium: boolean;
  appointments: IAppointment[];
  pets: Pet[];
  isVet: boolean;
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
  location: string;
  createdAt: string;
  veterinarian: string;
  licenseNumber: number;
  businessHours: dayOppening;
}

export interface dayOppening {
  monday: {
    open: string;
    close: string;
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
  date: string; // Puede ser `Date` si lo parseas
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
  isSterilized: string;
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
