import React from 'react';
import { PROJECTS } from "../components/data";
import "./portfolioModal.scss";


function PortfolioModal(props) {

    return (
        <>

            <div className='modal-wrap'>
                <div className="img-wrap"><img className="image" src={props.data?.image} alt='website image'></img></div>
                <div className='modal-content'>
                    <h3 className="title">{props.data?.title}</h3>
                    <p className="description">{props.data?.description}</p>
                    <div className="technology">Technologies used : <span>{props.data?.technology}</span></div>
                    <div className="responsibility">Responsibilities : <span>{props.data?.responsibilities}</span></div>
                    <div className="url">Website URL : <a href={props.data?.url} target="blank" className="link">{props.data?.url}</a></div>
                    <div className="website-images">
                        {props.data.otherImages.map(function (data) {
                            return (
                                <img src={data}></img>
                            )
                        })}
                </div>
                </div>
            </div>


        </>
    );
};
export default PortfolioModal;