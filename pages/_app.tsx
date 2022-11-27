import "../styles/globals.css";
import UserProvider from "../context/User";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}
