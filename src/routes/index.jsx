import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Games from '../pages/Games';
import Teams from '../pages/Teams';
import Predictions from '../pages/Predictions';
import Scores from '../pages/Scores';
import Players from '../pages/Players';
import Stadiums from '../pages/Stadiums';


const Routing = props => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Games />} />
                <Route exact path="/teams" element={<Teams />} />
                <Route exact path="/predictions" element={<Predictions />} />                <Route exact path="/predictions" element={<Predictions />} />
                <Route exact path="/games" element={<Scores />} />
                <Route exact path="/players" element={<Players />} />
                <Route exact path="/stadiums" element={<Stadiums />} />
            </Routes>
        </Router>
    );
}

export default Routing;