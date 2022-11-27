import Cookies from "js-cookie";
import { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { IMember, IUser } from "../types/types";
import Spinner from "./Spinner";

const Secret = ({ member }: { member: IMember }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [memberData, setMemberData] = useState<IMember | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      console.log("fetch ID ", member._id);
      try {
        const response = await fetch(`/api/members/${member._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("santa-userToken")}`,
          },
        });

        const memberData = await response.json();

        if (response.status === 200) {
          console.log(memberData);
          setMemberData(memberData);
          setIsAuth(true);
          setIsFetching(false);
        } else {
          setIsFetching(false);
        }
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

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
            <p>C'est privée ici ... Oust !</p>
          )}
        </div>
      ) : (
        <Spinner size={10} />
      )}
    </div>
  );
};

export default Secret;