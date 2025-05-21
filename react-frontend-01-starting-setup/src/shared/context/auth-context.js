import {createContext} from "react";

export const AUthContext = createContext({isLoggedIn : false, login:()=> {}, logout:()=> {} });

