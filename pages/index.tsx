import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Group } from "../types/types";
import { getAllGroups } from "../lib/groups";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import Layout from "../components/Layout";

export default function Home({ groups }: { groups: Array<Group> }) {
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddModal = () => {
    setShowModal(true);
  };

  console.log("render Home");

  return (
    <>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="secret santa home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col ">
          <div className=" p-4 text-gray-800 ">
            <h2 className=" font-semibold text-lg mb-2  ">Comment ça marche ?</h2>
            <p className="text-justify ">
              Tu cherches à organiser un échange de cadeaux avec tes amis ou de la famille ? Commence donc par
              créer ton groupe, puis invite chaque participant à visiter cette page, chacun pourra alors se
              connecter à son propre espace et connaitre l'identité de son "secret santa"
            </p>
          </div>
          <button
            className=" self-center flex justify-center items-center w-1/2 btn-red"
            onClick={handleAddModal}
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 text-white mr-2" />
            Ajouter un groupe
          </button>
          <div className=" p-4 text-gray-800 ">
            <h2 className=" font-semibold text-lg mb-2  ">Rejoind ton groupe !</h2>
            <section>
              {groups.map((group) => (
                <Link key={group._id} href={`/${group.name}`}>
                  <h1 className="text-start text">{group.name}</h1>
                </Link>
              ))}
            </section>
          </div>
        </div>
      </Layout>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}

// server side rendering - getting all groups from database on page load
export const getServerSideProps = async (context) => {
  try {
    const allGroups = await getAllGroups();

    return {
      props: { groups: JSON.parse(JSON.stringify(allGroups)) },
    };
  } catch (e) {
    console.error(e);
  }
};
