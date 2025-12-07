"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "./components/modal/Modal";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleOnClick = () => {
    console.log("uplaod image clicked");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="text-center py-20">
          <h1 className="text-4xl fony-bold mb-4">
            Find yourself in your photos
          </h1>
          <p className="text-gray-600 mb-6">
            Upload a photo library, take a selfie and we’ll show where you
            appear.
          </p>
          <button
            onClick={() => setShowModal(!showModal)}
            className="openModalButton px-6 py-3 bg-[#a3c49d] text-white"
          >
            Get started
          </button>
          {showModal && (
            <Modal
              title="Let's Upload Your Image"
              onClick={handleOnClick}
              handleModalClose={handleModalClose}
            />
          )}
        </div>
      </main>
    </div>
  );
}
