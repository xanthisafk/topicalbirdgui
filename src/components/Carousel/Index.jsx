import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CarouselCore from './CarouselCore';
import "@/styles/components/carousel.css";

const CarouselPrime = ({
  photos,
  className = '',
  gesture = true,
  dots = true,
  buttons = true,
  infinite = true,
  lightbox = false,
  ...rest
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openLightbox = (index) => {
    if (!lightbox) return;
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Lightbox keyboard and scroll lock management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  if (!photos || photos.length === 0) {
    return null; // Don't render anything if no photos
  }

  return (
    <div className={`carousel-container ${className}`} {...rest}>
      <CarouselCore
        photos={photos}
        gesture={gesture}
        dots={dots}
        buttons={buttons}
        infinite={infinite}
        onSlideClick={lightbox ? openLightbox : undefined}
        initialIndex={0}
        isLightbox={false}
      />

      {isClient && isLightboxOpen && createPortal(
        <div
          className="carousel-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image gallery"
        >
          <CarouselCore
            photos={photos}
            gesture={gesture}
            dots={dots}
            buttons={buttons}
            infinite={infinite}
            isLightbox={true}
            onCloseLightbox={closeLightbox}
            initialIndex={lightboxIndex}
          />
        </div>,
        document.body
      )}
    </div>
  );
};

export default CarouselPrime;