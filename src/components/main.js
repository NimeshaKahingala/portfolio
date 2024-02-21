import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/home";
import AboutPage from "../pages/about";

function Main() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                {/* <Route path="/" element={</>}></Route> */}
            </Routes>
        </>
    )
};

export default Main;