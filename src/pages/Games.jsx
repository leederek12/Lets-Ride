import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import NavBar from '../components/NavBar';
import AddGame from'../components/AddGame';

function Games() {

  return (
    <div>
      <NavBar></NavBar>
      <AddGame></AddGame>
    </div>
  );
}

export default Games;
