import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const ModalWrapper = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("animate-fadeIn");
      modalRef.current.classList.add("animate-fadeOut");
    }
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    (event.target as Element).id === "modal-wrapper" && handleClose();
  };

  return (
    <div
      id="modal-wrapper"
      className="fixed inset-0 bg-opacity-40 px-2 bg-black
     backdrop-blur flex flex-col items-center justify-center "
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="flex overflow-auto flex-col bg-white p-5 w-full shadow-md rounded-md animate-fadeIn sm:w-fit  "
      >
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faRectangleXmark}
            className="flex w-7 text-red-500   cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
