export interface IUserStored {
  token: string;
  id: string;
  isVet: boolean;
  email: string;
}

export interface IUserState {
  userData: IUserStored | null;
  setUserData: (data: IUserStored) => void;
  clearUserData: () => void;
}
