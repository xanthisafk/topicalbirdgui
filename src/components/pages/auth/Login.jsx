import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { EVENT_LISTENER_KEYS, GUI_DEFAULT_IMAGES, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import useThemeIcon from '@/helpers/useThemeIcon';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import "@/styles/pages/login.css";
import Checkbox from '@/components/ui/Checkbox';
import Loader from '@/components/ui/Loader';
import { useSnackbar } from '@/hooks/useSnackbar';
import { AlertTriangle, Check, TriangleAlert } from 'lucide-react';
import { logInUser } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';

const Login = () => {

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const icon = useThemeIcon();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState(params.get("email") || "");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(true);



  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
      if (user) {
        navigate(NAVIGATION_PAGES.home, { viewTransition: true });
      }

      const created = params.get("s") || null; // success
      if (created !== null) {
        showSnackbar({
          content: "Registered! Please log in.",
          type: "success",
          icon: Check,
          duration: 5,
        });
      }

    } catch {
      localStorage.removeItem(LOCALSTORAGE_KEYS.currentUser);
      window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
    }
  }, [navigate, params, showSnackbar]);

  const goToRegister = () => {
    let url = NAVIGATION_PAGES.auth.register;
    if (email) url = `${url}?email=${email}`

    navigate(url, { viewTransition: true });
  }

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      const res = await logInUser(email, pass, remember);
      if (res.status === 200) {
        localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(res.data.content));
        window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
        navigate(NAVIGATION_PAGES.home, { viewTransition: true });
        return;
      }

      let msg = formatErrorMessage(res);
      if (msg === "Invalid data") msg = "Please enter email and password";
      showSnackbar({
        content: msg,
        type: "danger",
        icon: TriangleAlert,
        duration: 3,
      });
      return;
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleFormSubmit}>
          <img src={icon} alt={GUI_DEFAULT_IMAGES.appIcon.alt} width={50} />
          <h3>Welcome back!</h3>
          <div className='login-form-group'>
            <Label for="email">Email</Label>
            <InputBox required value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Enter your email..." />
          </div>
          <div className='login-form-group'>
            <Label for="password">Password</Label>
            <InputBox required onChange={e => setPass(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password..." />
          </div>
          <Checkbox onChange={e => setRemember(e.target.checked)} defaultChecked={true} id="rememberMe" name="rememberMe" label="Remember Me" />
          <Button type="submit" variant='primary' disabled={loading}>
            {loading ? <Loader size="1.5rem" /> : "Login"}
          </Button>
          <Button type="button" variant='secondary' onClick={goToRegister}>Don't have an account?</Button>
        </form>
      </div>
    </>
  )
};

export default Login;
