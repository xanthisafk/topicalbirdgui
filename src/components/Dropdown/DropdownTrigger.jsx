import { useDropdown } from "@/hooks/useDropdown";
import { classNames } from "@/helpers";
import Button from "../ui/Button";

export const DropdownTrigger = ({ children, variant = "button" }) => {
  const { isOpen, setIsOpen, refs } = useDropdown();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);

      requestAnimationFrame(() => {
        const firstItem = document.querySelector("[role='menuitem']");
        firstItem?.focus();
      });
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const triggerProps = {
    ref: refs.setReference,
    onClick: () => setIsOpen(!isOpen),
    onkeydown: handleKeyDown,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-labelledby": "dropdown-trigger",
    "aria-controls": "dropdown-menu",
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