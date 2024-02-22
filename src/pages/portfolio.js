import React from "react";
import "./portfolio.scss";

function Portfolio() {
    return (
        <div className="portfolio-page">
            <div className="container">
                <h3 className="title">Selected Portfolios</h3>
                <div className="list-wrapper">
                    <ul className="portfolio-list">
                        <li className="portfolio">
                            <div className="inner">
                                <a href="https://millionspaces.com/Singapore" target="blank">
                                    <div className="image"></div>
                                    <div className="details">
                                        MillionSpaces is an online platform where customers can book their working space
                                        according to the facilities provided and also according to the environment they prefer
                                    </div>
                                    <div className="read-more-text">READ MORE</div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Portfolio;