import Image from "next/image";
import { Roboto } from "@next/font/google";
import { useState, useContext } from "react";

import { UserContext } from "../context/User";

interface AppContextInterface {
  isLogged?: boolean;
  setIsLogged?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: { userId: string; userToken: string };
  setUser?: React.Dispatch<React.SetStateAction<{ userId: string; userToken: string }>>;
}

const roboto = Roboto({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const isLogged = useContext(User);
  // const setIsLogged = useContext(Config);
  const { isLogged, setIsLogged } = useContext(UserContext) as AppContextInterface;

  return (
    <div className="">
      <header className="flex flex-col  bg-[#F9ADA0]">
        <div className="self-end">
          {isLogged ? <span className="text-white ">{`Hello TOI`}</span> : null}
          {/* <span className="text-white ">{`context name :${name}`}</span> */}

          <button onClick={() => setIsLogged((prev: boolean) => !prev)}>deco</button>
        </div>
        <div className="flex flex-col">
          <div className="relative h-[8rem] w-full">
            <Image
              fill
              src={"https://3foisrien.shop/wp-content/uploads/2021/11/Sans-titre-3.png"}
              alt="secret santa logo"
              className="object-contain "
            />
          </div>
        </div>
        <div className=" flex flex-col w-full px-3 ">
          <span className="rounded-xl justify-self-center text-[3rem] text-center bg-red-500 text-white font-bold ">
            Secret Santa
          </span>
        </div>
      </header>

      <main className={`${roboto.className} flex flex-col self-center max-w-4xl m-auto my-3`}>
        {children}
      </main>
      <footer className="flex justify-center w-full border-2 border-black ">
        Image by{" "}
        {/* <a href="https://www.freepik.com/free-vector/hand-drawn-flat-secret-santa-illustration_20112078.htm#page=2&query=secret%20santa&position=22&from_view=keyword">
          Freepik
        </a> */}
      </footer>
    </div>
  );
};

export default Layout;
