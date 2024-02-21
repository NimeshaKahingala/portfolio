import React from "react";
import cv from "../images/cv.pdf";
import "./about.scss";
import ProgressBar from "../components/progressBar";

function About() {
    return (
        <div className="about-page">
            <div className="about-section">
                <div className="container">
                    <div className="title">About Me</div>
                    <div className="image"></div>
                    <div className="about-title">
                        <h3 className="name">Nimesha Kahingala</h3>
                        <span className="job-title">Front-End Developer</span>
                    </div>
                    <div className="about-text">
                        <p>
                            Welcome! I’m Nimesha, a dynamic Front-End Developer with a flair for crafting compelling, user-first digital experiences. Armed with a Meta Front-End Developer Professional Certificate and over three years of hands-on experience, I thrive on utilizing HTML5, CSS3, JavaScript (ES6+), and cutting-edge frameworks like React and Redux to solve complex problems and create intuitive, accessible web applications.
                        </p>
                        <p>
                            My journey has led me across continents, from the vibrant tech hubs of the United States and Singapore to my roots in Sri Lanka, allowing me to cultivate a unique blend of global insights and innovative approaches. Let’s embark on a journey to transform your digital ideas into reality!
                        </p></div>
                    <div className="short-info">
                        <ul>
                            <li>
                                <span className="info">Email</span>
                                <span className="details">nimesha.isholi94@gmail.com</span>
                            </li>
                            <li>
                                <span className="info">Address</span>
                                <span className="details">2020 Eldridge pkwy, 1404, Houston, Texas 77077</span>
                            </li>
                            <li>
                                <span className="info">Phone</span>
                                <span className="details">+1(832) 546-7730</span>
                            </li>
                            <li>
                                <span className="info">Study</span>
                                <span className="details">University of Colombo School of Computing</span>
                            </li>
                            <li>
                                <span className="info">Degree</span>
                                <span className="details">Bachelor of Science: Information Systems</span>
                            </li>
                            <li>
                                <span className="info">Freelance</span>
                                <span className="details">Available</span>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-cv"><a href={cv} download>Download CV</a></div>
                </div>
            </div>
            <div className="skill-section">
                <div className="container">
                    <h3 className="sub-title">Programming Skills</h3>
                    <div class="tokyo_progress">
                        <ProgressBar skill="HTML" number="95"/>
                        <ProgressBar skill="CSS" number="95"/>
                        <ProgressBar skill="JavaScript" number="85"/>
                        <ProgressBar skill="React" number="80"/>
                    </div>
                    <h3 className="sub-title">Technical Skills</h3>
                    <div class="tokyo_progress">
                        <ProgressBar skill="Git" number="90"/>
                        <ProgressBar skill="CSS" number="95"/>
                        <ProgressBar skill="JavaScript" number="85"/>
                        <ProgressBar skill="React" number="80"/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;