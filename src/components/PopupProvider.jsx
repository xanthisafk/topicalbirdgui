import { useCallback, useEffect, useRef, useState } from "react";
import { PopupContext } from "@/hooks/usePopup";
import Button from "./ui/Button";
import "@/styles/components/popup.css";

export const PopupProvider = ({ children }) => {
  const [config, setConfig] = useState({ isOpen: false });
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);

  const closePopup = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      dialogRef.current?.close();
      setConfig({ isOpen: false });
      setIsClosing(false);
    }, 150); // Must match --transition-fast duration (150ms)
  }, []);

  const triggerPopup = useCallback((newConfig) => {
    setConfig({ ...newConfig, isOpen: true });
  }, []);

  useEffect(() => {
    if (config.isOpen && !isClosing && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [config.isOpen, isClosing]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        closePopup();
      }
    };

    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('click', handleClick);
    };
  }, [closePopup]);

  const handlePrimaryAction = () => {
    if (config.primaryAction) {
      config.primaryAction();
    }
    closePopup();
  };

  const handleSecondaryAction = () => {
    if (config.secondaryAction) {
      config.secondaryAction();
    }
    closePopup();
  };

  const {
    isOpen,
    title,
    description,
    primaryActionLabel,
    secondaryActionLabel,
    footer,
    showCloseButton = true,
  } = config;

  return (
    <PopupContext.Provider value={{ triggerPopup }}>
      {children}
      <dialog
        ref={dialogRef}
        className={`popup-dialog ${isClosing ? 'closing' : ''}`}
        onClose={closePopup}
      >
        {isOpen && (
          <>
            {/* <!-- Header --> */}
            {(title || showCloseButton) && (
              <header className="popup-header">
                {title && <h2 className="popup-title">{title}</h2>}
                {showCloseButton && (
                  <Button
                    variant="outlined"
                    onClick={closePopup}
                    aria-label="Close"
                  >
                    &times;
                  </Button>
                )}
              </header>
            )}

            {/* <!-- Content --> */}
            {(description || config.children) && (
              <div className="popup-content">
                {description && (
                  <p className="popup-description">{description}</p>
                )}
                {config.children}
              </div>
            )}

            {/* <!-- Footer --> */}
            {(primaryActionLabel || secondaryActionLabel || footer) && (
              <footer className="popup-footer">
                {/* Custom footer component/text */}
                {footer && <div className="popup-footer-custom">{footer}</div>}
                
                {/* Action buttons */}
                <div className="popup-footer-actions">
                  {secondaryActionLabel && (
                    <Button
                      variant="secondary"
                      onClick={handleSecondaryAction}
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  {primaryActionLabel && (
                    <Button
                      variant="primary"
                      onClick={handlePrimaryAction}
                    >
                      {primaryActionLabel}
                    </Button>
                  )}
                </div>
              </footer>
            )}
          </>
        )}
      </dialog>
    </PopupContext.Provider>
  );
};