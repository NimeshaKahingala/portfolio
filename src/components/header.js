import React from "react";
import "./header.scss";

function Header() {
    return (
        <>
            <div className="header mobile">
                <div className="header-inner">
                    <div className="logo">NIK</div>
                    <div className="hamburger">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;