const isLightTheme = () => {
  const rootClass = document.documentElement.className;
  return rootClass.includes('-light');
};

export default isLightTheme;