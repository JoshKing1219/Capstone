import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav id="navbar">
      <NavLink to="/register" className={"navbar-link"}>Register</NavLink>
      <NavLink to="/login" className={"navbar-link"}>Login</NavLink>
      <NavLink to="/theories" className={"navbar-link"}>All Theories</NavLink>
    </nav>
  );
}

export default Navbar;
