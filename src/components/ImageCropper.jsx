import { getCroppedImg } from "@/helpers";
import { useCallback, useState } from "react";
import "@/styles/components/image-cropper.css";
import Cropper from "react-easy-crop";

export const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropChange = useCallback((crop) => setCrop(crop), []);
  const onZoomChange = useCallback((zoom) => setZoom(zoom), []);
  const onRotationChange = useCallback((rotation) => setRotation(rotation), []);
  const onCropCompleteCallback = useCallback(
    (croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels),
    []
  );

  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels) return;
    setIsCropping(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedImageBlob);
    } catch (e) {
      console.error('Error cropping image:', e);
    } finally {
      setIsCropping(false);
    }
  }, [imageSrc, croppedAreaPixels, rotation, onCropComplete]);

  return (
    <div className="cropper-container">
      <div className="cropper-modal">
        <div className="cropper-header">
          <h2>Crop Image</h2>
        </div>
        <div className="cropper-body">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <div className="cropper-controls">
          <div className="control-group">
            <label htmlFor="zoom">Zoom</label>
            <input
              id="zoom"
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => onZoomChange(Number(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label htmlFor="rotate">Rotate</label>
            <input
              id="rotate"
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="cropper-footer">
          <button className="btn btn-secondary" onClick={onCancel} disabled={isCropping}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCrop} disabled={isCropping}>
            {isCropping ? 'Cropping...' : 'Crop'}
          </button>
        </div>
      </div>
    </div>
  );
};