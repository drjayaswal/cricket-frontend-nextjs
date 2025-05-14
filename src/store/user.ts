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
import { User } from "@/types/user";

type UserStoreType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),
  
  clearUser: () => set({ user: null }),
}));

export { useUserStore };
