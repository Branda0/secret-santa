import { useEffect, useContext } from "react";
import { UserContext, AppContextInterface } from "../context/User";

import { IMember } from "../types/types";
import Spinner from "./Spinner";

const StatusHandler = ({
  member,
  setSecretModal,
  setLoginModal,
  setSignupModal,
  setIsLoading,
}: {
  member: IMember;
  setSecretModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isLogged } = useContext(UserContext) as AppContextInterface;

  useEffect(() => {
    const controller = new AbortController();

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/members/status?id=${member._id}`, {
          method: "GET",
          signal: controller.signal,
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
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchStatus();

    return () => {
      controller.abort();
    };
  }, [member]);

  return (
    <div className="flex justify-center mt-6 mb-4 w-full sm:min-w-24 ">
      <Spinner size={7} />
    </div>
  );
};

export default StatusHandler;
