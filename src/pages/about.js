import React from "react";
import { Helmet } from "react-helmet";
import cv from "../images/cv2.pdf";
import "./about.scss";
import ProgressBar from "../components/progressBar";
import arrowIcon from "../images/arrow_right.svg";

function About() {
    return (
        <div className="about-page">
            <Helmet>
                <title>About Nimesha Kahingala - Full Stack Developer | Experience & Skills</title>
                <meta name="description" content="Learn about Nimesha Kahingala's journey as a Full Stack Developer. 5+ years experience, Meta certified, AWS certified. University of Colombo graduate specializing in React and Node.js." />
                <meta name="keywords" content="about full stack developer, Nimesha Kahingala experience, React developer background, Node.js expert skills, web developer education, University of Colombo computing" />
                <link rel="canonical" href="https://nimeshakahingala.com/about" />
                <meta property="og:title" content="About Nimesha Kahingala - Full Stack Developer | Experience & Skills" />
                <meta property="og:description" content="Learn about Nimesha Kahingala's journey as a Full Stack Developer. 5+ years experience, Meta certified, AWS certified. University of Colombo graduate specializing in React and Node.js." />
                <meta property="og:url" content="https://nimeshakahingala.com/about" />
            </Helmet>
            
            <div className="hero-section">
                <div className="container">
                    <div className="section-badge">About Me</div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title" itemProp="name">
                                Building <strong>Digital Solutions</strong>
                                <span className="title-accent">End-to-End</span>
                            </h1>
                            <div className="profile-card">
                                <div className="profile-image" role="img" aria-label="Nimesha Kahingala professional photo"></div>
                                <div className="profile-info">
                                    <h2 className="name" itemProp="name">Nimesha Kahingala</h2>
                                    <span className="job-title" itemProp="jobTitle">Full Stack Developer</span>
                                    <p className="bio" itemProp="description">
                                        Welcome! I'm Nimesha, a dynamic <strong>Full Stack Developer</strong> with expertise in crafting 
                                        complete <strong>web solutions</strong> from frontend interfaces to backend architectures. With a 
                                        <strong>Meta Front-End Developer Professional Certificate</strong> and over three years of hands-on 
                                        experience, I excel at building <strong>scalable web applications</strong> using modern technologies 
                                        like <strong>React development</strong>, <strong>Node.js backend</strong>, and <strong>AWS cloud platforms</strong>.
                                    </p>
                                    <p className="bio">
                                        My journey spans across continents, from the vibrant tech hubs of the <strong>United States 
                                        and Singapore</strong> to my roots in <strong>Sri Lanka</strong>, giving me a unique global perspective on 
                                        solving complex <strong>web development challenges</strong>. Let's transform your ideas into powerful 
                                        <strong>digital solutions</strong>!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card">
                            <div className="info-icon">📧</div>
                            <div className="info-content">
                                <span className="info-label">Professional Email</span>
                                <span className="info-value">nimesha.isholi94@gmail.com</span>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">🎓</div>
                            <div className="info-content">
                                <span className="info-label">Education Background</span>
                                <span className="info-value"><strong>University of Colombo School of Computing</strong></span>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📜</div>
                            <div className="info-content">
                                <span className="info-label">Academic Degree</span>
                                <span className="info-value"><strong>Bachelor of Science: Information Systems</strong></span>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">💼</div>
                            <div className="info-content">
                                <span className="info-label">Current Availability</span>
                                <span className="info-value"><strong>Open to Full Stack Projects</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="cta-section">
                        <a href={cv} download className="btn btn-primary" aria-label="Download Nimesha Kahingala's resume PDF">
                            Download Resume
                        </a>
                        <a href="/contact" className="btn btn-secondary" aria-label="Contact Nimesha Kahingala for hiring">
                            <strong>Hire Full Stack Developer</strong>
                        </a>
                    </div>
                </div>
            </div>

            <div className="skills-section">
                <div className="container">
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h2 className="category-title">Frontend Development Technologies</h2>
                            <div className="progress-list">
                                <ProgressBar skill="React & Redux Development" number="90" />
                                <ProgressBar skill="JavaScript (ES6+) Programming" number="85" />
                                <ProgressBar skill="TypeScript Development" number="80" />
                                <ProgressBar skill="HTML5 & CSS3 Markup" number="95" />
                                <ProgressBar skill="Tailwind CSS Framework" number="90" />
                                <ProgressBar skill="Vue.js & Nuxt.js" number="80" />
                            </div>
                        </div>
                        <div className="skill-category">
                            <h2 className="category-title">Backend Development Technologies</h2>
                            <div className="progress-list">
                                <ProgressBar skill="Node.js & Express.js" number="85" />
                                <ProgressBar skill="REST API Development" number="90" />
                                <ProgressBar skill="PostgreSQL Database" number="80" />
                                <ProgressBar skill="MongoDB NoSQL" number="75" />
                                <ProgressBar skill="Supabase Backend" number="85" />
                                <ProgressBar skill="JWT Authentication" number="80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="knowledge-section">
                <div className="container">
                    <h2 className="section-title">Technical Expertise & Skills</h2>
                    <div className="knowledge-grid">
                        <div className="knowledge-category">
                            <h3 className="knowledge-title">Frontend Development</h3>
                            <ul className="knowledge-list">
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>React Development</strong>, Redux, Context API</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Vue.js Framework</strong>, Nuxt.js</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>JavaScript (ES6+)</strong>, TypeScript</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>HTML5 & CSS3</strong>, SASS, LESS</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Tailwind CSS</strong>, Bootstrap, Material-UI</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Responsive Web Design</strong>, Mobile-first</li>
                            </ul>
                        </div>
                        <div className="knowledge-category">
                            <h3 className="knowledge-title">Backend Development</h3>
                            <ul className="knowledge-list">
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Node.js Backend</strong>, Express.js</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>RESTful API Development</strong>, GraphQL</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>PostgreSQL Database</strong>, MongoDB</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Supabase Backend</strong>, Firebase</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>JWT Authentication</strong>, OAuth</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Server-side Rendering</strong> (SSR)</li>
                            </ul>
                        </div>
                        <div className="knowledge-category">
                            <h3 className="knowledge-title">DevOps & Development Tools</h3>
                            <ul className="knowledge-list">
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Git Version Control</strong>, GitHub</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Webpack & Vite</strong>, Build Tools</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Docker Containerization</strong></li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>AWS Cloud Services</strong>, Deployment</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>CI/CD Pipeline</strong> Setup</li>
                                <li><img src={arrowIcon} alt="Arrow icon" /><strong>Web Performance Optimization</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="experience-section">
                <div className="container">
                    <div className="timeline-grid">
                        <div className="timeline-column">
                            <h2 className="timeline-title">Professional Development Experience</h2>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-date">2024 - Present</div>
                                    <div className="timeline-content">
                                        <h3><strong>Software Engineer</strong> (Volunteer)</h3>
                                        <span className="company">Helpful Engineering</span>
                                        <p>Developing <strong>full-stack solutions</strong> for disaster relief platforms using <strong>Vue.js</strong>, <strong>Nuxt.js</strong>, <strong>TypeScript</strong>, and <strong>D3.js</strong> for data visualization.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-date">2020 - 2023</div>
                                    <div className="timeline-content">
                                        <h3><strong>Software Engineer - UI</strong></h3>
                                        <span className="company">1Billion Technology</span>
                                        <p>Led <strong>frontend development</strong> for multiple client projects, mentored junior developers, and contributed to <strong>full-stack web solutions</strong>.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-date">2019 - 2020</div>
                                    <div className="timeline-content">
                                        <h3><strong>UI/UX Engineer</strong> - Intern</h3>
                                        <span className="company">eBEYONDS pvt ltd</span>
                                        <p>Developed <strong>responsive web interfaces</strong> and collaborated with design teams to create user-centered <strong>web solutions</strong>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-column">
                            <h2 className="timeline-title">Education & Professional Certifications</h2>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-date">2024 - 2027</div>
                                    <div className="timeline-content">
                                        <h3><strong>AWS Certified Cloud Practitioner</strong></h3>
                                        <span className="company">Amazon Web Services</span>
                                        <p><strong>Cloud computing fundamentals</strong>, <strong>AWS services</strong>, and best practices for <strong>cloud architecture</strong>.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-date">2023 - 2024</div>
                                    <div className="timeline-content">
                                        <h3><strong>Meta Front-End Developer Professional</strong></h3>
                                        <span className="company">Meta</span>
                                        <p>Advanced <strong>React development</strong>, <strong>responsive design</strong>, and modern <strong>frontend best practices</strong>.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-date">2016 - 2020</div>
                                    <div className="timeline-content">
                                        <h3><strong>Bachelor of Science</strong></h3>
                                        <span className="company">University of Colombo School of Computing</span>
                                        <p><strong>Information Systems</strong> with focus on <strong>software development</strong> and <strong>database management</strong>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;