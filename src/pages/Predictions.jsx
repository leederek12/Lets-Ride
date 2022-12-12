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
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useEffect } from 'react';

import axios from "axios";

function Predictions() {
  const [teams, setTeamData] = useState([])
  const [games, setGames] = React.useState(0);
  const [teamData, setData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);


  useEffect(() => {
    getData()
  }, []);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

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

      await axios({
        method: "GET",
        url:"http://127.0.0.1:5000/teams",
      })
      .then((response) => {
        console.log(response.data.length)
        const results = response.data;
        setData(results)
        console.log("teams: " + results)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      await axios({
        method: "GET",
        url:"http://127.0.0.1:5000/predictions",
      })
      .then((response) => {
        console.log(response.data.length)
        var results = response.data;
        console.log(results)
        setGames(results)
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
      <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleClickOpen1}>
        Create a Prediction With Injury Data
      </Button>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle sx={{ mt: 2 }}>Create a Prediction With Injury Data</DialogTitle>
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
            <form method="POST" action="http://127.0.0.1:5000/run-predictions-with-injuries">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                      <h2>Update A Prediction</h2>
                      <InputLabel fullWidth>Team 1</InputLabel>
                      <TextField fullWidth type="text" name="teamName1" required></TextField>
                </div>
                <Grid item xs={12}>
                <div>
                <InputLabel fullWidth>Team 2</InputLabel>
                <TextField fullWidth type="text" name="teamName2" required></TextField>

                <InputLabel fullWidth>Percentage of Injuries for Team 1</InputLabel>
                <TextField fullWidth type="text" name="injuries1" required></TextField>

                <InputLabel fullWidth>Percentage of Injuries for Team 2</InputLabel>
                <TextField fullWidth type="text" name="injuries2" required></TextField>
                </div>
                </Grid>
                <Button type="submit">Submit</Button>
              </Grid>
              </form>
            </Grid>
          </Box>
        </DialogContent>
        
      </Dialog>
          
      <br></br>


      <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleClickOpen2}>
        Create a Prediction With Strength of Schedule
      </Button>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle sx={{ mt: 2 }}>Create a Prediction With Strength of Schedule</DialogTitle>
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
            <form method="POST" action="http://127.0.0.1:5000/run-predictions-with-sos">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                      <h2>Update A Prediction</h2>
                      <InputLabel fullWidth>Team 1</InputLabel>
                      <TextField fullWidth type="text" name="teamName1" required></TextField>
                </div>
                <Grid item xs={12}>
                <div>
                <InputLabel fullWidth>Team 2</InputLabel>
                <TextField fullWidth type="text" name="teamName2" required></TextField>

                <InputLabel fullWidth>Strength of Schedule for Team 1</InputLabel>
                <TextField fullWidth type="text" name="sos1" required></TextField>

                <InputLabel fullWidth>Strength of Schedule for Team 2</InputLabel>
                <TextField fullWidth type="text" name="sos2" required></TextField>

                </div>
                </Grid>
                <Button type="submit">Submit</Button>
              </Grid>
              </form>
            </Grid>
          </Box>
        </DialogContent>
        
      </Dialog>
      
      <br></br>

      <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleClickOpen3}>
        Create a Prediction With Win Percentage
      </Button>
      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle sx={{ mt: 2 }}>Create a Prediction With Win Percentage</DialogTitle>
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
            <form method="POST" action="http://127.0.0.1:5000/run-predictions-with-wp">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                      <h2>Update A Prediction</h2>
                      <InputLabel fullWidth>Team 1</InputLabel>
                      <TextField fullWidth type="text" name="teamName1" required></TextField>
                </div>
                <Grid item xs={12}>
                <div>
                <InputLabel fullWidth>Team 2</InputLabel>
                <TextField fullWidth type="text" name="teamName2" required></TextField>

                <InputLabel fullWidth>Win Percentage for Team 1</InputLabel>
                <TextField fullWidth type="text" name="wp" required></TextField>

                </div>
                </Grid>
                <Button type="submit">Submit</Button>
              </Grid>
              </form>
            </Grid>
          </Box>
        </DialogContent>        
      </Dialog>


      <form method="POST" action="http://127.0.0.1:5000/run-predictions">
              <br></br>
              <Grid item xs={12} sx={{ ml: 2 }}>
                <div>
                      <h2>Update A Prediction</h2>
                      <InputLabel fullWidth>Team 1</InputLabel>
                      <TextField fullWidth type="text" name="teamName1" required></TextField>
                </div>
                <Grid item xs={12}>
                <div>
                <InputLabel fullWidth>Team 2</InputLabel>
                <TextField fullWidth type="text" name="teamName2" required></TextField>
                </div>
                </Grid>
                <Button type="submit">Submit</Button>
              </Grid>
              </form>

              {games != undefined && games.length > 0 ? games.map((data) => (
                        <Card
                        justifyContent="center"
                        fullWidth
                        spacing={0}
                        alignItems="center"
                        sx={{ maxWidth: 500, ml:"36%", mt:"10px", mb: "10px" }}>
        
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Predicted Score
                            </Typography>
                            <Grid
                                justifyContent="center"
                                alignItems="center"
                                container spacing={2}
                            >
                                <Grid item xs={4}>
                                <img width="112" height="112" src={"process.env.PUBLIC_URL + ../../teamLogos/"+(data[1]).toLowerCase()+".png"} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {data[1]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {data[3]} - {data[4]}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {data[1]}
                                    </Typography>
        
                                </Grid>
                                <Grid item xs={4}>
                                    <img width="112" height="112" src={"process.env.PUBLIC_URL + ../../teamLogos/"+(data[2]).toLowerCase()+".png"} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {data[2]}
                                    </Typography>
                                </Grid>
                                <br></br>
                                <Divider></Divider>
                                <br></br>
                            </Grid>
        
        
        
                        </CardContent>
                    </Card>
                      )): ''}


    
    </div>
    
  );
}

export default Predictions;
