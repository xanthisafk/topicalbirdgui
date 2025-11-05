import "@/styles/components/footer.css";
import { TitleText } from "@/components/ui/Title";
import ChangeTheme from "./ChangeTheme";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <TitleText />
        <div className="footer-controls">
          <ChangeTheme />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
