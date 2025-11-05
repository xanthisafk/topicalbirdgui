import { useEffect, useRef, useState } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";

import { DropdownContext } from "@/hooks/useDropdown";
import "@/styles/components/ui/dropdown.css";

export const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { refs, floatingStyles, update } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    placement: "bottom-end",
    strategy: "fixed",
  });

  useEffect(() => {
    if (isOpen && refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [isOpen, refs.reference, refs.floating, update]);

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs.floating.current &&
        refs.reference.current &&
        !refs.floating.current.contains(event.target) &&
        !refs.reference.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs.floating, refs.reference]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, refs, floatingStyles }}>
      <div ref={dropdownRef} className="dropdown-wrapper">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};