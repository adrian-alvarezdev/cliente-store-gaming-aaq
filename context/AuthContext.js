import {createContext} from "react";

const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logOut: () => null,
  setReloadUser: () => null,
});

export default AuthContext;
