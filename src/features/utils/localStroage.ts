import { IUser } from "../../models/model";

const AUTH_USER_KEY = "vello.auth.user";
const AUTH_JWT_KEY = "vello.auth.jwt";

export const storeInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key) ? localStorage.getItem(key) : "";
};

export const storeAuthInLocalStorage = (user: IUser, jwt: string) => {
  storeInLocalStorage(AUTH_USER_KEY, JSON.stringify(user));
  storeInLocalStorage(AUTH_JWT_KEY, jwt);
};

export const getAuthFromLocalStorage = (): { user: IUser | null; jwt: string | null } => {
  const userStr = getFromLocalStorage(AUTH_USER_KEY);
  const user = userStr && userStr !== "" ? (JSON.parse(userStr) as IUser) : null;
  const jwt = getFromLocalStorage(AUTH_JWT_KEY);
  return { user, jwt };
};