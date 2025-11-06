import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import "@/styles/components/icon-preview.css";
import { ACCEPTABLE_FILE_FORMATS_JOINED } from "@/config";
import { ImageCropper } from "@/components/ImageCropper";

const IconPreview = ({
  defaultImage = "/icon.svg",
  size = 120,
  disabled = false,
  onChange,
}) => {
  const [preview, setPreview] = useState(defaultImage);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageToCrop(event.target.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBlob) => {
    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreview(croppedUrl);
    setShowCropper(false);
    setImageToCrop(null);

    // Notify parent
    onChange?.({
      blob: croppedBlob,
      url: croppedUrl,
    });
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setImageToCrop(null);
  };

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  return (
    <>
      <div
        className={`icon-preview ${disabled ? "disabled" : ""}`}
        style={{ width: size, height: size }}
      >
        <img
          src={preview}
          alt="Preview"
          className="icon-preview__image"
          loading="eager"
        />

        <label
          htmlFor="icon-upload"
          className="icon-preview__button"
          aria-label="Upload icon"
        >
          <Camera size={24} />
          <input
            id="icon-upload"
            type="file"
            accept={ACCEPTABLE_FILE_FORMATS_JOINED}
            disabled={disabled}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
      </div>

      {showCropper && imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onCancel={handleCancelCrop}
          aspect={1}
        />
      )}
    </>
  );
};

export default IconPreview;
