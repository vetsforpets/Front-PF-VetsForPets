export interface IUserStored {
  token: string;
  id: string;
  isVet: boolean;
}

export interface IUserState {
  userData: IUserStored | null;
  setUserData: (data: IUserStored) => void;
  clearUserData: () => void;
}
