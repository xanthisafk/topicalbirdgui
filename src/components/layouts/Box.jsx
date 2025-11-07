import { classNames as cn } from "@/helpers";
import "@/styles/components/layout/box.css";

// eslint-disable-next-line no-unused-vars
const Box = ({ children, className = '', as: Element = 'div', ...props }) => {

  return (
    <Element className={cn("box", className)} {...props}>
      {children}
    </Element>
  );
};

export default Box;