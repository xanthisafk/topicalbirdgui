import { useNavigate } from 'react-router-dom';

export function useViewNavigate() {

  const navigate = useNavigate();

  const navigateTo = (url, direction = 'default') => {
    document.documentElement.dataset.navigationDirection = direction;
    navigate(url, { viewTransition: true });
    setTimeout(() => delete document.documentElement.dataset.navigationDirection, 500);
  };

  return navigateTo;
}