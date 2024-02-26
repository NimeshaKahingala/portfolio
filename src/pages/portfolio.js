import React, { useState } from "react";
import { Modal } from 'antd';
import PortfolioModal from "../components/portfolioModal";
import "./portfolio.scss";
import msImage from "../images/millionSpaces.png";
import goldenGateImage from "../images/goldenGate.PNG";

function Portfolio() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="portfolio-page">
            <div className="container">
                <div className="section-name">portfolio</div>
                <h3 className="title">Selected Portfolios</h3>
                <div className="list-wrapper">
                    <ul className="portfolio-list">
                        <li className="portfolio" onClick={showModal}>
                            <div className="inner">
                                {/* <a href="https://millionspaces.com/Singapore" target="blank"> */}
                                <a>
                                    <div className="image-wrap">
                                        <div className="image" style={{ backgroundImage: `url(${msImage})` }}></div>
                                    </div>
                                    <div className="details">
                                        MillionSpaces is an online platform where customers can book their working space
                                        according to the facilities provided and also according to the environment they prefer
                                    </div>
                                    <div className="read-more-text">READ MORE</div>
                                </a>
                            </div>
                        </li>
                        <li className="portfolio" onClick={showModal}>
                            <div className="inner">
                                {/* <a href="https://thegoldengate.uk/" target="blank"> */}
                                <a >
                                    <div className="image-wrap">
                                        <div className="image" style={{ backgroundImage: `url(${goldenGateImage})` }}></div>
                                    </div>
                                    <div className="details">
                                        Development of a student-centric application, "Golden Gate," designed to enhance the
                                        educational experience through an interactive user interface.
                                    </div>
                                    <div className="read-more-text">READ MORE</div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}>
                        <PortfolioModal/>
                </Modal>
            </div>
        </div>
    )
}

export default Portfolio;