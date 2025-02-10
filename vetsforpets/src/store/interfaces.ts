export interface IUserStored {
  token: string;
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role?: string;
  credential?: {
    id: number;
  };
}

export interface IUserState {
  userData: IUserStored | null;
  setUserData: (token: string) => void;
  clearUserData: () => void;
}
