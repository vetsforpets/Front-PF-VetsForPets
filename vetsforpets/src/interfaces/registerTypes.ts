
  export interface IUserFormData {
    name: string,
    lastName: string,
    age: 0,
    email: string,
    password: string,
    confirmPassword?: string,
    phoneNumber: string,
    imgProfile: string,
    isVet: boolean
  } 
  export interface IUserResponseData {
          id: string,
          nombre: string,
          email: string,
          rol: string
  } 
  export interface IVetFormData {
    name: string,
    createdAt: string,
    email: string,
    is24Hours: string,
    phoneNumber: string,
    imgProfile: string,
    isVet: boolean
  } 
  export interface IVetResponseData {
          id: string,
          nombre: string,
          email: string,
          rol: string,
          pets: [],
          appointments: []
  } 
  