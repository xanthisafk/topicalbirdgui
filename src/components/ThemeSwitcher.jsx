import { useEffect, useRef, useState } from "react";
import Dropdown from "./ui/Dropdown/Dropdown";
import { LOCALSTORAGE_KEYS } from "@/config";
import { flushSync } from "react-dom";

const themes = [
  // Brown
  { value: 'coffee-dark', label: 'Coffee Dark' },
  { value: 'coffee-light', label: 'Morning Roast' },

  // Mint
  { value: 'minty-night-dark', label: 'Minty Night' },
  { value: 'mint-light', label: 'Garden Fresh' },

  //Purple
  { value: 'midnight-purple-dark', label: 'Midnight Purple' },
  { value: 'lavender-fields-light', label: 'Lavender Fields' },

  // Pastel
  { value: 'pastel-dreams-dark', label: 'Pastel Dreams' },
  { value: 'pastel-light', label: 'Cotton Candy' },

  // Red
  { value: 'red-velvet-dark', label: 'Red Velvet' },
  { value: 'pride-light', label: 'Pride' },

  // Green
  { value: 'soaring-forest-dark', label: 'Soaring Forest' },
  { value: 'theme-sky-light', label: 'Theme SKY 🦅' },

  // FB
  { value: 'social-media-dark', label: 'Social Media' },
  { value: 'social-media-light', label: 'Social Media Light' },

  // Solarized
  { value: 'sunburnt-dark', label: 'Sunburnt Dark' },
  { value: 'sunburnt-light', label: 'Sunburnt Light' }

];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEYS.theme);
    return saved || 'mint';
  });

  const ref = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add(`theme-${currentTheme}`);
    localStorage.setItem(LOCALSTORAGE_KEYS.theme, currentTheme);
  }, [currentTheme]);

  const handleOnChange = async (value) => {
    if (
      !document.startViewTransition
      || window.matchMedia("(prefers-reduced-motion: reduce").matches) {
      setCurrentTheme(value);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setCurrentTheme(value);
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }

  return (
    <div className="theme-switcher">
      <Dropdown ref={ref} options={themes} value={currentTheme} onChange={e => handleOnChange(e.target.value)} />
    </div>
  );
};

export default ThemeSwitcher;