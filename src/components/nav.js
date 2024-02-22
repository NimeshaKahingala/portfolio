import React from "react";
import { Link } from "react-router-dom";
import './nav.scss';

function Nav(props) {

    const btnOnClick = () => {
        props.setIsMenuActive(false)
    }

    return <>
        <nav className={`nav-bar ${props.isMenuActive ? "opened" : ""}`}>
            <div className="container">
                <ul>
                    <li><Link to="/" onClick={btnOnClick}>Home</Link></li>
                    <li><Link to="/about" onClick={btnOnClick}>About</Link></li>
                    <li><Link to="/portfolio" onClick={btnOnClick}>Portfolio</Link></li>
                    <li><Link to="/contact" onClick={btnOnClick}>Contact</Link></li>
                </ul>
            </div>
        </nav>
    </>
}

export default Nav;