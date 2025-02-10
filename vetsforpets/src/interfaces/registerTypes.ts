
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
      apertura: string;
      cierre: string;
    },
    tuesday:{
      apertura: string;
      cierre: string;
    },
    wednesday:{
      apertura: string;
      cierre: string;
    },
    thursday:{
      apertura: string;
      cierre: string;
    },
    friday:{
      apertura: string;
      cierre: string;
    },
    saturday:{
      apertura: string;
      cierre: string;
    },
    Sunday:{
      apertura: string;
      cierre: string;
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
  