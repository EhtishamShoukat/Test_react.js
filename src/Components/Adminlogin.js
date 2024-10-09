import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/adminlogin.css'; // Adjusted path for CSS

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validEmail = 'admin';
  const validPassword = 'admin@123';

  const handleLogin = () => {
    if (email === validEmail && password === validPassword) {
      setErrorMessage('User Login Successfully');
      setTimeout(() => {
        navigate('/admin'); // Navigate to the Admin page
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
      <h2>Login Form</h2>
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
        <button type="button" id="loginBtn" onClick={handleLogin}>
          Sign In
        </button>
      </form>
      <p
        id="error"
        className="error-message"
        style={{ color: errorMessage === 'Admin Login Successfully' ? 'green' : 'red' }}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default AdminLogin;
