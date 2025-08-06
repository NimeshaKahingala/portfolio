import React, { useState, useEffect } from "react";
import "./header.scss";
import Nav from "./nav";

function Header() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className={`header mobile ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-inner">
                    <div className="logo">
                        <span className="logo-text">NK</span>
                    </div>
                    <div className="header-actions">
                        <div 
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <span className={`toggle-icon sun-icon ${theme === 'light' ? 'active' : ''}`}>☀️</span>
                            <div className={`toggle-slider ${theme === 'dark' ? 'dark' : ''}`}>
                                {theme === 'light' ? '☀️' : '🌙'}
                            </div>
                            <span className={`toggle-icon moon-icon ${theme === 'dark' ? 'active' : ''}`}>🌙</span>
                        </div>
                        <div 
                            className={`hamburger ${isMenuActive ? "is-active" : ""}`} 
                            onClick={() => setIsMenuActive(!isMenuActive)}
                        >
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                        </div>
                    </div>
                </div>
                <Nav setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive} />
            </div>

            {/* Desktop Header */}
            <div className="header desktop">
                <div className="desktop-nav">
                    <div className="logo">
                        <span className="logo-text">Nimesha Kahingala</span>
                        <span className="logo-subtitle">Full Stack Developer</span>
                    </div>
                    <div className="nav-actions">
                        <button 
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <span className="theme-icon">
                                {theme === 'light' ? '🌙' : '☀️'}
                            </span>
                            <span className="theme-text">
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </span>
                        </button>
                    </div>
                </div>
                <Nav setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive} />
            </div>
        </>
    );
}

export default Header;