import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import NavBar from '../components/NavBar';
import AddGame from'../components/AddGame';
import Game from'../components/Game';
import { Container } from '@mui/material';

function Games() {

  return (
    <div>
      <NavBar></NavBar>
      <AddGame></AddGame>
      <Container 
            fullWidth
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center" >
         <Game></Game>
      </Container>
    </div>
  );
}

export default Games;
