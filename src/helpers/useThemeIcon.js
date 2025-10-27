import { useEffect, useState } from 'react';

function useThemeIcon() {
  const [icon, setIcon] = useState('/icon.svg');

  useEffect(() => {
    const updateIcon = () => {
      const rootClass = document.documentElement.className;
      const isLight = rootClass.endsWith('-light');
      setIcon(isLight ? '/icon.svg' : '/icon_white.svg');
    };

    updateIcon(); // Run on mount

    // Optional: if you support dynamic theme switching
    const observer = new MutationObserver(updateIcon);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return icon;
}

export default useThemeIcon;
