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

  // 🔧 Collapse navbar manually
  const closeNavbar = () => {
    const navbar = document.getElementById('navbarContent');
    if (navbar && navbar.classList.contains('show')) {
      new bootstrap.Collapse(navbar).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">QuirkyRoomie</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeNavbar}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/complaints" onClick={closeNavbar}>Complaints</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard" onClick={closeNavbar}>Leaderboard</Link>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center text-white me-2">
                  Hi, {user.name}
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={() => { handleLogout(); closeNavbar(); }}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNavbar}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={closeNavbar}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
