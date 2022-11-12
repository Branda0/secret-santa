import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { getAllGroups } from "../lib/groups";

import clientPromise from "../lib/mongodb";

type Group = {
  name: string;
  _id: number;
};

export default function Home({ groups }: { groups: Array<Group> }) {
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  // const [groups, setGroups] = useState([]);

  const router = useRouter();

  const handleAddGroup = async () => {
    try {
      const update = await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify({ name: "costa" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // if update succeded reload page to get fresh SSR data
      if (update.status == 200) {
        router.replace(router.asPath);
      }
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
        <section>
          {groups.map((group) => (
            <Link key={group._id} href={`/${group.name}`}>
              <h1>{group.name}</h1>
            </Link>
          ))}
        </section>
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

// server side rendering - getting all groups from database on page load
export const getServerSideProps = async (context) => {
  console.log({ context });
  try {
    const allGroups = await getAllGroups();

    return {
      props: { groups: JSON.parse(JSON.stringify(allGroups)) },
    };
  } catch (e) {
    console.error(e);
  }
};
