import React from 'react';
import { PROJECTS } from "../components/data";

function PortfolioModal(props) {

    return (
        <>

            <div className='modal-wrap'>
                <p>{props.data?.title}</p>
                <p>{props.data?.description}</p>
            </div>


        </>
    );
};
export default PortfolioModal;