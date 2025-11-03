import { useState } from "react";
import { logInUser } from "@/helpers/api";
import InputBox from "@components/ui/InputBox/Input";
import InputLabel from "@components/ui/BoxLabel/Label";
import Button from "@components/ui/Button";
import './styles.css';
import Checkbox from "@components/ui/Checkbox/Checkbox";
import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import Snackbar, { showSnackbar } from "@/components/Snackbar";
import { AlertTriangle } from "lucide-react";
import { formatErrorMessage } from "@/helpers/formatErrorMessage";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    setLoading(true);

    const response = await logInUser(email, password, rememberMe);
    if (response.status === 200) {
      localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(response.data.content));
      window.location.href = NAVIGATION_PAGES.home;
    } else {
      const message = formatErrorMessage(response);
      showSnackbar({
        content: message,
        icon: AlertTriangle,
        type: "danger",
        duration: 10,
      });
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      <div className="login-form">
        <div className="form-group">
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputBox id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email..." />
        </div>
        <div className="form-group">
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputBox id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password..." />
        </div>
        <div className="form-group checkbox-group">
          <Checkbox id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <InputLabel htmlFor="rememberMe">Remember Me</InputLabel>
        </div>
        <Button variant="primary" onClick={logIn} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      </div>
      <a className="register-link" href={NAVIGATION_PAGES.auth.register}>Don't have an account?</a>
      <Snackbar />
    </div>
  );
};

export default Loginpage;