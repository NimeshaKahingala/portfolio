import React from "react";
import { Link, useLocation } from "react-router-dom";
import './nav.scss';

function Nav(props) {
    const location = useLocation();

    const btnOnClick = () => {
        props.setIsMenuActive(false);
        // Scroll to top when navigating
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    return <>
        <nav className={`nav-bar ${props.isMenuActive ? "opened" : ""}`}>
            <div className="container">
                <ul>
                    <li className={isActive('/') ? 'active' : ''}><Link to="/" onClick={btnOnClick}>Home</Link></li>
                    <li className={isActive('/about') ? 'active' : ''}><Link to="/about" onClick={btnOnClick}>About</Link></li>
                    <li className={isActive('/portfolio') ? 'active' : ''}><Link to="/portfolio" onClick={btnOnClick}>Portfolio</Link></li>
                    <li className={isActive('/blog') ? 'active' : ''}><Link to="/blog" onClick={btnOnClick}>Blog</Link></li>
                    <li className={isActive('/contact') ? 'active' : ''}><Link to="/contact" onClick={btnOnClick}>Contact</Link></li>
                </ul>
            </div>
        </nav>
    </>
}

export default Nav;