import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold text-white" to="/">QuirkyRoomie</Link>
      <div className="collapse navbar-collapse">
        {user && (
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/complaints">Complaints</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        )}
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item me-3 mt-2 text-white">Hi, {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
