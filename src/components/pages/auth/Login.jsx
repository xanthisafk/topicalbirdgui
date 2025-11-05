import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { GUI_DEFAULT_IMAGES, NAVIGATION_PAGES } from '@/config';
import useThemeIcon from '@/helpers/useThemeIcon';
import React from 'react';
import { Link } from 'react-router-dom';

import "@/styles/pages/login.css";
import Checkbox from '@/components/ui/Checkbox';

const Login = () => {
  const icon = useThemeIcon();
  return (
    <>
      <div className='container'>
        <div className='form'>
          <img src={icon} alt={GUI_DEFAULT_IMAGES.appIcon.alt} width={50} />
          <h3>Welcome back!</h3>
          <div className='form-group'>
            <Label for="email">Email</Label>
            <InputBox type="email" id="email" placeholder="Enter your email..." />
          </div>
          <div className='form-group'>
            <Label for="password">Password</Label>
            <InputBox type="password" id="password" placeholder="Enter your password..." />
          </div>
          <Checkbox label="Remember Me" />
          <Button variant='primary'>Login</Button>
          <Link to={NAVIGATION_PAGES.auth.register} viewTransition>
            <Button variant='secondary'>Don't have an account?</Button>
          </Link>
        </div>
      </div>
    </>
  )
};

export default Login;
