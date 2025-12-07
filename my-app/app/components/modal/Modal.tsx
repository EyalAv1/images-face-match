import React, { useRef, useState } from "react";
import Image from "next/image";

type ModalProps = {
  title: string;
  onClick: () => void;
  handleModalClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, onClick, handleModalClose }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const openCamera = () => cameraInputRef.current?.click();
  const openFilePicker = () => fileInputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;

    const isHeic =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");

    // Load heic2any only on client
    if (isHeic) {
      try {
        const heic2any = (await import("heic2any")).default;

        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        file = new File(
          [convertedBlob as Blob],
          file.name.replace(/\.\w+$/, ".jpg"),
          { type: "image/jpeg" }
        );
      } catch (err) {
        console.error("HEIC conversion failed:", err);
        alert("Unable to convert HEIC file.");
        return;
      }
    }

    // Display preview
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  return (
    <div className="modalContainer">
      <div className="modalBackground" onClick={handleModalClose}></div>
      <div className="modalContent">
        <h1 className="modalTitle">{title}</h1>

        <div className="selfiePlaceholderWrapper">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ) : (
            <Image
              src="/upload.png"
              alt="upload selfie"
              width={120}
              height={120}
              className="object-cover rounded-lg"
            />
          )}
        </div>

        {/* CAMERA INPUT */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleChange}
        />

        {/* FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        {/* PREVIEW CONTROLS */}
        {preview && (
          <div className="mt-4 gap-4 flex items-center">
            <button
              onClick={() => setPreview(null)}
              className="mt-2 text-red-600 hover:underline"
            >
              <Image src="/close.png" alt="close btn" width={24} height={24} />
            </button>
            <button
              onClick={() => {
                console.log("approved");
              }}
              className="mt-2 text-red-600 hover:underline"
            >
              <Image
                src="/checkmark.png"
                alt="approve btn"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 mt-4">
          {/* <button className="modalButton" onClick={openCamera}>
            📷 Take a Photo
          </button> */}

          <button className="modalButton" onClick={openFilePicker}>
            Upload an Image 🖼️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
