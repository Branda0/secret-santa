import Head from "next/head";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/groups", {
          method: "GET",
        });
        // setGroups();
        setLoading(false);
      } catch (error) {
        console.log({ error: "fail" });
      }
    };

    fetchData();
  }, []);

  const handleAddGroup = async () => {
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify({ name: "costa" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(response);
      console.log(data);
      // setGroups();
      setLoading(false);
    } catch (error) {
      console.log({ error: "fail" });
    }
  };
  const incrementCount = () => {
    console.log("increment count");
    setCount((prev) => prev + 1);
  };

  console.log("render Home");

  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="secret santa home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{count}</p>
        <p>SALUT</p>
        <button onClick={handleAddGroup}>Ajouter groupe</button>
        <button onClick={incrementCount}>increment</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
