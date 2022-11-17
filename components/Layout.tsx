import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <header className="flex flex-col  bg-[#F9ADA0]">
        <div className="self-end">
          <span className="text-white ">Hello John</span>
          <button>deco</button>
        </div>
        <div className="flex flex-col  ">
          {/* <span className="self-center text-[4rem] text-red-500 leading-none">Secret Santa</span> */}
          <div className=" relative h-[8rem] w-full">
            <Image
              priority
              fill
              src={"https://3foisrien.shop/wp-content/uploads/2021/11/Sans-titre-3.png"}
              alt="secret santa logo"
              className="object-contain "
            />
          </div>
        </div>
        <div className=" flex flex-col w-full px-3 ">
          <span className="rounded-xl justify-self-center text-[3rem] text-center bg-red-500 text-white ">
            Secret Santa
          </span>
        </div>
      </header>

      <main className="flex flex-col   ">{children}</main>
      <footer className="flex justify-center w-full border-2 border-black ">
        Image by{" "}
        <a href="https://www.freepik.com/free-vector/hand-drawn-flat-secret-santa-illustration_20112078.htm#page=2&query=secret%20santa&position=22&from_view=keyword">
          Freepik
        </a>
      </footer>
    </div>
  );
};

export default Layout;
