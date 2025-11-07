import { useDropdown } from "@/hooks/useDropdown";

export const DropdownContent = ({ children }) => {
  const { isOpen, setIsOpen, refs, floatingStyles } = useDropdown();

  const handleKeyDown = (e) => {
    const items = Array.from(document.querySelectorAll("[role='menuitem']:not(:disabled)"));
    const currentIndex = items.indexOf(document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Escape") {
      refs.reference.current?.focus();
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <div
      id="dropdown-menu"
      className="dropdown-content"
      role="menu"
      aria-labelledby="dropdown-trigger"
      ref={refs.setFloating}
      style={floatingStyles}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  ) : null;
};