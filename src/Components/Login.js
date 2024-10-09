
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Login.css'; // Adjust the path as needed
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const validCredentials = {
    user: { email: 'user', password: 'user@123' },
    admin: { email: 'admin', password: 'admin@123' },
  };

  const handleLogin = () => {
    const role = isAdmin ? 'admin' : 'user';
    if (email === validCredentials[role].email && password === validCredentials[role].password) {
      setErrorMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successfully`);
      setTimeout(() => {
        navigate(`/${role}`); 
      }, 3000);
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>{isAdmin ? 'Admin' : 'User'} Login Form</h2>
      <form id="loginForm">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              id="togglePassword"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>
        <button type="button" id="loginBtn" onClick={handleLogin} style={{margin:"0px"}}>
          Sign In
        </button>
      </form>
      <p
        id="error"
        className="error-message"
        style={{ color: errorMessage === 'User Login Successfully' || errorMessage === 'Admin Login Successfully' ? 'green' : 'red' }}
      >
        {errorMessage}
      </p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Login as Admin
        </label>
      </div>
    </div>
  );
}

export default Login;
