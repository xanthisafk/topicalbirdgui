import { useDropdown } from "@/hooks/useDropdown";

export const DropdownTrigger = ({ children }) => {
  const { isOpen, setIsOpen } = useDropdown();
  return (
    <button
      type="button"
      className="dropdown-trigger"
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {typeof children === 'function' ? children(isOpen) : children}
    </button>
  );
};