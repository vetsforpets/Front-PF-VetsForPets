import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IUserStored, IUserState } from "./interfaces";
import { jwtDecode } from "jwt-decode";

// USERS

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,

        setUserData: (token: string) => {
          try {
            const decoded = jwtDecode<IUserStored>(token);
            set({ userData: decoded });
          } catch (error) {
            console.error("Error al decodificar el token:", error);
          }
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
