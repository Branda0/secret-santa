import { useState, useContext } from "react";

import { UserContext, AppContextInterface } from "../context/User";
import { IMember } from "../types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

const Login = ({
  member,
  closeLogin,
  setSecretModal,
}: {
  member: IMember;
  closeLogin: () => void;
  setSecretModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateName, updateToken } = useContext(UserContext) as AppContextInterface;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLogging(true);
    try {
      const response = await fetch("/api/members/login", {
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
        setIsLogging(false);
        closeLogin();
        setSecretModal(true);
      } else {
        setLoginError("Erreur de connexion");
        setIsLogging(false);
      }
    } catch (error) {
      setLoginError("Erreur de connexion");
      setIsLogging(false);
    }
  };

  return (
    <div className="flex flex-col w-full sm:min-w-24  ">
      <h1 className="my-4 text-center text-3xl text-gray-700 font-normal">
        Bienvenue <span className="capitalize">{member.name}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-sm text-gray-700 leading-tight focus:outline-red-500 focus:shadow-outline "
            type={passwordVisibility ? "text" : "password"}
            placeholder="Mot de passe"
            required
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
        {isLogging ? (
          <div className="btn-red w-full flex justify-center my-2">
            <Spinner size={7} />
          </div>
        ) : (
          <button className="btn-red w-full font-medium" type="submit">
            Se connecter
          </button>
        )}
        {loginError ? (
          <div className="flex items-center ml-1 mt-3">
            <FontAwesomeIcon icon={faTriangleExclamation} className="flex w-4 mr-3 text-red-500  " />
            <span className="text-xs text-red-500">{loginError}</span>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
