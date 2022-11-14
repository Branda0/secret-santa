import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
// import styles from "../styles/Home.module.css";
import { getAllGroups } from "../lib/groups";

import Modal from "../components/Modal";
import { Button, Button2 } from "../components/Buttons";

import clientPromise from "../lib/mongodb";

type Group = {
  name: string;
  _id: number;
};

export default function Home({ groups }: { groups: Array<Group> }) {
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleAddModal = () => {
    setShowModal(true);
  };

  console.log("render Home");

  return (
    <div>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="secret santa home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{count}</p>
        <section>
          {groups.map((group) => (
            <Link key={group._id} href={`/${group.name}`}>
              <h1 className="text-start text">{group.name}</h1>
            </Link>
          ))}
        </section>
        <Button handleClick={incrementCount}>increment</Button>
        <Button2 handleClick={handleAddGroup}>Créer Groupe</Button2>
        <Button2 handleClick={handleAddModal}>Ajouter un groupe</Button2>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
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
