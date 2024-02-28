import React from "react";
import fbIcon from "../images/facebook-square.svg";
import linkedinIcon from "../images/linkedin.svg";
import mediumIcon from "../images/medium.svg";
import emailIcon from "../images/envelope-solid.svg";
import "./contact.scss";

function Contact() {
    return (
        <div className="contact-page">
            <div className="container">
                <div className="section-name">Contact</div>
                <h3 className="title">Get in Touch</h3>
                <div className="text">It all starts with a discussion, please feel free to contact me through</div>
                <div className="details">
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/Nimesha.Kahingala" target="_blank">
                                <img className="icon" src={fbIcon}></img>

                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/nimesha-kahingala/" target="_blank">
                                <img className="icon" src={linkedinIcon}></img>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img className="icon" src={mediumIcon}></img>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:nimesha.isholi94@gmail.com">
                                <img className="icon" src={emailIcon}></img>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Contact;