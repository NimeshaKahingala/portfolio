import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import './Nav.scss';

function Nav() {
    return <>
        <nav className="container nav-bar">
            <div className="container">
            <div className="logo-wrap"><img src={logo} alt="logo" className="logo"></img></div>
            {/* <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/booking">Reservation</Link></li>
                <li><Link to="/order">Order Online</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul> */}
            </div>
        </nav>
    </>
}

export default Nav;