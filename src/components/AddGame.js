import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { render } from '@testing-library/react';

import { useState, useEffect } from 'react';
import axios from "axios";

export default function FormDialog() {

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs('2022-11-8T21:11:54'));
  const [games, setGames] = React.useState(0);
  const [teamData, setTeamData] = useState(null)

  useEffect(() => {
    getData()
  }, []);

  function getData() {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get-teams",
    })
    .then((response) => {
      console.log(response.data.length)
      var results = response.data;
      console.log(results)
      results.splice(0, 1);
      setTeamData(results)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addGame = () => {
    return (
      <>
        <p>HELLO</p>
      </>
    )
  };

  const [homePoints, setHomePoints] = React.useState();

  const [awayPoints, setAwayPoints] = React.useState();

  const teams = [
    'Bears',
    'Bengals',
    'Bills',
    'Broncos',
    'Bucs',
    'Cardinals',
    'Chargers',
    'Chiefs',
    'Colts',
    'Commanders',
    'Cowboys',
    'Dolphins',
    'Eagles',
    'Falcons',
    'Giants',
    'Jags',
    'Jets',
    'Lions',
    'Niners',
    'Packers',
    'Panthers',
    'Patriots',
    'Raiders',
    'Rams',
    'Ravens',
    'Saints',
    'Seahawks',
    'Steelers',
    'Texans',
    'Titans',
    'Vikings'
  ];

  return (
    <div>
      <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleClickOpen}>
        Add New Game Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mt: 2 }}>Add game</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <Grid container spacing={2}>
            <form method="POST" action="http://127.0.0.1:5000/add-game">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                  <label>Date</label>
                  <TextField fullWidth type="date" name="date" required />
                </div>
                <div>
                  <InputLabel fullWidth>Home Team</InputLabel>
                      <Select
                        fullWidth
                        label="Home Team"
                        inputProps={{
                          name: 'team1',
                          id: 'home-team',
                        }}
                      >
                        {teamData != undefined && teamData.length > 0 ? teamData.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        )): ''}
                      </Select>
                </div>
                <div>
                  <InputLabel fullWidth>Away Team</InputLabel>
                    <Select
                      fullWidth
                      label="Away Team"
                      inputProps={{
                        name: 'team2',
                        id: 'away-team',
                      }}
                    >
                      {teamData != undefined && teamData.length > 0 ? teamData.map((name, index) => (
                        <MenuItem
                          key={index}
                          value={name}
                        >
                          {name}
                        </MenuItem>
                      )): ''}
                    </Select>
                </div>
                {/* <div>
                  <label>Team 2 ID</label>
                  <TextField fullWidth type="number" name="team2" required />
                </div> */}
                <Grid item xs={12}>
                  <label>Team 1 Score</label>
                  <TextField fullWidth type="number" name="teamscore1" required />
                </Grid>
                <Grid item xs={12}>
                    <label>Team 2 Score</label>
                    <TextField fullWidth type="number" name="teamscore2" required />
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Grid>
              </form>
            </Grid>
          </Box>
        </DialogContent>
        
      </Dialog>

    </div>
  );
}