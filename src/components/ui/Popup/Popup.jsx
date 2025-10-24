import "./popup.css"

import { useRef, forwardRef, useImperativeHandle } from 'react';

const Popup = forwardRef(({ children }, ref) => {

    const dialogRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close()
    }));

    return (
        <dialog ref={dialogRef} className="popup-dialog">
            <div className="popup-content-wrapper">
                {children}
                
                {/* Close button at the top-right */}
                <button 
                    onClick={() => dialogRef.current?.close()} 
                    className="popup-close-btn"
                >
                    {/* Assuming the SVG is imported/used like this, or you can use an <img> tag */}
                    <img src="/assets/cross.svg" alt="Close" />
                </button>
            </div>
        </dialog>
    );
});

export default Popup;