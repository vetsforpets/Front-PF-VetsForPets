export interface IUserStored {
  token: string;
  id: string;
  role: string;
  email: string;
}

export interface IUserState {
  userData: IUserStored | null;
  setUserData: (data: IUserStored) => void;
  clearUserData: () => void;
}

export interface IEmergencyFlagState {
  emergencyFlag: boolean;
  setEmergencyFlag: (data: boolean) => void;
  clearEmergencyFlag: () => void;
}
