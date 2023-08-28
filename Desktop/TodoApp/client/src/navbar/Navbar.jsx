import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logOutHandler = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    localStorage.clear();
    navigate('/login');
    return;
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/addtask">AddTask</NavLink>
        <NavLink to="/team-member">Team-Members</NavLink>
      </div>
      <div className="navbar-auth">
        {user ? <NavLink onClick={() => { logOutHandler() }}>LogOut</NavLink> :
          <><NavLink to="/login">LogIn</NavLink>
            <NavLink to="/signup">SignUp</NavLink></>
        }
      </div>
    </nav>
  );
};

export default Navbar;
