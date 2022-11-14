import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap');
        </style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
