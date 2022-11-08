import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Games from '../pages/Games';
import Teams from '../pages/Teams';
import Predictions from '../pages/Predictions';

const Routing = props => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Games />} />
                <Route exact path="/teams" element={<Teams />} />
                <Route exact path="/predictions" element={<Predictions />} />
            </Routes>
        </Router>
    );
}

export default Routing;