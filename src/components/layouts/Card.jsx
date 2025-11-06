import Box from "./Box";
import { classNames as cn } from "@/helpers";
import "@/styles/components/layout/card.css";

const Card = ({ children, className = '', title, ...props }) => {

  return (
    <Box className={cn("card", className)} {...props}>
      {title && (
        <h4>{title}</h4>
      )}
      {children}
    </Box>
  );
};

export default Card;