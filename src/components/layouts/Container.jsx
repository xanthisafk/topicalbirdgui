import Box from "./Box";
import { classNames as cn } from "@/helpers";

const Container = ({ children, className = '', ...props }) => {
  const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <Box className={cn("w-full!", containerClasses, className)} {...props}>
      {children}
    </Box>
  );
};

export default Container;