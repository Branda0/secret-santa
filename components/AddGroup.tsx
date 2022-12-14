import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { UserContext, AppContextInterface } from "../context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faXmark,
  faPlus,
  faCircleInfo,
  faTriangleExclamation,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import Tooltip from "./Tooltip";
import Spinner from "./Spinner";

const AddGroup = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [groupName, setGroupName] = useState<string>("");
  const [groupMembers, setGroupMember] = useState<{ name: string; subGroup: string }[]>([
    { name: "", subGroup: "1" },
    { name: "", subGroup: "2" },
    { name: "", subGroup: "3" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGroupCreating, setIsGroupCreating] = useState(false);
  const [isGroupCreated, setIsGroupCreated] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage("");

    // filter empty member table fields
    // if we have less than 3 members or duplicate names return error and skip api call
    const filteredMembers = groupMembers.filter((member) => member.name != "");
    console.log(filteredMembers);
    const uniqueValues = new Set(filteredMembers.map((member) => member.name.toLowerCase()));

    if (uniqueValues.size !== filteredMembers.length) {
      setErrorMessage("Chaque membre doit avoir un nom différent");
      return;
    }
    if (filteredMembers.length < 3) {
      setErrorMessage("Au moins 3 membres sont requis pour votre groupe");
      return;
    }

    // entry values ok => api call for db group and members creation
    setIsGroupCreating(true);

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify({ name: groupName, members: filteredMembers }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const groups = await response.json();

      // if update succeded reload page to get fresh SSR data
      if (response.status === 200) {
        setIsGroupCreated(true);
        router.replace(router.asPath);
      } else {
        setErrorMessage(groups.error.message);
      }
      setIsGroupCreating(false);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erreur de création de groupe, veuillez réessayer");
    }
    setIsGroupCreating(false);
  };

  const handleRemoveMember = (indexToRemove: number) => {
    setGroupMember(groupMembers.filter((member, index) => index != indexToRemove));
  };

  const handleAddMemberRow = () => {
    setGroupMember((prev) => [...prev, { name: "", subGroup: (groupMembers.length + 1).toString() }]);
  };

  const updateGroupMember = (
    { name, subGroup }: { name?: string; subGroup?: string },
    indexToUpdate: number
  ) => {
    const newState = groupMembers.map((member, index) => {
      if (index === indexToUpdate) {
        if (name) return { ...member, name: name };
        if (name === "") return { ...member, name: "" };
        if (subGroup) return { ...member, subGroup: subGroup };
        if (subGroup === "") return { ...member, subGroup: "" };
      }

      return member;
    });
    setGroupMember(newState);
  };

  return (
    <div className="flex flex-col w-full sm:min-w-24  ">
      {!isGroupCreated ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label htmlFor="name" className=" px-1 font-medium text-gray-700   ">
            Groupe
          </label>
          <input
            type="text"
            id="name"
            maxLength={16}
            value={`${groupName.charAt(0).toUpperCase()}${groupName.slice(1)}`}
            onChange={(e) => setGroupName(e.target.value.toLowerCase())}
            required
            placeholder="Votre nom de groupe"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 mb-2 text-sm text-gray-700 leading-tight focus:outline-red-500 focus:shadow-outline"
          />
          <div className="flex items-center mt-3 justify-between">
            <span className="px-1 font-medium text-gray-700 ">Membres</span>

            <div className=" px-10 ">
              <Tooltip message={"Pas de cadeaux mutuels si même n°"}>
                <FontAwesomeIcon icon={faCircleInfo} className="w-4  text-red-500 cursor-pointer" />
              </Tooltip>
            </div>
          </div>
          <div id="members" className="flex flex-col">
            {groupMembers.map((member, index) => {
              return (
                <div className="flex my-1" key={`member-${index}`}>
                  <input
                    type="text"
                    id="name"
                    maxLength={14}
                    value={`${member.name.charAt(0).toUpperCase()}${member.name.slice(1)}`}
                    onChange={(e) => updateGroupMember({ name: e.target.value.toLowerCase() }, index)}
                    placeholder="Nom du membre"
                    className="shadow appearance-none border rounded w-full py-2 px-3   text-sm  text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
                  />

                  <input
                    type="number"
                    inputMode="numeric"
                    id="subGroup"
                    min={1}
                    required
                    value={parseInt(member.subGroup)}
                    onChange={(e) => updateGroupMember({ subGroup: e.target.value }, index)}
                    className="flex items-center shadow appearance-none border rounded w-10 mx-2 py-2 text-sm text-gray-700 text-center leading-tight focus:outline-red-400 focus:shadow-outline"
                  />

                  <FontAwesomeIcon
                    icon={faXmark}
                    className="w-4 ml-2 text-red-500 cursor-pointer"
                    onClick={(e) => handleRemoveMember(index)}
                  />
                </div>
              );
            })}
            <FontAwesomeIcon
              icon={faPlus}
              className="w-5 m-2 text-red-500 self-center cursor-pointer"
              onClick={handleAddMemberRow}
            />
          </div>
          <button
            type="submit"
            disabled={isGroupCreated || isGroupCreating}
            className={`btn-red flex justify-center  self-center w-full m-1 ${
              isGroupCreating ? "cursor-wait" : isGroupCreated ? "" : "hover:scale-2"
            }  `}
          >
            {isGroupCreating ? (
              <Spinner size={5} />
            ) : isGroupCreated ? (
              <span className="flex items-center">
                Groupe bien enregistré <FontAwesomeIcon icon={faCheck} className="w-5 m-2 self-center" />{" "}
              </span>
            ) : (
              <span className="font-medium">Créer mon groupe</span>
            )}
          </button>
          {errorMessage ? (
            <div className="flex items-center mt-3">
              <FontAwesomeIcon icon={faTriangleExclamation} className="flex w-4 mr-3 text-red-500  " />
              <span className="text-xs text-red-500">{errorMessage}</span>
            </div>
          ) : null}
        </form>
      ) : null}
      {isGroupCreated ? (
        <div className="btn-red m-2 mt-4 ml-1">
          <span className="flex font-medium justify-center items-center ">
            Groupe bien enregistré <FontAwesomeIcon icon={faCheck} className=" w-5 m-2 self-center" />{" "}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default AddGroup;
