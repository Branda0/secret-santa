import Cookies from "js-cookie";
import { useState, useContext, useEffect } from "react";

import { IMember } from "../types/types";
import Spinner from "./Spinner";

const Secret = ({ member }: { member: IMember }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [memberData, setMemberData] = useState<IMember | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const response = await fetch(`/api/members/${member._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("santa-userToken")}`,
          },
          signal: controller.signal,
        });

        const memberData = await response.json();

        if (response.status === 200) {
          setMemberData(memberData);
          setIsAuth(true);
        }
      } catch (error) {
        console.log(error);
        if (controller.signal.aborted) return;
      }
      setIsFetching(false);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [member]);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6 mb-4 sm:min-w-24  ">
      {!isFetching ? (
        <div className="">
          {isAuth ? (
            <p className="font-medium    ">
              <span className="font-bold capitalize underline underline-offset-4 decoration-2 decoration-red-500">
                {Cookies.get("santa-userId")}
              </span>{" "}
              ton secret santa est{" "}
              <span className="font-bold capitalize underline underline-offset-4 decoration-2 decoration-red-500 ">
                {memberData?.secret}
              </span>
            </p>
          ) : (
            <p className="font-medium">
              C&apos;est{" "}
              <span className="font-semibold underline underline-offset-4 decoration-2 decoration-red-500 ">
                priv??
              </span>{" "}
              ici ... Oust !
            </p>
          )}
        </div>
      ) : (
        <Spinner size={7} />
      )}
    </div>
  );
};

export default Secret;
