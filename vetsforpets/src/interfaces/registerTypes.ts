export interface IUserResponseDataDashboard {
    id: string,
    name: string
    lastName: string,
    age: 0,
    email: string,
    password: string,
    phoneNumbe: string,
    createdAt: Date,
    imgProfile: string,
    isPremium: boolean,
    appointments: [
      {
        id: string,
        date: Date,
        time: string,
        description: string,
        status: string,
        user: string
      }
    ],
    isVet: true
} 

export interface IPetResponseData {
    id: string,
    name: string,
    age: number,
    animalType: string,
    birthdate: string,
    breed: string,
    sex: string,
    isSterilized: boolean,
    notes: string,
    profileImg: string
  
}

  export interface IUserFormData {
    name: string,
    lastName: string,
    email: string,
    age: number,
    password: string,
    confirmPassword?: string,
    phoneNumber: string,
    imgProfile: string,
  } 
  



  export interface IUserResponseData {
          id: string,
          nombre: string,
          email: string,
          rol: string
  } 
  export interface IVetFormData {
    name: string,
    createdAtPetShop?: string,
    veterinarian?: string,
    license?: string,
    password?: string, 
    confirmPassword?: string,
    dayOpenings?: string,
    email: string,
    is24Hours: boolean,
    phoneNumber: string,
    imgProfile: string,
    location: string
  } 
  export interface IVetFormDataPrev {
    name: string,
    password?: string, 
    confirmPassword?: string,
    email: string,
    is24Hours: Boolean,
    phoneNumber: string,
    imgProfile: string,
    location: string
  } 
  export interface dayOpenings {
    monday:{
      open: string;
      close: string;
    },
    tuesday:{
      open: string;
      close: string;
    },
    wednesday:{
      open: string;
      close: string;
    },
    thursday:{
      open: string;
      close: string;
    },
    friday:{
      open: string;
      close: string;
    },
    saturday:{
      open: string;
      close: string;
    },
    Sunday:{
      open: string;
      close: string;
    },
  }

  export interface IVetResponseData {
          id: string,
          nombre: string,
          email: string,
          rol: string,
          pets: [],
          appointments: []
  } 
  