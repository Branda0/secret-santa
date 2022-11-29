import Head from "next/head";
import { useState, useContext } from "react";

import { UserContext, AppContextInterface } from "../../context/User";
import { GetServerSidePropsContext } from "next";
import { IGroup, IMember } from "../../types/types";
import { getGroup } from "../../lib/groups";

import ModalWrapper from "../../components/ModalWrapper";
import Spinner from "../../components/Spinner";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Secret from "../../components/Secret";

export default function Group({ group }: { group: IGroup }) {
  const { isLogged, updateName } = useContext(UserContext) as AppContextInterface;
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [secretModal, setSecretModal] = useState(false);
  const [memberCardInfo, setMembercardInfo] = useState<IMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMemberClick = async (member: IMember) => {
    try {
      setIsLoading(true);
      setMembercardInfo(member);
      const response = await fetch(`/api/members/status?id=${member._id}`, {
        method: "GET",
      });

      const memberStatus = await response.json();

      if (response.status === 200) {
        if (memberStatus.status === "signed") {
          if (isLogged) {
            setSecretModal(true);
          } else {
            setLoginModal(true);
          }
        } else {
          setSignupModal(true);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
            <div className="flex justify-center mt-6 mb-4 w-full sm:min-w-24 ">
              <Spinner size={7} />
            </div>
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
