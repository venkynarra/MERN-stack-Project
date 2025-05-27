import {createContext} from "react";

export const AuthContext = createContext({isLoggedIn : false, userId: null, login:()=> {}, logout:()=> {} });
console.log("Context default:", {
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});

