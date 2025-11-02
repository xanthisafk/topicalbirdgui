import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import "./IconPreview.css";
import { ACCEPTABLE_FILE_FORMATS_JOINED } from "@/config";

const IconPreview = ({
  inputRef,
  defaultImage = "/icon.svg",
  size = 120,
}) => {
  const [preview, setPreview] = useState(defaultImage);
  const hiddenFileInput = inputRef || useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
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
        type="button"
        className="icon-preview__button"
        aria-label="Upload icon"
      >
        <Camera size={24} />
      </button>
      <input
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
