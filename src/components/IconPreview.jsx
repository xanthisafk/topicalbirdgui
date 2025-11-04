import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import "@/styles/components/icon-preview.css";
import { ACCEPTABLE_FILE_FORMATS_JOINED } from "@/config";

const IconPreview = ({
  inputRef,
  defaultImage = "/icon.svg",
  size = 120,
  disabled = false,
}) => {
  const [preview, setPreview] = useState(defaultImage);
  const internalRef = useRef(null);
  const hiddenFileInput = inputRef ?? internalRef;


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  const handleClick = () => {
    if (disabled) return;
    hiddenFileInput.current?.click();
  };

  return (
    <div
      className="icon-preview"
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      <img src={preview} alt="Preview" className="icon-preview__image" loading="eager" />
      <button
        disabled={disabled}
        type="button"
        className="icon-preview__button"
        aria-label="Upload icon"
      >
        <Camera size={24} />
      </button>
      <input
        disabled={disabled}
        type="file"
        accept={ACCEPTABLE_FILE_FORMATS_JOINED}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default IconPreview;
