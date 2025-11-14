import { API_URL_FROM_CONTENT_URL } from "@/config";
import { truncateText } from "@/helpers";
import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CarouselCore = ({
  photos,
  gesture,
  dots,
  buttons,
  infinite,
  isLightbox = false,
  onCloseLightbox,
  initialIndex = 0,
  onSlideClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const trackRef = useRef(null);

  // Navigation
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return infinite ? photos.length - 1 : 0;
      }
      return prev - 1;
    });
  }, [infinite, photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === photos.length - 1) {
        return infinite ? 0 : prev;
      }
      return prev + 1;
    });
  }, [infinite, photos.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Gesture Handling

  const onStart = (e) => {
    if (!gesture && !onSlideClick) return;
    
    setIsDragging(true);
    startXRef.current = e.touches ? e.touches[0].pageX : e.pageX;
    startTimeRef.current = Date.now();
    setDragOffset(0);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches ? e.touches[0].pageX : e.pageX;
    const delta = currentX - startXRef.current;
    setDragOffset(delta);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const duration = Date.now() - startTimeRef.current;
    const swipeThreshold = trackRef.current ? trackRef.current.clientWidth / 4 : 50;
    const clickPxThreshold = 10;
    const clickMsThreshold = 500;

    // Check for swipe
    if (gesture && dragOffset < -swipeThreshold) {
      goToNext();
    } else if (gesture && dragOffset > swipeThreshold) {
      goToPrev();
    }
    // else: Check if it was a click
    else if (
      onSlideClick &&
      Math.abs(dragOffset) < clickPxThreshold &&
      duration < clickMsThreshold
    ) {
      onSlideClick(currentIndex);
    }

    setDragOffset(0); // Snap back or to new slide
  };

  const handleSlideKeyDown = (e, index) => {
    if (onSlideClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault(); // Prevent space from scrolling
      onSlideClick(index);
    }
  };

  // UI Rendering

  const renderDots = () => {
    if (!dots || photos.length <= 1) return null;

    const totalDots = photos.length;
    let start = 0;
    let end = totalDots;

    if (totalDots > 5) {
      start = Math.max(0, Math.min(currentIndex - 2, totalDots - 5));
      end = start + 5;
    }

    const dotElements = [];
    for (let i = start; i < end; i++) {
      dotElements.push(
        <button
          key={i}
          className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
          onClick={() => goToSlide(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === currentIndex ? 'true' : 'false'}
        />
      );
    }

    return (
      <div className="carousel-dots" aria-label="Slide navigation dots">
        {dotElements}
      </div>
    );
  };

  const showPrev = infinite || currentIndex > 0;
  const showNext = infinite || currentIndex < photos.length - 1;

  return (
    <div
      className={`carousel-instance ${isLightbox ? 'is-lightbox' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); onEnd(); }}
      aria-roledescription="carousel"
      aria-label="Image gallery"
    >
      <div
        className="carousel-track-container"
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
      >
        <div
          className="carousel-track"
          ref={trackRef}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform var(--transition-md)',
          }}
        >
          {photos.map((photo, index) => (
            <div
              className="carousel-slide"
              key={isLightbox ? `lb-${index}` : index}
              aria-roledescription="slide"
              aria-label={`Image ${index + 1} of ${photos.length}`}
            >
              <div
                className="slide-content"
                role={onSlideClick ? "button" : undefined}
                tabIndex={onSlideClick ? 0 : undefined}
                aria-label={onSlideClick ? `View image ${index + 1} in fullscreen` : undefined} 
                onKeyDown={(e) => handleSlideKeyDown(e, index)}
              >
                {/* Blurry Background Image */}
                <img
                  src={API_URL_FROM_CONTENT_URL(photo.url)}
                  alt=""
                  className="slide-bg"
                  aria-hidden="true"
                />
                {/* Foreground Image */}
                <img
                  src={API_URL_FROM_CONTENT_URL(photo.url)}
                  alt={photo.alt || `Carousel image ${index + 1}`}
                  className="slide-fg"
                />
                {/* Caption */}
                {photo.alt && (
                  <div className="carousel-caption" title={photo.alt}>
                    <p>{truncateText(photo.alt, 97)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Controls --- */}
      {buttons && isHovered && (
        <>
          {showPrev && (
            <button
              onClick={goToPrev}
              className="carousel-btn prev"
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
          )}
          {showNext && (
            <button
              onClick={goToNext}
              className="carousel-btn next"
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          )}
        </>
      )}

      {isHovered && renderDots()}

      {isLightbox && (
        <button
          onClick={onCloseLightbox}
          className="lightbox-close"
          aria-label="Close fullscreen"
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default CarouselCore;