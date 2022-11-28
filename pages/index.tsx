import Head from "next/head";
import { useState } from "react";

import { IGroup } from "../types/types";
import { getAllGroups } from "../lib/groups";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddGroup from "../components/AddGroup";
import ModalWrapper from "../components/ModalWrapper";
import Layout from "../components/Layout";
import GroupCard from "../components/GroupCard";

export default function Home({ groups }: { groups: Array<IGroup> }) {
  const [addGroupModal, setAddGroupModal] = useState(false);

  return (
    <>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="secret santa home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col ">
          <div className=" text-gray-700 my-5">
            <h2 className=" font-bold text-lg mb-5 text-center underline underline-offset-8 decoration-2 decoration-red-500 md:text-left ">
              Comment ça marche ?
            </h2>
            <p className="text-center px-6">
              Tu cherches à organiser un <span className="font-semibold ">échange de cadeaux</span> avec tes
              amis ou de la famille ?<br /> Commence donc par
              <span className="font-semibold "> créer ton groupe</span>, puis invite chaque participant à
              visiter cette page, chacun pourra alors se
              <span className="font-semibold "> connecter à son propre espace</span> et connaitre
              l&apos;identité de son <span className="font-semibold ">secret santa</span>
            </p>
          </div>
          <button
            className="btn-red self-center flex justify-center items-center p-6 "
            onClick={() => setAddGroupModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 text-white mr-2" />
            Ajouter un groupe
          </button>
          <div className="flex flex-col mt-10 ">
            <h2 className=" font-bold  text-center text-gray-700 text-lg mb-5 underline underline-offset-8 decoration-2 decoration-red-500  md:text-left  ">
              Rejoins ton groupe !
            </h2>
            <section className="flex flex-wrap justify-center gap-3 ">
              {groups.map((group) => (
                <GroupCard key={`group-${group._id}`} group={group} />
              ))}
            </section>
          </div>
        </div>
      </Layout>
      {addGroupModal ? (
        <ModalWrapper onClose={() => setAddGroupModal(false)}>
          <AddGroup />
        </ModalWrapper>
      ) : null}
    </>
  );
}

// server side rendering - getting all groups from database on page load
export const getServerSideProps = async () => {
  try {
    const allGroups = await getAllGroups();

    return {
      props: { groups: JSON.parse(JSON.stringify(allGroups)) },
    };
  } catch (e) {
    console.error(e);
  }
};
