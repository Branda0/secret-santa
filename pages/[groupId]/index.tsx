import Head from "next/head";
import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";

import { UserContext, AppContextInterface } from "../../context/User";
import { GetServerSidePropsContext } from "next";
import { IGroup, IMember } from "../../types/types";
import { getGroup } from "../../lib/groups";

import ModalWrapper from "../../components/ModalWrapper";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Secret from "../../components/Secret";
import Layout from "../../components/Layout";

export default function Group({ group }: { group: IGroup }) {
  const { isLogged, updateName } = useContext(UserContext) as AppContextInterface;
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [secretModal, setSecretModal] = useState(false);
  const [memberCardInfo, setMembercardInfo] = useState<IMember | null>(null);

  useEffect(() => {}, []);

  const handleMemberClick = async (member: IMember) => {
    try {
      setMembercardInfo(member);
      const response = await fetch(`/api/members/status?id=${member._id}`, {
        method: "GET",
      });

      const memberStatus = await response.json();

      if (response.status == 200) {
        if (memberStatus.status === "signed") {
          if (isLogged) {
            setSecretModal(true);
          } else {
            setLoginModal(true);
          }
        } else {
          setSignupModal(true);
        }
      } else {
        alert("Erreur de connexion au serveur");
      }
    } catch (error) {
      console.log(error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <>
      <Head>
        <title>Secret Santa -</title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-10 mb-8 text-gray-800 ">
          <h2 className=" font-medium text-center text-lg mb-2  ">
            Découvres ton <span className="font-bold text-red-500">Secret Santa </span> ...
          </h2>
        </div>
        <section className="flex flex-wrap justify-center gap-3 ">
          {group.members.map((member) => (
            <button
              key={`member${member.name}`}
              className="flex flex-1 flex-col gap-2 justify-center items-center rounded-md max-w-[11rem] min-w-[9rem] shadow-lg p-4 bg-red-500"
              onClick={() => handleMemberClick(member)}
            >
              <span className="text-white capitalize font-medium">{member.name}</span>
            </button>
          ))}
        </section>
        {loginModal ? (
          <ModalWrapper onClose={() => setLoginModal(false)}>
            <Login
              member={memberCardInfo as IMember}
              closeLogin={() => setLoginModal(false)}
              setSecretModal={setSecretModal}
            />
          </ModalWrapper>
        ) : null}
        {signupModal ? (
          <ModalWrapper onClose={() => setSignupModal(false)}>
            <Signup
              member={memberCardInfo as IMember}
              closeSignup={() => setLoginModal(false)}
              setSecretModal={setSecretModal}
            />
          </ModalWrapper>
        ) : null}
        {secretModal ? (
          <ModalWrapper onClose={() => setSecretModal(false)}>
            <Secret member={memberCardInfo as IMember} />
          </ModalWrapper>
        ) : null}
      </Layout>
    </>
  );
}

// server side rendering - getting all groups from database on page load
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const groupId = context.params?.groupId as string;

    const group = await getGroup(groupId);

    if (!group) {
      return {
        notFound: true,
      };
    }
    return {
      props: { group: JSON.parse(JSON.stringify(group)) },
    };
  } catch (e) {
    return {
      notFound: true,
    };
    // }
  }
};
