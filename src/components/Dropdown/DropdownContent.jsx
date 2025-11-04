import { useDropdown } from "@/hooks/useDropdown";

export const DropdownContent = ({ children }) => {
  const { isOpen } = useDropdown();
  return isOpen ? (
    <div className="dropdown-content" role="menu">
      {children}
    </div>
  ) : null;
};