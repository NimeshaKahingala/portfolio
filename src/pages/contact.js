import React, { useState } from "react";
import { Helmet } from "react-helmet";
import fbIcon from "../images/facebook-square.svg";
import linkedinIcon from "../images/linkedin.svg";
import mediumIcon from "../images/medium.svg";
import emailIcon from "../images/envelope-solid.svg";
import "./contact.scss";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link with form data
        const mailtoLink = `mailto:nimesha.isholi94@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="contact-page">
            <Helmet>
                <title>Contact Nimesha Kahingala - Hire Full Stack Developer | React Node.js</title>
                <meta name="description" content="Contact Nimesha Kahingala for full stack web development projects. Available for React development, Node.js backend, and complete web solutions. Get in touch today!" />
                <meta name="keywords" content="hire full stack developer, contact web developer, React developer for hire, Node.js developer contact, web development services, freelance full stack developer" />
                <link rel="canonical" href="https://nimeshakahingala.com/contact" />
                <meta property="og:title" content="Contact Nimesha Kahingala - Hire Full Stack Developer | React Node.js" />
                <meta property="og:description" content="Contact Nimesha Kahingala for full stack web development projects. Available for React development, Node.js backend, and complete web solutions. Get in touch today!" />
                <meta property="og:url" content="https://nimeshakahingala.com/contact" />
            </Helmet>
            
            <div className="hero-section">
                <div className="container">
                    <div className="section-badge">Contact</div>
                    <h1 className="hero-title">
                        Let's Build <strong>Web Solutions</strong>
                        <span className="title-accent">Amazing Together</span>
                    </h1>
                    <p className="hero-description">
                        Ready to bring your ideas to life? I'm available for <strong>full-stack development projects</strong>, 
                        <strong>web development consulting</strong>, and collaboration opportunities.
                    </p>
                </div>
            </div>

            <div className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2 className="info-title">Get In Touch for Web Development</h2>
                            <p className="info-description">
                                Whether you need a complete <strong>web application</strong>, <strong>React frontend interface</strong>, 
                                or <strong>Node.js backend API</strong>, I'm here to help turn your vision into reality.
                            </p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="method-icon">📧</div>
                                    <div className="method-content">
                                        <h3>Professional Email</h3>
                                        <p>nimesha.isholi94@gmail.com</p>
                                        <span>Best for <strong>web development project inquiries</strong></span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">💼</div>
                                    <div className="method-content">
                                        <h3>LinkedIn Professional</h3>
                                        <p><strong>Professional networking</strong></p>
                                        <span>Connect for <strong>development opportunities</strong></span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">⚡</div>
                                    <div className="method-content">
                                        <h3>Quick Response Time</h3>
                                        <p>Within 24 hours</p>
                                        <span>Quick <strong>project discussions</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <h3 className="social-title">Connect With Full Stack Developer</h3>
                                <div className="social-grid">
                                    <a 
                                        href="https://www.linkedin.com/in/nimesha-kahingala/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link linkedin"
                                        aria-label="Connect with Nimesha Kahingala on LinkedIn"
                                    >
                                        <img src={linkedinIcon} alt="LinkedIn professional network icon" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a 
                                        href="https://medium.com/@NimeshaKahingala" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link medium"
                                        aria-label="Read technical articles by Nimesha Kahingala"
                                    >
                                        <img src={mediumIcon} alt="Medium technical blog icon" />
                                        <span>Medium</span>
                                    </a>
                                    <a 
                                        href="https://www.facebook.com/Nimesha.Kahingala" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link facebook"
                                        aria-label="Follow Nimesha Kahingala on Facebook"
                                    >
                                        <img src={fbIcon} alt="Facebook social media icon" />
                                        <span>Facebook</span>
                                    </a>
                                    <a 
                                        href="mailto:nimesha.isholi94@gmail.com"
                                        className="social-link email"
                                        aria-label="Send email to Nimesha Kahingala"
                                    >
                                        <img src={emailIcon} alt="Email contact icon" />
                                        <span>Email</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-section">
                            <div className="form-card">
                                <h2 className="form-title">Start Your Web Development Project</h2>
                                <p className="form-description">
                                    Tell me about your <strong>web development project</strong> and let's discuss how we can work together to create amazing <strong>digital solutions</strong>.
                                </p>

                                <form className="contact-form" onSubmit={handleSubmit} aria-label="Project inquiry form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your full name"
                                            aria-describedby="name-help"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your.email@example.com"
                                            aria-describedby="email-help"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Web Development Project Type</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            aria-describedby="subject-help"
                                        >
                                            <option value="">Select web development project type</option>
                                            <option value="Full Stack Web Application">Full Stack Web Application Development</option>
                                            <option value="React Frontend Development">React Frontend Development</option>
                                            <option value="Node.js Backend API Development">Node.js Backend API Development</option>
                                            <option value="E-commerce Website Development">E-commerce Website Development</option>
                                            <option value="Website Redesign">Website Redesign & Optimization</option>
                                            <option value="Web Development Consulting">Web Development Consulting</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Web Development Project Details</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows="5"
                                            placeholder="Tell me about your web development project, timeline, technology preferences, and any specific requirements..."
                                            aria-describedby="message-help"
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary submit-btn" aria-label="Send web development project inquiry">
                                        <strong>Send Project Inquiry</strong>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="availability-section">
                        <div className="availability-card">
                            <div className="availability-content">
                                <div className="availability-status">
                                    <div className="status-indicator available"></div>
                                    <span className="status-text">Available for New Projects</span>
                                </div>
                                <h2 className="availability-title">Ready to Start Your Next Web Development Project?</h2>
                                <p className="availability-description">
                                    I'm currently accepting new <strong>full-stack development projects</strong> and <strong>web development consulting</strong> opportunities. 
                                    Let's discuss your requirements and create something exceptional together.
                                </p>
                                <div className="availability-actions">
                                    <a href="/portfolio" className="btn btn-secondary" aria-label="View Nimesha Kahingala's portfolio">
                                        View My <strong>Portfolio Work</strong>
                                    </a>
                                    <a href="#contact-form" className="btn btn-primary" aria-label="Hire Nimesha Kahingala for development">
                                        <strong>Hire Full Stack Developer</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;