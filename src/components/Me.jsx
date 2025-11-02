import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "../config";

const Me = () => {

  const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
  if (user == null) window.location.href = NAVIGATION_PAGES.auth.login;
  
  window.location.href = NAVIGATION_PAGES.users.username(user.handle);

  return (
    <div>Redirecting...</div>
  )
}

export default Me