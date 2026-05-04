import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const savedUser = localStorage.getItem("user")

const useAuthStore = create<AuthState>((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,

  isAuthenticated: savedUser ? true : false,

  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
      isAuthenticated: false
    });
  }
}));

export default useAuthStore;