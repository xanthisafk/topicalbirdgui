import IconPreview from '@/components/IconPreview';
import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Loader from '@/components/ui/Loader';
import Tooltip from '@/components/ui/Tooltip';

import "@/styles/pages/register.css";

import { API_DEFAULT_IMAGES, GUI_DEFAULT_IMAGES, NAVIGATION_PAGES } from '@/config';
import useThemeIcon from '@/helpers/useThemeIcon';
import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar } from '@/hooks/useSnackbar';
import { DotSquare, TriangleAlert } from 'lucide-react';
import { createNewUser } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';

const Register = () => {
  const [params] = useSearchParams();
  const parrot = useThemeIcon();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(params.get("email") || "");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [handle, setHandle] = useState("");
  const [display, setDisplay] = useState("");

  const previewRef = useRef(null);

  

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      if (!email || !pass || !pass2 || !handle) {
        showSnackbar({
          content: "Please fill the form",
          type: "danger",
          icon: TriangleAlert
        });
        return;
      }

      const hasFile = previewRef.current && previewRef.current.files.length > 0;
      let icon = null;
      if (hasFile) icon = previewRef.current.files[0];

      const res = await createNewUser(email, pass, pass2, handle, display, icon);
      if (res.status === 200) {
        goToLogin(true);
        return;
      }

      const msg = formatErrorMessage(res);
      showSnackbar({
        content: msg,
        type: "danger",
        icon: TriangleAlert,
        duration: 5,
      });

    } finally {
      setLoading(false);
    }
    

  }

  const goToLogin = (sucess) => {
    let url = NAVIGATION_PAGES.auth.login;
    if (sucess === undefined && email) url = `${url}?email=${email}`
    else url = `${url}?s=y`;
    
    navigate(url, { viewTransition: true });
    return;
  }

  return (
    <>
      <div className="register-container">
        <form className="register-form" onSubmit={handleFormSubmit}>
          <img src={parrot} alt={GUI_DEFAULT_IMAGES.appIcon.alt} width={50} />
          <h3>Welcome to Topicalbird</h3>

          <div className='register-form-avatar'>
            <IconPreview
              inputRef={previewRef}
              defaultImage={API_DEFAULT_IMAGES.userPicture.image}
            />
          </div>
          <div className='register-form-group'>
            <Label for="email">Email <Tooltip text={"Required"} /> </Label>
            <InputBox required value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="your.name@email.com" />
          </div>
          <div className='register-form-group'>
            <Label for="password">Password 
              <Tooltip text={"Must be at least 8 characters long and must consist of uppercase, lowercase, special and numerical characters."} />
            </Label>
            <InputBox required onChange={e => setPass(e.target.value)} type="password" name="password" id="password" placeholder="Enter a strong password..." />
          </div>
          <div className='register-form-group'>
            <Label for="password2">Confirm Passowrd 
              <Tooltip text={"Must be at least 8 characters long and must consist of uppercase, lowercase, special and numerical characters."} />
            </Label>
            <InputBox required onChange={e => setPass2(e.target.value)} type="password" name="password2" id="password2" placeholder="Enter the password again..." />
          </div>
          <div className='register-form-group'>
            <Label for="handle">Username 
              <Tooltip text={"Alphabet, Numbers, periods (.) and underscores (_) are allowed."} />
            </Label>
            <InputBox required onChange={e => setHandle(e.target.value)} name="handle" id="handle" placeholder="Enter a unique username..." />
          </div>
          <div className='register-form-group'>
            <Label for="display">Display Name
              <Tooltip text={"If left empty, your username will be used."} />
            </Label>
            <InputBox onChange={e => setDisplay(e.target.value)} name="display" id="display" placeholder="What should people call you?" />
          </div>
          <Button type="submit" variant='primary' disabled={loading}>
            {loading ? <Loader size="1.5rem" /> : "Register"}
          </Button>
          <Button type="button" variant='secondary' onClick={goToLogin}>Already have an account?</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
