import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Games from '../pages/Games';

const Routing = props => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Games />} />
                <Route exact path="/teams" element={<Games />} />
                <Route exact path="/predictions" element={<Games />} />
            </Routes>
        </Router>
    );
}

export default Routing;