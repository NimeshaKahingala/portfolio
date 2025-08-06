import React from "react";
import { Helmet } from "react-helmet";
import "./blog.scss";
import BlogCard from "../components/blogCard";

function Blog() {
    return (
        <div className="blog-page">
            <Helmet>
                <title>Blog - Full Stack Development Articles by Nimesha Kahingala</title>
                <meta name="description" content="Read technical articles about full stack development, React tutorials, Node.js guides, and web development best practices by Nimesha Kahingala on Medium." />
                <meta name="keywords" content="full stack development blog, React tutorials, Node.js articles, JavaScript guides, web development tips, technical writing, programming blog" />
                <link rel="canonical" href="https://nimeshakahingala.com/blog" />
                <meta property="og:title" content="Blog - Full Stack Development Articles by Nimesha Kahingala" />
                <meta property="og:description" content="Read technical articles about full stack development, React tutorials, Node.js guides, and web development best practices by Nimesha Kahingala on Medium." />
                <meta property="og:url" content="https://nimeshakahingala.com/blog" />
            </Helmet>
            
            <div className="hero-section">
                <div className="container">
                    <div className="section-badge">Blog</div>
                    <h1 className="hero-title">
                        <strong>Full Stack Development</strong> Articles
                        <span className="title-accent">& Technical Insights</span>
                    </h1>
                    <p className="hero-description">
                        Sharing knowledge about <strong>full-stack development</strong>, modern <strong>web technologies</strong>, 
                        and best practices in <strong>software engineering</strong> and <strong>web development</strong>.
                    </p>
                </div>
            </div>

            <div className="blog-content">
                <div className="container">
                    <div className="articles-grid">
                        <BlogCard />
                        {/* Placeholder for future articles */}
                        <div className="coming-soon-card">
                            <div className="coming-soon-content">
                                <div className="coming-soon-icon">📝</div>
                                <h2>More <strong>Web Development</strong> Articles Coming Soon</h2>
                                <p>I'm working on more technical articles covering <strong>full-stack development</strong>, <strong>React best practices</strong>, <strong>Node.js tutorials</strong>, and <strong>JavaScript programming guides</strong>.</p>
                            </div>
                        </div>
                    </div>

                    <div className="newsletter-section">
                        <div className="newsletter-card">
                            <h2 className="newsletter-title">Stay Updated with Web Development Content</h2>
                            <p className="newsletter-description">
                                Follow me on <strong>Medium</strong> for the latest articles on <strong>full-stack development</strong>, 
                                <strong>web technologies</strong>, and <strong>software engineering insights</strong>.
                            </p>
                            <div className="newsletter-actions">
                                <a 
                                    href="https://medium.com/@NimeshaKahingala" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    aria-label="Follow Nimesha Kahingala on Medium for technical articles"
                                >
                                    Follow on <strong>Medium</strong>
                                </a>
                                <a href="/contact" className="btn btn-secondary" aria-label="Contact to suggest blog topics">
                                    Suggest <strong>Development Topic</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;