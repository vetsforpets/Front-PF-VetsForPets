import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IUserStored, IUserState } from "./interfaces";

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

// VETS
