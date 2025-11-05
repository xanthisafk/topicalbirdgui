import { useDropdown } from "@/hooks/useDropdown";
import { classNames } from "@/helpers";
import Button from "../ui/Button";

export const DropdownTrigger = ({ children, variant = "button" }) => {
  const { isOpen, setIsOpen } = useDropdown();

  const triggerProps = {
    onClick: () => setIsOpen(!isOpen),
    "aria-haspopup": "true",
    "aria-expanded": isOpen,
  };

  if (variant === "unstyled") {
    return (
      <div className="dropdown-trigger-unstyled" {...triggerProps}>
        {typeof children === "function" ? children(isOpen) : children}
      </div>
    );
  }

  return (
    <Button
      className={classNames("dropdown-trigger", { open: isOpen })}
      {...triggerProps}
    >
      {typeof children === "function" ? children(isOpen) : children}
    </Button>
  );
};