export interface IUserResponseDataDashboard {
  id: string;
  name: string;
  lastName: string;
  age: 0;
  email: string;
  password: string;
  phoneNumbe: string;
  createdAt: Date;
  imgProfile: string;
  isPremium: boolean;
  appointments: [
    {
      id: string;
      date: Date;
      time: string;
      description: string;
      status: string;
      user: string;
    }
  ];
  isVet: true;
}

export interface IPetResponseData {
  id: string;
  name: string;
  age: number;
  animalType: string;
  birthdate: string;
  breed: string;
  sex: string;
  isSterilized: boolean;
  notes: string;
  profileImg: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IUserFormData {
  name: string;
  lastName: string;
  email: string;
  age: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
  imgProfile: string;
  location: ILocation [];
  isVet: boolean;
}

export interface IMembershipResponse {
  id: string;
  name: string;
  price: string;
  benefits: string[];
}

export interface IUserResponseData {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}
// name: "",
//     veterinarian: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     imgProfile: "",
//     is24Hours: false,
//     location: "anything"
//     licenseNumber: "",
//     foundation: "",
//     businessHours: "",

interface IBusinessHours {
  open: string;
  close: string;
}

export interface IVetFormData {
  name: string;
  veterinarian?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber: string;
  imgProfile: string;
  is24Hours: boolean;
  location: ILocation[];
  licenseNumber?: string;
  foundation?: string;
  businessHours?: IBusinessHours;
  isVet: boolean;
}

export interface IVetFormDataPrev {
  name: string;
  veterinarian?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber: string;
  imgProfile: string;
  is24Hours: boolean;
  location: ILocation[];
  licenseNumber?: string | number;
}
export interface dayOpenings {
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
  export interface IVetResponseData {
          id: string,
          nombre: string,
          email: string,
          rol: string,
          pets: [],
          appointments: []
  } 
  
  export interface IPostOrder {
    userId: string,
    paymentMethod: string,
    membership: [{id: string}]
  }
