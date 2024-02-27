import React, { useState } from "react";
import { Modal } from 'antd';
import PortfolioModal from "../components/portfolioModal";
import "./portfolio.scss";
import msImage from "../images/millionSpaces.png";
import { PROJECTS } from "../components/data";
import goldenGateImage from "../images/goldenGate.PNG";

function Portfolio() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});

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


    return (
        <div className="portfolio-page">
            <div className="container">
                <div className="section-name">portfolio</div>
                <h3 className="title">Selected Portfolios</h3>
                <div className="list-wrapper">
                    <ul className="portfolio-list">
                        {PROJECTS.map(function (data) {
                            return (
                                <li className="portfolio" onClick={()=>showModal(data)}>
                                    <div className="inner">
                                        {/* <a href="https://millionspaces.com/Singapore" target="blank"> */}
                                        <a>
                                            <div className="image-wrap">
                                                <div className="image"
                                                    style={{ backgroundImage: `url(${msImage})` }}>
                                                </div>
                                            </div>
                                            <div className="details">
                                                {data.description}
                                            </div>
                                            <div className="read-more-text">READ MORE</div>
                                        </a>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    className="portfolio-modal">
                    <PortfolioModal data={selectedProject}/>
                </Modal>
            </div>
        </div>
    )
}

export default Portfolio;