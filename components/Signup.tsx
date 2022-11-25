import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    //APPEL API SIGNUP
  };

  const member = { name: "Gabriel" };
  return (
    <div className="flex flex-col w-full sm:min-w-24  ">
      <h1 className="my-4 self-center text-3xl text-gray-800 font-medium">
        Bienvenue <span className="capitalize">{member.name}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 my-4 text-sm capitalize text-gray-700 leading-tight focus:outline-red-500 focus:shadow-outline "
            type={passwordVisibility ? "text" : "password"}
            placeholder="Mot de passe"
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
        {signupError && <span className="error-msg">{signupError}</span>}
        <button className="btn-red w-full font" type="submit">
          Créer mon compte
        </button>
      </form>
    </div>
  );
};

export default Signup;
