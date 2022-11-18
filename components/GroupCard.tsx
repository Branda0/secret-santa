import Link from "next/link";
import { ObjectId } from "mongodb";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { GroupType } from "../types/types";
import { MemberType } from "../types/types";

const GroupCard = ({ group }: { group: GroupType }) => {
  return (
    <Link
      className="flex flex-1 flex-col gap-2 justify-center items-center rounded-md max-w-[11rem] min-w-[9rem] shadow-sm p-4 bg-red-500"
      href={`/${group._id}`}
    >
      <h1 className=" text text-center text-white">{group.name}</h1>
      <div className="flex flex-wrap gap-1">
        {group.members.map((element, index) => (
          <FontAwesomeIcon key={index} icon={faUser} className="w-2  text-white" />
        ))}
      </div>
    </Link>
  );
};

export default GroupCard;
