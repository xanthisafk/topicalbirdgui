import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { EVENT_LISTENER_KEYS, GUI_DEFAULT_IMAGES, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import useThemeIcon from '@/helpers/useThemeIcon';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "@/styles/pages/login.css";
import Checkbox from '@/components/ui/Checkbox';
import Loader from '@/components/ui/Loader';
import { useSnackbar } from '@/hooks/useSnackbar';
import { AlertTriangle, TriangleAlert } from 'lucide-react';
import { logInUser } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';

const Login = () => {

  const navigate = useNavigate();

  const icon = useThemeIcon();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
      if (user) {
        navigate(NAVIGATION_PAGES.home, { viewTransition: true });
      }
    } catch {
      localStorage.removeItem(LOCALSTORAGE_KEYS.currentUser);
      window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
    }
  }, [navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const res = await logInUser(email, pass, remember);
      if (res.status === 200) {
        localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(res.data.content));
        window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
        navigate(NAVIGATION_PAGES.home, { viewTransition: true });
        return;
      }
      const msg = formatErrorMessage(res);
      showSnackbar({
        content: msg,
        type: "danger",
        icon: TriangleAlert,
        duration: 55,
      });
      return;
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleFormSubmit}>
          <img src={icon} alt={GUI_DEFAULT_IMAGES.appIcon.alt} width={50} />
          <h3>Welcome back!</h3>
          <div className='form-group'>
            <Label for="email">Email</Label>
            <InputBox onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Enter your email..." />
          </div>
          <div className='form-group'>
            <Label for="password">Password</Label>
            <InputBox onChange={e => setPass(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password..." />
          </div>
          <Checkbox onChange={e => setRemember(e.target.checked)} defaultChecked={true} id="rememberMe" name="rememberMe" label="Remember Me" />
          <Button type="submit" variant='primary' disabled={loading}>
            {loading ? <Loader size="1.5rem" /> : "Login"}
          </Button>
          <Link to={NAVIGATION_PAGES.auth.register} viewTransition>
            <Button variant='secondary'>Don't have an account?</Button>
          </Link>
        </form>
      </div>
    </>
  )
};

export default Login;
