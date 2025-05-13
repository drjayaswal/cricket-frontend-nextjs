import { User } from "@/types/user";
import { create } from "zustand";

type UserStoreType = {
  user: User | null;
};

const useStore = create<UserStoreType>((set) => ({
  user: null,
}));

export { useStore };
