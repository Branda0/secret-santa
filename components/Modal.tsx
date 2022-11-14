import { useEffect, useState, useRef } from "react";

const Modal = ({ onClose }: { onClose: () => void }) => {
  console.log("render Modal");
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClose = () => {
    modalRef.current.classList.add("animate-fadeOut");
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
      className=" fixed inset-0 bg-opacity-25 bg-black
     backdrop-blur flex flex-col items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="opacity-100 flex flex-col items-center bg-white w-[600px] shadow-md rounded-md animate-fadeIn"
      >
        <span className=" self-end m-2 bg-black bg-opacity-0 bottom-0" onClick={handleClose}>
          X
        </span>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <div className="font-nunito font-semibold ">Hello</div>
        <button>CLICK</button>
      </div>
    </div>
  );
};

export default Modal;
