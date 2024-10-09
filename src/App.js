// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin'; 
import User from './Components/User';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="heading">
          <h1>Accounts Management System</h1>
        </div>
        <div className="button">
          
          <Link to="/Login" className="user-button">Login Fome</Link>
        </div>

        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
