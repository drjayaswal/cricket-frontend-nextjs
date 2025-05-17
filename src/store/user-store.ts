// import { User } from "@/types/user";
// import { create } from "zustand";
//
// type UserStoreType = {
//   user: User | null;
// };
//
// const useUserStore = create<UserStoreType>((set) => ({
//   user: null,
// }));
//
// export { useUserStore };

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

type UserStoreType = {
  user: User | null;
  setUser: (user: User) => void;
};

const useUserStore = create(
  persist<UserStoreType>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);


export { useUserStore };
