import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IUserStored, IUserState, IEmergencyFlagState } from "./interfaces";

// USERS

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,

        setUserData: (data: IUserStored) => {
          set({ userData: data });
        },

        clearUserData: () => {
          set({ userData: null });
        },
      }),
      {
        name: "user-data",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

// EMERGENCY FLAG

export const useEmergencyFlagStore = create<IEmergencyFlagState>()(
  devtools(
    persist(
      (set) => ({
        emergencyFlag: false,

        setEmergencyFlag: (data: boolean) => {
          set({ emergencyFlag: data });
        },

        clearEmergencyFlag: () => {
          set({ emergencyFlag: false });
        },
      }),
      {
        name: "emergency-flag",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
