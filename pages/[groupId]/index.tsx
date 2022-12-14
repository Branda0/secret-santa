import Head from "next/head";
import { useState } from "react";

import { GetServerSidePropsContext } from "next";
import { IGroup, IMember } from "../../types/types";
import { getGroup } from "../../lib/groups";

import ModalWrapper from "../../components/ModalWrapper";
import StatusHandler from "../../components/StatusHandler";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Secret from "../../components/Secret";

export default function Group({ group }: { group: IGroup }) {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [secretModal, setSecretModal] = useState(false);
  const [memberCardInfo, setMembercardInfo] = useState<IMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMemberClick = async (member: IMember) => {
    setMembercardInfo(member);
    setIsLoading(true);
  };

  const handleModalClose = () => {
    if (loginModal) {
      setLoginModal(false);
    } else if (signupModal) {
      setSignupModal(false);
    } else if (secretModal) {
      setSecretModal(false);
    } else if (isLoading) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`Secret Santa - ${group.name}`}</title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-5 mb-8 text-gray-800 ">
        <h2 className=" font-medium text-center text-lg mb-2  ">
          Découvres ton <span className="font-bold text-red-500">Secret Santa </span> ...
        </h2>
      </div>
      <section className="flex flex-wrap justify-center gap-3 ">
        {group.members
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((member) => (
            <button
              key={`member${member.name}`}
              className="flex flex-col gap-2 justify-center items-center rounded-md min-w-[9rem] shadow-lg p-4 bg-red-500 border-2 border-transparent hover:border-red-700"
              onClick={() => handleMemberClick(member)}
            >
              <span className="text-white capitalize font-medium">{member.name}</span>
            </button>
          ))}
      </section>

      {loginModal || secretModal || signupModal || isLoading ? (
        <ModalWrapper onClose={handleModalClose}>
          {isLoading ? (
            <StatusHandler
              member={memberCardInfo as IMember}
              setIsLoading={setIsLoading}
              setSignupModal={setSignupModal}
              setSecretModal={setSecretModal}
              setLoginModal={setLoginModal}
            />
          ) : null}
          {loginModal ? (
            <Login
              member={memberCardInfo as IMember}
              closeLogin={() => setLoginModal(false)}
              setSecretModal={setSecretModal}
            />
          ) : null}
          {signupModal ? (
            <Signup
              member={memberCardInfo as IMember}
              closeSignup={() => setSignupModal(false)}
              setSecretModal={setSecretModal}
            />
          ) : null}
          {secretModal ? <Secret member={memberCardInfo as IMember} /> : null}
        </ModalWrapper>
      ) : null}
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
