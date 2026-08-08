import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="navbar-left">
          <div className="navbar-brand">
            <h2>CalGuru</h2>
            <button
              className="navbar-toggle"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
          </div>

          <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/foods">Foods</NavLink>
            <div className="navbar-mobile-actions">
              <span>{user?.username}</span>
              <button className="logout-btn mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <span>{user?.username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}