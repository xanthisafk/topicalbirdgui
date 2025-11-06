import { classNames as cn } from "@/helpers";

// eslint-disable-next-line no-unused-vars
const Box = ({ children, className = '', as: Element = 'div', ...props }) => {
  const baseClasses = "w-full transition-all duration-200";

  return (
    <Element className={cn(baseClasses, className)} {...props}>
      {children}
    </Element>
  );
};

export default Box;