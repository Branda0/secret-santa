import "../styles/globals.css";
import UserProvider from "../context/User";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
