import { useState } from "react";
import { logInUser } from "../../helpers/api/auth";
import InputBox from "../ui/InputBox/Input";
import InputLabel from "../ui/BoxLabel/Label";
import Button from "../ui/Button/Button";
import './Loginpage.css';
import Checkbox from "../ui/Checkbox/Checkbox";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logIn = async () => {
    setLoading(true);
    setError("");

    const response = await logInUser(email, password, rememberMe);
    if (response.status === 200) {
      localStorage.setItem("topicalbird_current_user", JSON.stringify(response.data.content));
      window.location.href = "/";
    } else {
      setError(response?.data?.message || "Login failed");
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      {error && <div className="login-error">{error}</div>}
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
      <a className="register-link" href="/auth/register">Don't have an account?</a>
    </div>
  );
};

export default Loginpage;