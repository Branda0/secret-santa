import { useState, createContext } from "react";
import { IUser } from "../types/types";

import Cookies from "js-cookie";

export interface AppContextInterface {
  isLogged: boolean;
  updateName: (name: string | null) => void;
  updateToken: (name: string | null) => void;
}

export const UserContext = createContext<AppContextInterface | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(Cookies.get("santa-userToken") ? true : false);

  const updateToken = (token: string | null) => {
    if (token) {
      Cookies.set("santa-userToken", token, { expires: 7 });
      setIsLogged(true);
    } else {
      Cookies.remove("santa-userToken");
      setIsLogged(false);
    }
  };

  const updateName = (userId: string | null) => {
    if (userId) {
      Cookies.set("santa-userId", userId, { expires: 7 });
    } else {
      Cookies.remove("santa-userId");
    }
  };

  return (
    <UserContext.Provider value={{ isLogged, updateName, updateToken }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
