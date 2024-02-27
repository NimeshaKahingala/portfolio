import React from 'react';
import { PROJECTS } from "../components/data";
import "./portfolioModal.scss";

function PortfolioModal(props) {

    return (
        <>

            <div className='modal-wrap'>
                <div className="img-wrap"><img className="image"></img>image</div>
                <h3 className="title">{props.data?.title}</h3>
                <p className="description">{props.data?.description}</p>
                <div className="technology">Technologies used : <span>{props.data?.technology}</span></div>
                <div className="url">Website URL : <a href="https://millionspaces.com/Singapore" target="blank" className="link">millionspaces.com/Singapore</a></div>
                <div className="website-images">
                    <img></img>img1
                </div>
            </div>


        </>
    );
};
export default PortfolioModal;