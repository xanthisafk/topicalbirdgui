import ThemeSwitcher from '@components/ThemeSwitcher';
import './Footer.css';
import { TitleText } from '@components/ui/Title/Title';

export const Footer = () => {


  return (
    <footer className="footer-container">
      <TitleText />
      <div className="footer-controls">
        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default Footer;