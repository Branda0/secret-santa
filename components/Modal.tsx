import { useEffect, useState, useRef } from "react";
import { faRectangleXmark, faXmark, faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stringify } from "querystring";
import Tooltip from "./Tooltip";

import { ReactNode } from "react";
import { Number } from "mongoose";

const Modal = ({ onClose }: { onClose: () => void }) => {
  console.log("render Modal");
  const modalRef = useRef(null);

  const [groupName, setGroupName] = useState<string>("");
  const [groupMembers, setGroupMember] = useState<{ name: string; subGroup: string }[]>([
    { name: "", subGroup: "1" },
    { name: "", subGroup: "2" },
    { name: "", subGroup: "3" },
  ]);

  useEffect(() => {
    // document.body.classList.add("overflow-hidden");
    // return document.body.classList.remove("overflow-hidden");
  }, []);

  const handleClose = () => {
    modalRef.current.classList.remove("animate-fadeIn");
    modalRef.current.classList.add("animate-fadeOut");
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    (event.target as Element).id === "modal-wrapper" && handleClose();
  };

  const handleRemoveMember = (indexToRemove: number) => {
    setGroupMember(groupMembers.filter((member, index) => index != indexToRemove));
  };

  const handleAddMemberRow = () => {
    setGroupMember((prev) => [...prev, { name: "", subGroup: (groupMembers.length + 1).toString() }]);
  };

  const updateGroupMemberName = (memberName: string, indexToUpdate: number) => {
    const newState = groupMembers.map((member, index) => {
      if (index === indexToUpdate) return { ...member, name: memberName };

      return member;
    });
    setGroupMember(newState);
  };

  const updateGroupMember = (
    { name, subGroup }: { name?: string; subGroup?: string },
    indexToUpdate: number
  ) => {
    console.log("in newstate");
    console.log(subGroup);
    console.log(typeof subGroup);
    const newState = groupMembers.map((member, index) => {
      if (index === indexToUpdate) {
        if (name) return { ...member, name: name };
        if (subGroup) return { ...member, subGroup: subGroup };
        if (subGroup === "") return { ...member, subGroup: "" };
      }

      return member;
    });
    setGroupMember(newState);
  };

  return (
    <div
      id="modal-wrapper"
      className=" fixed inset-0 bg-opacity-25 bg-black
     backdrop-blur flex flex-col items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="flex overflow-y-scroll flex-col  bg-white w-[600px] m-10 p-5 shadow-md rounded-md animate-fadeIn"
      >
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faRectangleXmark}
            className="flex w-7 text-red-500   cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <form action="" className="flex flex-col w-full">
          <label htmlFor="name" className=" px-1 font-medium text-gray-700   ">
            Groupe
          </label>
          <input
            type="text"
            id="name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            placeholder="'Votre nom de groupe'"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 mb-2 text-sm  text-gray-700 leading-tight focus:outline-red-500 focus:shadow-outline"
          />
          <div className="flex items-center mt-3 justify-between">
            <span className="px-1 font-medium text-gray-700 ">Membres</span>

            <div className=" px-10 ">
              <Tooltip message={"même chiffre = pas de cadeaux l'un à l'autre"}>
                <FontAwesomeIcon icon={faCircleInfo} className="w-4  text-red-500 cursor-pointer" />
              </Tooltip>
            </div>
          </div>

          <div id="members" className="flex flex-col">
            {groupMembers.map((member, index) => {
              return (
                <div className="flex" key={`member-${index}`}>
                  <input
                    type="text"
                    id="name"
                    value={member.name}
                    onChange={(e) => updateGroupMember({ name: e.target.value }, index)}
                    placeholder="'Nom du membre'"
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-1  text-sm  text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
                  />

                  <input
                    type="number"
                    id="subGroup"
                    min={1}
                    // max={40}
                    required
                    value={parseInt(member.subGroup)}
                    onChange={(e) => updateGroupMember({ subGroup: e.target.value }, index)}
                    className="flex items-center  shadow appearance-none border w-10 rounded py-2 px-3 my-1 mx-2  text-sm  text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
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
            className="self-center text-white font-medium bg-red-500 rounded-lg px-4 py-2 mt-3 hover:bg-red-400 "
          >
            Créer mon groupe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
