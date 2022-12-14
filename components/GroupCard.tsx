import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { IGroup } from "../types/types";

const GroupCard = ({ group }: { group: IGroup }) => {
  return (
    <Link
      className="flex border-2 border-transparent flex-col gap-2 justify-center items-center rounded-md max-w-fit min-w-[9rem] shadow-lg p-4 bg-red-500 hover:border-red-700
      "
      href={`/${group._id}`}
    >
      <h1 className=" text text-center text-white capitalize font-medium">{group.name}</h1>
      <div className="flex flex-wrap gap-1">
        {group.members.map((element, index) => (
          <FontAwesomeIcon key={index} icon={faUser} className="w-2  text-white" />
        ))}
      </div>
    </Link>
  );
};

export default GroupCard;
