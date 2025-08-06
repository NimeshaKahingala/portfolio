import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import fbIcon from "../images/facebook-square.svg";
import linkedinIcon from "../images/linkedin.svg";
import mediumIcon from "../images/medium.svg";
import emailIcon from "../images/envelope-solid.svg";
import './home.scss';
import FAQ from '../components/FAQ';

function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Ensure page starts at top
        window.scrollTo(0, 0);
    }, []);

    const scrollToNextSection = () => {
        const techStackSection = document.querySelector('.tech-stack-section');
        if (techStackSection) {
            techStackSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback: scroll down by viewport height
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    const scrollToPortfolio = () => {
        window.location.href = '/portfolio';
    };

    const scrollToContact = () => {
        window.location.href = '/contact';
    };

    return (
        <div className="home-page">
            <Helmet>
                <title>Nimesha Kahingala - Full Stack Developer | React Node.js Expert Sri Lanka</title>
                <meta name="description" content="Professional Full Stack Developer in Sri Lanka with 5+ years experience. Expert in React, Node.js, PostgreSQL, AWS. Available for web development projects and consulting." />
                <meta name="keywords" content="full stack developer Sri Lanka, React developer Colombo, Node.js expert, JavaScript developer, web application development, AWS certified developer, hire full stack developer" />
                <link rel="canonical" href="https://nimeshakahingala.com/" />
                <meta property="og:title" content="Nimesha Kahingala - Full Stack Developer | React Node.js Expert Sri Lanka" />
                <meta property="og:description" content="Professional Full Stack Developer in Sri Lanka with 5+ years experience. Expert in React, Node.js, PostgreSQL, AWS. Available for web development projects and consulting." />
                <meta property="og:url" content="https://nimeshakahingala.com/" />
            </Helmet>
            
            <div className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className={`hero-text ${isVisible ? 'animate-fade-in-up' : ''}`}>
                            <div className="greeting">
                                <span className="wave">👋</span>
                                <span>Hello, I'm</span>
                            </div>
                            <h1 className="hero-title" itemProp="name">
                                <span className="name">Nimesha Kahingala</span>
                                <span className="title-accent" itemProp="jobTitle">Full Stack Developer</span>
                            </h1>
                            <p className="hero-description" itemProp="description">
                                I craft complete <strong>digital solutions</strong> from database to deployment. 
                                Specializing in <strong>React development</strong>, <strong>Node.js backend</strong>, cloud architecture, and scalable web applications 
                                that deliver exceptional user experiences and robust backend performance.
                            </p>
                            <div className="hero-stats">
                                <div className="stat">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-label">Years <strong>Full Stack Experience</strong></span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">20+</span>
                                    <span className="stat-label"><strong>Web Development Projects</strong></span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Client Satisfaction</span>
                                </div>
                            </div>
                            
                            <div className="certifications-section">
                                <h2 className="certifications-title">Professional Certifications & Skills</h2>
                                <div className="certifications-grid">
                                    <div className="certification-badge">
                                        <div className="cert-icon">☁️</div>
                                        <div className="cert-content">
                                            <span className="cert-name"><strong>AWS Certified</strong></span>
                                            <span className="cert-detail">Cloud Practitioner</span>
                                        </div>
                                    </div>
                                    <div className="certification-badge">
                                        <div className="cert-icon">⚛️</div>
                                        <div className="cert-content">
                                            <span className="cert-name"><strong>Meta Frontend</strong></span>
                                            <span className="cert-detail">Developer Professional</span>
                                        </div>
                                    </div>
                                    <div className="certification-badge">
                                        <div className="cert-icon">🏆</div>
                                        <div className="cert-content">
                                            <span className="cert-name"><strong>JavaScript Expert</strong></span>
                                            <span className="cert-detail">Algorithms & Data Structures</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-actions">
                                <button 
                                    className="btn btn-primary"
                                    onClick={scrollToPortfolio}
                                >
                                    View Full Stack Projects
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={scrollToContact}
                                >
                                    Hire Me Now
                                </button>
                            </div>
                        </div>
                        <div className={`hero-visual ${isVisible ? 'animate-slide-in-right' : ''}`}>
                            <div className="avatar-container">
                                <div className="avatar">
                                    <div className="avatar-image"></div>
                                    <div className="orbiting-container">
                                        <div className="orbit-ring"></div>
                                        <div className="pulse-ring"></div>
                                        <div className="tech-orbit">
                                            <div className="tech-icon react" title="React & Frontend">⚛️</div>
                                            <div className="tech-icon nodejs" title="Node.js & Backend">🟢</div>
                                            <div className="tech-icon database" title="Database Management">🗄️</div>
                                            <div className="tech-icon cloud" title="AWS & Cloud">☁️</div>
                                            <div className="tech-icon api" title="REST APIs">🔗</div>
                                            <div className="tech-icon docker" title="Docker & DevOps">🐳</div>
                                            <div className="tech-icon git" title="Git & Version Control">📝</div>
                                            <div className="tech-icon typescript" title="TypeScript">📘</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tech-stack-section">
                <div className="container">
                    <div className="tech-content">
                        <h2 className="tech-title">Full Stack Technology Arsenal</h2>
                        <div className="tech-categories">
                            <div className="tech-category">
                                <h3 className="category-name">Frontend Development</h3>
                                <div className="tech-items">
                                    <span className="tech-item"><strong>React</strong></span>
                                    <span className="tech-item"><strong>TypeScript</strong></span>
                                    <span className="tech-item"><strong>Vue.js</strong></span>
                                    <span className="tech-item"><strong>Tailwind CSS</strong></span>
                                </div>
                            </div>
                            <div className="tech-category">
                                <h3 className="category-name">Backend Development</h3>
                                <div className="tech-items">
                                    <span className="tech-item"><strong>Node.js</strong></span>
                                    <span className="tech-item"><strong>Express.js</strong></span>
                                    <span className="tech-item"><strong>REST APIs</strong></span>
                                    <span className="tech-item"><strong>GraphQL</strong></span>
                                </div>
                            </div>
                            <div className="tech-category">
                                <h3 className="category-name">Database Management</h3>
                                <div className="tech-items">
                                    <span className="tech-item"><strong>PostgreSQL</strong></span>
                                    <span className="tech-item"><strong>MongoDB</strong></span>
                                    <span className="tech-item"><strong>Supabase</strong></span>
                                    <span className="tech-item"><strong>Redis</strong></span>
                                </div>
                            </div>
                            <div className="tech-category">
                                <h3 className="category-name">DevOps & Cloud</h3>
                                <div className="tech-items">
                                    <span className="tech-item"><strong>AWS Cloud</strong></span>
                                    <span className="tech-item"><strong>Docker</strong></span>
                                    <span className="tech-item"><strong>CI/CD</strong></span>
                                    <span className="tech-item"><strong>Git</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="social-section">
                <div className="container">
                    <div className="social-content">
                        <h2 className="social-title">Let's Build Something Amazing Together</h2>
                        <p className="social-description">
                            Ready to discuss your next <strong>full-stack web development project</strong>? Connect with me through your preferred platform for <strong>professional web development services</strong>.
                        </p>
                        <div className="social-links">
                            <a 
                                href="https://www.linkedin.com/in/nimesha-kahingala/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link linkedin"
                                aria-label="Connect with Nimesha Kahingala on LinkedIn"
                            >
                                <img src={linkedinIcon} alt="LinkedIn professional network icon" />
                                <span>Professional Network</span>
                            </a>
                            <a 
                                href="https://medium.com/@NimeshaKahingala" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link medium"
                                aria-label="Read Nimesha Kahingala's technical articles on Medium"
                            >
                                <img src={mediumIcon} alt="Medium technical blog icon" />
                                <span>Technical Articles</span>
                            </a>
                            <a 
                                href="https://www.facebook.com/Nimesha.Kahingala" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link facebook"
                                aria-label="Follow Nimesha Kahingala on Facebook"
                            >
                                <img src={fbIcon} alt="Facebook social media icon" />
                                <span>Social Updates</span>
                            </a>
                            <a 
                                href="mailto:nimesha.isholi94@gmail.com"
                                className="social-link email"
                                aria-label="Send email to Nimesha Kahingala"
                            >
                                <img src={emailIcon} alt="Email contact icon" />
                                <span>Direct Contact</span>
                            </a>
                        </div>
                        
                        <div className="explore-more-section">
                            <h3 className="explore-title">Explore My Full Stack Development Work</h3>
                            <div className="explore-buttons">
                                <button 
                                    className="btn btn-secondary explore-btn"
                                    onClick={() => window.location.href = '/about'}
                                    aria-label="Learn more about Nimesha Kahingala"
                                >
                                    About Me
                                </button>
                                <button 
                                    className="btn btn-secondary explore-btn"
                                    onClick={() => window.location.href = '/portfolio'}
                                    aria-label="View Nimesha Kahingala's portfolio projects"
                                >
                                    View <strong>Portfolio Projects</strong>
                                </button>
                                <button 
                                    className="btn btn-secondary explore-btn"
                                    onClick={() => window.location.href = '/contact'}
                                    aria-label="Contact Nimesha Kahingala for projects"
                                >
                                    <strong>Hire Full Stack Developer</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FAQ />

            <div className="scroll-indicator">
                <div className="scroll-arrow" onClick={scrollToNextSection}>
                    <span>Scroll to explore</span>
                    <div className="arrow-down"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;