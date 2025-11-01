import { useEffect, useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import './Footer.css';
import { TitleText } from '../ui/Title/Title';
import { LOCALSTORAGE_KEYS } from '../../../config';

export const Footer = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEYS.theme);
    return saved || 'mint';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add(`theme-${theme}`);
    localStorage.setItem(LOCALSTORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEYS.theme);
    if (saved) setTheme(saved);
  }, []);

  return (
    <footer className="footer-container">
      <TitleText />
      <div className="footer-controls">
        <ThemeSwitcher value={theme} onChange={(e) => setTheme(e.target.value)} />
      </div>
    </footer>
  );
};

export default Footer;