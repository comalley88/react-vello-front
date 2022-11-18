import { createContext, useContext } from "react";
export interface SignupFormInputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string
  }

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: (user: SignupFormInputs) => {},
});

export const useAuthContext = () => useContext(AuthContext);