import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IUserStored, IUserState } from "./interfaces";

// USERS

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,

        setUserData: (newData: IUserStored) => {
          set({ userData: newData });
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

// VETS
