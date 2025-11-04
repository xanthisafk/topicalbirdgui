import { createContext, useContext } from "react";

export const DropdownContext = createContext();

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'Dropdown components must be used within a <Dropdown> provider'
    );
  }
  return context;
};