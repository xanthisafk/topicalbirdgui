
import "@/styles/components/footer.css";
import { TitleText } from '@/components/ui/Title';
import ChangeTheme from './ChangeTheme';

export const Footer = () => {


  return (
    <footer className="footer-container">
      <TitleText />
      <div className="footer-controls">
        <ChangeTheme />
      </div>
    </footer>
  );
};

export default Footer;