import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { UserContext, AppContextInterface } from "../context/User";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLogged, updateName, updateToken } = useContext(UserContext) as AppContextInterface;

  // useEffect to avoid hydratation error when ssr and initial ui are different because of isLogged not available on SSR
  useEffect(() => {
    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  const handleLogout = () => {
    // removes Cookies from browser [userId and auth token]
    updateName(null);
    updateToken(null);
  };
  const [isMounted, setIsMounted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col  bg-[#F9ADA0] p-2 pb-0">
        {isLogged && isMounted ? (
          <div className=" flex items-center self-end absolute">
            <FontAwesomeIcon icon={faUser} className="w-3 mr-2   text-white" />
            <span className="text-white capitalize font-medium">{`Hello ${Cookies.get(
              "santa-userId"
            )}`}</span>
            <button className="btn-red px-3 ml-4 text-xs font-medium" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : null}

        <div className="flex flex-col">
          <div className="relative h-[8rem] w-full mt-10 md:mt-5">
            <Image
              fill
              src={"https://3foisrien.shop/wp-content/uploads/2021/11/Sans-titre-3.png"}
              alt="secret santa logo"
              className="object-contain"
            />
          </div>
        </div>
        <div className="self-center flex flex-col w-full px-3 md:max-w-[70rem]  ">
          <span className="rounded-t-xl justify-self-center p-3 text-4xl md:text-5xl text-center bg-red-500 text-white font-bold ">
            Secret Santa
          </span>
        </div>
      </header>

      <main className={" flex-2 flex-col self-center max-w-4xl px-4 sm:px-10 m-auto my-12 "}>{children}</main>
      <footer className="flex justify-center items-center mt-auto w-full  bg-red-500">
        <a
          href="https://github.com/Branda0/secret-santa"
          target="_blank"
          rel="noreferrer"
          className="pt-1 pb-1 text-white text-xs cursor-pointer"
        >
          Gabriel Brandao • 2022
        </a>
      </footer>
    </div>
  );
};

export default Layout;
