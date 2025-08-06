import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Modal } from 'antd';
import PortfolioModal from "../components/portfolioModal";
import "./portfolio.scss";
import { PROJECTS } from "../components/data";

function Portfolio() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [filter, setFilter] = useState('all');

    const showModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const filteredProjects = PROJECTS.filter(project => {
        if (filter === 'all') return true;
        if (filter === 'fullstack') return project.isFullStack;
        if (filter === 'frontend') return !project.isFullStack;
        return true;
    });

    return (
        <div className="portfolio-page">
            <Helmet>
                <title>Portfolio - Full Stack Projects by Nimesha Kahingala | React Node.js</title>
                <meta name="description" content="Explore Nimesha Kahingala's full stack development portfolio. 20+ projects including React applications, Node.js APIs, e-commerce platforms, and web development solutions." />
                <meta name="keywords" content="full stack portfolio, React projects, Node.js applications, web development portfolio, JavaScript projects, e-commerce development, API development, responsive web design" />
                <link rel="canonical" href="https://nimeshakahingala.com/portfolio" />
                <meta property="og:title" content="Portfolio - Full Stack Projects by Nimesha Kahingala | React Node.js" />
                <meta property="og:description" content="Explore Nimesha Kahingala's full stack development portfolio. 20+ projects including React applications, Node.js APIs, e-commerce platforms, and web development solutions." />
                <meta property="og:url" content="https://nimeshakahingala.com/portfolio" />
            </Helmet>
            
            <div className="hero-section">
                <div className="container">
                    <div className="section-badge">Portfolio</div>
                    <h1 className="hero-title">
                        Featured <strong>Full Stack Projects</strong>
                        <span className="title-accent">& Web Solutions</span>
                    </h1>
                    <p className="hero-description">
                        Explore my collection of <strong>full-stack web applications</strong>, <strong>React frontend interfaces</strong>, and 
                        <strong>Node.js backend solutions</strong> that demonstrate expertise across the entire <strong>web development stack</strong>.
                    </p>
                </div>
            </div>

            <div className="portfolio-content">
                <div className="container">
                    <div className="filter-section">
                        <div className="filter-buttons">
                            <button 
                                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                onClick={() => setFilter('all')}
                                aria-label="Show all portfolio projects"
                            >
                                All <strong>Web Projects</strong>
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
                                onClick={() => setFilter('fullstack')}
                                aria-label="Show full stack development projects"
                            >
                                <strong>Full Stack Development</strong>
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
                                onClick={() => setFilter('frontend')}
                                aria-label="Show frontend development projects"
                            >
                                <strong>Frontend Development</strong>
                            </button>
                        </div>
                    </div>

                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <div 
                                key={index}
                                className={`project-card ${project.isFullStack ? 'fullstack' : 'frontend'}`}
                                onClick={() => showModal(project)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View details for ${project.title} project`}
                            >
                                <div className="project-image">
                                    <img 
                                        src={project.image} 
                                        alt={`${project.title} - ${project.isFullStack ? 'Full stack' : 'Frontend'} web development project screenshot`}
                                        loading="lazy"
                                    />
                                    <div className="project-overlay">
                                        <div className="project-type">
                                            {project.isFullStack ? 'Full Stack Development' : 'Frontend Development'}
                                        </div>
                                        <button className="view-btn" aria-label={`View ${project.title} project details`}>
                                            View Project Details
                                        </button>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <h2 className="project-title">{project.title}</h2>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-tech">
                                        {project.technology.split(', ').slice(0, 3).map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag"><strong>{tech}</strong></span>
                                        ))}
                                        {project.technology.split(', ').length > 3 && (
                                            <span className="tech-more">+{project.technology.split(', ').length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cta-section">
                        <h2 className="cta-title">Ready to Build Something Amazing Together?</h2>
                        <p className="cta-description">
                            Let's discuss your next <strong>web development project</strong> and bring your ideas to life with modern <strong>full stack technologies</strong>.
                        </p>
                        <div className="cta-buttons">
                            <a href="/contact" className="btn btn-primary" aria-label="Contact Nimesha Kahingala to start a project">
                                <strong>Start Web Development Project</strong>
                            </a>
                            <a 
                                href="https://github.com/nimeshakahingala" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-secondary"
                                aria-label="View Nimesha Kahingala's GitHub repositories"
                            >
                                View <strong>GitHub Portfolio</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="portfolio-modal"
                width="90%"
                style={{ maxWidth: '1200px' }}
            >
                <PortfolioModal data={selectedProject} />
            </Modal>
        </div>
    );
}

export default Portfolio;