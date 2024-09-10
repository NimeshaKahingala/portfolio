import React from "react";
import "./blog.scss";
import BlogCard from "../components/blogCard";

function Blog() {
    return (
        <div className="blog-page">
            <div className="container">
                <div className="section-name">Blog</div>
                <h3 className="title">My Articles</h3>
                <div className="details">
                    <BlogCard/>
                </div>
            </div>
        </div>
    )
}

export default Blog;