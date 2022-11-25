import { useState, createContext } from "react";

interface AppContextInterface {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: { userId: string; userToken: string };
  setUser?: React.Dispatch<React.SetStateAction<{ userId: string; userToken: string }>>;
}

export const UserContext = createContext<AppContextInterface | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [user, setUser] = useState<{ userId: string; userToken: string }>({
    userId: "",
    userToken: "",
  });

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
