import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    setToken(null);
    navigate("/");
  };

  if (token) {
    return (
      <nav id="navbar">
        <NavLink to="/theories" className={"navbar-link"}>
          All Theories
        </NavLink>
        <NavLink to="/my-account" className={"navbar-link"}>
          My Account
        </NavLink>
      </nav>
    );
  }

  return (
    <nav id="navbar">
      <NavLink to="/register" className={"navbar-link"}>
        Register
      </NavLink>
      <NavLink to="/login" className={"navbar-link"}>
        Login
      </NavLink>
      <NavLink to="/theories" className={"navbar-link"}>
        All Theories
      </NavLink>
    </nav>
  );
}

export default Navbar;
