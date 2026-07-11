import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">

      <div className="container navbar-content">

        <h2>CalGuru</h2>

        <div className="navbar-right">

          <span>
            {user?.username}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}