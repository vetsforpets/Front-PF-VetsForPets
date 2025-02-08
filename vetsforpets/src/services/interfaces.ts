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

export interface ILoginResponse {
  login: boolean;
  token: string;
  user: IUserData;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
