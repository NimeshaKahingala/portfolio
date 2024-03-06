import React from "react";
import "./progressBar.scss";


function ProgressBar(props) {
    return (
        <div class="progress-inner">
            <span className="details">
                <span class="label">{props.skill}</span>
                <span class="number">{props.number}%</span>
            </span>
            <div class="background">
                <div class="bar">
                    <div class="bar-in" style={{width:`${props.number}%`}}></div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;