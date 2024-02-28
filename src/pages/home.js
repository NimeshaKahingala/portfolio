import React from "react";
import fbIcon from "../images/facebook-square.svg";
import linkedinIcon from "../images/linkedin.svg";
import mediumIcon from "../images/medium.svg";
import emailIcon from "../images/envelope-solid.svg";
import './home.scss';

function Home() {
    return (
        <div className="home-page">
            <div className="container">
                <div className="content">
                    <div className="avatar"><div className="image"></div></div>
                    <div className="details">
                        <h3 className="name">NIMESHA KAHINGALA</h3>
                        <p className="job">Welcome! I’m Nimesha, a dynamic Front-End Developer with a flair for crafting compelling, user-first digital experiences. Armed with a Meta Front-End Developer Professional Certificate and over three years of hands-on experience, I thrive on utilizing HTML5, CSS3, JavaScript (ES6+), and cutting-edge frameworks like React and Redux to solve complex problems and create intuitive, accessible web applications. My journey has led me across continents, from the vibrant tech hubs of the United States and Singapore to my roots in Sri Lanka, allowing me to cultivate a unique blend of global insights and innovative approaches. Let’s embark on a journey to transform your digital ideas into reality!</p>
                        <div className="social">
                            <ul>
                                <li><a href=""><img className="icon" src={fbIcon}></img></a></li>
                                <li><a href=""><img className="icon" src={linkedinIcon}></img></a></li>
                                <li><a href=""><img className="icon" src={mediumIcon}></img></a></li>
                                <li><a href=""><img className="icon" src={emailIcon}></img></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;