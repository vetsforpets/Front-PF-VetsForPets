export interface IUserRegisterData {
  name: string;
  address: string;
  phone: number | undefined;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IVetCredentials {
  name: string;
  email: string;
  phoneNumber: string;
  createdAtPetShop: string;
  veterinarian: string;
  licenseNumber: number;
  schedule: dayOpening;
  is24Hours: boolean;
  imgProfile: string;

}

export interface dayOpening {
  monday: {
    open: string;
    close: string;
  },
  tuesday: {
    open: string;
    close: string;
  },
  wednesday: {
    open: string;
    close: string;
  },
  thursday: {
    open: string;
    close: string;
  },
  friday: {
    open: string;
    close: string;
  },
  saturday: {
    open: string;
    close: string;
  },
  Sunday: {
    open: string;
    close: string;
  },
}
