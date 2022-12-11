import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import NavBar from '../components/NavBar';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

import { useState, useEffect } from 'react';

import axios from "axios";

function Predictions() {
  const [teams, setTeamData] = useState([])

  useEffect(() => {
    getData()
  }, []);

    async function getData() {
      await axios({
        method: "GET",
        url:"http://127.0.0.1:5000/get-teams",
      })
      .then((response) => {
        console.log(response.data.length)
        var results = response.data;
        console.log(results)
        setTeamData("teams: " + teams)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }

  return (
    <div>
      <NavBar/>
      <form method="POST" action="http://127.0.0.1:5000/run-predictions">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                  {/* <InputLabel fullWidth>Team 1</InputLabel>
                      <Select
                        fullWidth
                        label="Home Team"
                        inputProps={{
                          name: 'team1',
                          id: 'home-team',
                        }}
                      >
                        {teams !== [] && teams.length > 0 ? teams.map((name) => (
                          <MenuItem
                            key={name}
                            value={name[0]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select> */}
                      <TextField fullWidth type="text" name="team1" required></TextField>
                </div>
                <Grid item xs={12}>
                <div>
                <TextField fullWidth type="text" name="team2" required></TextField>
                  {/* <InputLabel fullWidth>Team 1</InputLabel>
                      <Select
                        fullWidth
                        label="Away Team"
                        inputProps={{
                          name: 'team2',
                          id: 'away-team',
                        }}
                      >
                        {teams !== [] && teams.length > 0 ? teams.map((name) => (
                          <MenuItem
                            key={name}
                            value={name[0]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select> */}
                </div>
                </Grid>
                <Button type="submit">Submit</Button>
              </Grid>
              </form>
    </div>
    
  );
}

export default Predictions;
