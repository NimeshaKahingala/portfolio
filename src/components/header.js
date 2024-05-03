import React, { useState } from "react";
import "./header.scss";
import Nav from "./nav";

function Header() {

    const[isMenuActive, setIsMenuActive] = useState(false);

    return (
        <>
            <div className="header mobile">
                <div className="header-inner">
                    <div className="logo">NIK</div>
                    <div id="hamburger" className={`hamburger ${isMenuActive? "is-active" : ""}`} onClick={()=>setIsMenuActive(!isMenuActive)}>
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
                <Nav setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive}/>
            </div>
            <div className="header desktop">
                desktop
                <Nav setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive}/>
            </div>
        </>
    )
};

export default Header;