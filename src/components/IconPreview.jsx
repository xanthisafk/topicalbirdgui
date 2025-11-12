import React, { useState, useEffect } from "react";
import { Camera, FileMinus } from "lucide-react";
import "@/styles/components/icon-preview.css";
import { ACCEPTABLE_FILE_FORMATS_JOINED } from "@/config";
import { ImageCropper } from "@/components/ImageCropper";

const IconPreview = ({
  defaultImage = "/icon.svg",
  size = 120,
  disabled = false,
  onChange,
  showUpload = true,
}) => {
  const [preview, setPreview] = useState(defaultImage);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    const isAnimated = (file.type === "image/gif")
    const reader = new FileReader();
    reader.onload = (event) => {

      if (!isAnimated) {
        setShowCropper(true);
        setImageToCrop(event.target.result);
      } else {
        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange?.({
          blob: file,
          url,
        });
      }
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
      <div className="icon-preview-container">
        <div
        className={`icon-preview ${disabled ? "disabled" : ""}`}
        style={{ width: size, height: size }}
      >
        <img
          tabIndex={0}
          onClick={() => {
            if (showUpload) document.querySelector("#icon-upload").click();
          }}
          
          src={preview}
          alt="Preview"
          className="icon-preview__image"
          loading="eager"
        />

        {showUpload &&
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
        }
      </div>
      {showUpload && 
        <span className="icon-upload-text"
         onClick={() => document.querySelector("#icon-upload").click()}>
          Upload Image
        </span>
      }
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
