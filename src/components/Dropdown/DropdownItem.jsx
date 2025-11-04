import { useDropdown } from "@/hooks/useDropdown";

export const DropdownItem = ({ children, onClick, disabled }) => {
  const { setIsOpen } = useDropdown();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      className="dropdown-item"
      onClick={handleClick}
      role="menuitem"
      disabled={disabled}
    >
      {children}
    </button>
  );
};