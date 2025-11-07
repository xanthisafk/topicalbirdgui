import Box from "./Box";
import { classNames as cn } from "@/helpers";
import "@/styles/components/layout/container.css";


const Container = ({ children, className = '', ...props }) => {

  return (
    <Box className={cn("container", className)} {...props}>
      {children}
    </Box>
  );
};

export default Container;