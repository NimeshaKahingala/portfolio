import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/home";
import AboutPage from "../pages/about";
import Portfolio from "../pages/portfolio";

function Main() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/portfolio" element={<Portfolio/>}></Route>
            </Routes>
        </>
    )
};

export default Main;