import { useState, useContext } from "react";

import { UserContext, AppContextInterface } from "../context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { IMember } from "../types/types";
import Spinner from "./Spinner";

const Signup = ({
  member,
  closeSignup,
  setSecretModal,
}: {
  member: IMember;
  closeSignup: () => void;
  setSecretModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateName, updateToken } = useContext(UserContext) as AppContextInterface;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [password, setPassword] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSigning(true);
    try {
      const response = await fetch("/api/members/signup", {
        method: "POST",
        body: JSON.stringify({ id: member._id, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const memberData = await response.json();
        updateName(memberData.name);
        updateToken(memberData.account.token);
        setIsSigning(false);
        closeSignup();
        setSecretModal(true);
      } else {
        setSignupError("Erreur lors de la création du compte");
        setIsSigning(false);
      }
    } catch (error) {
      setSignupError("Erreur lors de la création du compte");
      setIsSigning(false);
    }
  };

  return (
    <div className="flex flex-col w-full sm:min-w-24  ">
      <h1 className="my-4 text-center text-3xl text-gray-800 font-normal">
        Bienvenue <span className="capitalize">{member.name}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 my-4 text-sm text-gray-700 leading-tight focus:outline-red-500 focus:shadow-outline "
            type={passwordVisibility ? "text" : "password"}
            placeholder="Mot de passe"
            required
            minLength={6}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={faEye}
            className="flex w-4  text-red-500 mr-3  cursor-pointer absolute right-0 bottom-0 top-0 m-auto"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
        </div>

        {isSigning ? (
          <div className="btn-red w-full flex justify-center my-2">
            <Spinner size={7} />
          </div>
        ) : (
          <button className="btn-red w-full font-medium" type="submit">
            Créer mon compte
          </button>
        )}
        {signupError ? (
          <div className="flex items-center ml-1 mt-3">
            <FontAwesomeIcon icon={faTriangleExclamation} className="flex w-4 mr-3 text-red-500  " />
            <span className="text-xs text-red-500">{signupError}</span>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
