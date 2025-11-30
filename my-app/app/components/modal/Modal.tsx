import React from "react";
import Image from "next/image";

type ModalProps = {
  title: string;
  onClick: () => void;
  handleModalClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, onClick, handleModalClose }) => {
  return (
    <div className="modalContainer">
      <div className="modalBackground" onClick={handleModalClose}></div>
      <div className="modalContent">
        <h1 className="modalTitle">{title}</h1>
        <div className="selfiePlaceholderWrapper">
          <Image src="/upload.png" alt="upload selfie" width={50} height={50} />
        </div>
        <button className="modalButton" onClick={onClick}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default Modal;
