import React from "react";
import cv from "../images/cv2.pdf";
import "./about.scss";
import ProgressBar from "../components/progressBar";
import arrowIcon from "../images/arrow_right.svg";

function About() {
    return (
        <div className="about-page">
            <div className="about-section">
                <div className="container">
                    <div className="section-name">About</div>
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
                    <div className="left">
                        <h3 className="sub-title">Programming Skills</h3>
                        <div class="progress">
                            <ProgressBar skill="HTML" number="95" />
                            <ProgressBar skill="CSS" number="95" />
                            <ProgressBar skill="JavaScript" number="85" />
                            <ProgressBar skill="React" number="80" />
                            <ProgressBar skill="Git" number="90" />
                            <ProgressBar skill="Vue" number="80" />
                            <ProgressBar skill="Bootstrap" number="95" />
                            <ProgressBar skill="jQuery" number="70" />
                            <ProgressBar skill="Tailwind CSS" number="90" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="knowledge-section">
                <div className="container">
                    <h3 className="sub-title">Knowledge</h3>
                    <div className="skills">
                        <ul>
                            <li><img src={arrowIcon}></img>Languages: HTML5, CSS3, JavaScript (ES6+)</li>
                            <li><img src={arrowIcon}></img>Frameworks: React, Redux, Vue, Nuxt</li>
                            <li><img src={arrowIcon}></img>Libraries: Tailwind CSS, Bootstrap, Chakra UI, Material Design, Ant Design, React-md, D3.js</li>
                            <li><img src={arrowIcon}></img>Preprocessors: SASS, LESS</li>
                            <li><img src={arrowIcon}></img>Version Control: Git, GitHub</li>
                            <li><img src={arrowIcon}></img>Web Design: Responsive Design, Mobile-first Design</li>
                            <li><img src={arrowIcon}></img>Tools & Build Systems: Webpack, Babel, NPM, Yarn</li>
                            <li><img src={arrowIcon}></img>Layouts: Flexbox, CSS Grid</li>
                            <li><img src={arrowIcon}></img>Performance: Website Performance Optimization</li>
                            <li><img src={arrowIcon}></img>Cross-Browser Compatibility & Accessibility</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="experience-education-section">
                <div className="container">
                    <div className="left">
                        <h3 className="sub-title">Experience</h3>
                        <div className="content">
                            <ul>
                            <li>
                                    <div className="list-inner">
                                        <div className="time">2024 - Present</div>
                                        <div className="place">
                                            <h3>Helpful Engineering</h3>
                                            <span>Software Engineer (Volunteer)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-inner">
                                        <div className="time">2020 - 2023</div>
                                        <div className="place">
                                            <h3>1Billion Technology</h3>
                                            <span>Software Engineer - UI</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-inner">
                                        <div className="time">2019 - 2020</div>
                                        <div className="place">
                                            <h3>eBEYONDS pvt ltd</h3>
                                            <span>UI/UX Engineer - inten</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <h3 className="sub-title">Education</h3>
                        <div className="content">
                            <ul>
                                <li>
                                    <div className="list-inner">
                                        <div className="time">2024 - 2027</div>
                                        <div className="place">
                                            <h3>AWS Certified Cloud Practitioner</h3>
                                            <span>AWS (Amazon Web Services)</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-inner">
                                        <div className="time">2023 - 2024</div>
                                        <div className="place">
                                            <h3>Meta Front-End Developer</h3>
                                            <span>Meta</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-inner">
                                        <div className="time">2016 - 2020</div>
                                        <div className="place">
                                            <h3>Bachelor of Science in Information Systems</h3>
                                            <span>University of Colombo School of Computing</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;