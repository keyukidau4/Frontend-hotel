import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigator = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">
          <button className="navButton" onClick={() => navigator("/register")}>
            Register
          </button>
          <button className="navButton" onClick={() => navigator("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
