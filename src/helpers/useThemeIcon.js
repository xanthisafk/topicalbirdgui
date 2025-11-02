import { useEffect, useState } from 'react';
import { GUI_DEFAULT_IMAGES } from '../config';
function useThemeIcon() {
  const [icon, setIcon] = useState(GUI_DEFAULT_IMAGES.appIcon.variants.black);

  useEffect(() => {
    const updateIcon = () => {
      const rootClass = document.documentElement.className;
      const isLight = rootClass.endsWith('-light');
      setIcon(isLight ? GUI_DEFAULT_IMAGES.appIcon.variants.black : GUI_DEFAULT_IMAGES.appIcon.variants.white);
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
