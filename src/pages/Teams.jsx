import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';
import { TextField, Button, Container, Grid } from '@mui/material';
import dayjs from 'dayjs';
import AddTeam from '../components/AddTeam'

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Teams() {
     // new line start
     const [teamData, setTeamData] = useState([])
     const [stadiumData, setStadiumData] = useState([])
     const [coachData, setCoachData] = useState([])

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

     useEffect(() => {
       getData()
     }, []);
   
     async function getData() {
       await axios({
        method: "GET",
        url:"http://127.0.0.1:5000/stadiums",
        })
        .then((response) => {
          console.log(response.data.length)
          const results = response.data;
          setStadiumData(results)
          console.log("stadiums: " + results)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })

        await axios({
          method: "GET",
          url:"http://127.0.0.1:5000/coaches",
          })
          .then((response) => {
            console.log(response.data.length)
            const results = response.data;
            setCoachData(results)
            console.log("coaches: " + results)
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
          setTeamData(results)
          console.log("teams: " + results)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
      }
   
       //console.log("results: " + teamData)
       //end of new line 
   
       const handleSubmit = (event) => {
        event.preventDefault()
        console.log("updateing")
         var bodyFormData = new FormData();
         bodyFormData.append(name, coach, city, record, stadium, prevName);
         console.log(bodyFormData)
   
         axios({
           method: "POST",
           url:"http://127.0.0.1:5000/add-team",
           data: bodyFormData,
           headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}` },
         })
         .then((response) => {
           console.log("added: " + response)
         }).catch((error) => {
           console.log(error)
         })
     }

     const handleUpdate = (event) => {
      event.preventDefault()
      console.log("updateing")
       var bodyFormData = new FormData();
       bodyFormData.append(name, coach, city, record, stadium, prevName, event.currentTarget.id);
       console.log(bodyFormData)
 
       axios({
         method: "POST",
         url:"http://127.0.0.1:5000/update-team",
         data: bodyFormData,
         headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}` },
       })
       .then((response) => {
         console.log("added: " + response)
       }).catch((error) => {
         console.log(error)
       })
    }

   const handleUpdateClickOpen = (event) => {

   }
   
     const [name, setName] = useState('');
     const [coach, setCoach] = useState(0);
     const [record, setRecord] = useState('');
     const [city, setCity] = useState('');
     const [stadium, setStadium] = useState('');
     const [prevName, setPrevName] = useState('');
   

     const [open, setOpen] = React.useState(false);
     const [openUpdate, setOpenUpdate] = React.useState(false);
     const [date, setDate] = React.useState(dayjs('2022-11-8T21:11:54'));
     const [games, setGames] = React.useState(0);
     
     const handleCoachChange = (event) => {
       setCoach(event.target.value);
     };

     const handleNameChange = (event) => {
      console.log("team")
      setName(event.target.value);
    };
   
     const handleRecordChange = (event) => {
       setRecord(event.target.value);
     };
   
     const handleCityChange = (event) => {
       setCity(event.target.value);
     };

     const handleStadiumChange = (event) => {
      setStadium(event.target.value);
    };

    const handlePrevChange = (event) => {
      setPrevName(event.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleDateChange = (newDate) => {
      setDate(newDate);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <><NavBar></NavBar><div className="App">
      <AddTeam/>
      <Container component="main" maxWidth="60%">
        <Container 
          fullWidth
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: '80%', mt: "20px" }}>

          <h2>Scores</h2>
          <Divider sx={{ mt: "20px" }}></Divider>
              
          {teamData !== null && teamData.length > 0 ? teamData.map((data) => (
                      <Card
                      fullWidth
                      spacing={0}
                      alignItems="center"
                      justifyContent="flex-end"
                      sx={{ maxWidth: 500, ml:'28%', mt:"10px", mb: "10px" }}>
      
                      <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                              {data[1]}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleUpdateClickOpen}>
                              Update Team
                            </Button></Grid>
                            <Grid item xs={6}>
                            <img width="112" height="112" src={"process.env.PUBLIC_URL + ../../teamLogos/"+data[1].toLowerCase()+".png"} />
                              
                            </Grid>
                            <Grid item xs={6}>
                              <h2>Record: {data[4]}</h2>
                              <b>City:</b> {data[3]}
                              <br></br>
                              <b>Coach:</b> {(coachData[parseInt(data[2])-1])[1]}
                              <br></br>
                              <b>Stadium:</b> {(stadiumData[parseInt(data[5])-1])[1]}
                            </Grid>
                          </Grid>
                      </CardContent>
                  </Card>
                    )): ''}
          </Container>

      <Divider></Divider>
      <Divider></Divider>
      <Grid item xs={50} sm={6}>
        <h3>Update Team</h3>
          <form method="POST" action="http://127.0.0.1:5000/update-team">
            <div>
              <label>Team Id</label>
              <TextField fullWidth type="text" name="id" required></TextField>
            </div>
            <div>
              <label>Team Name</label>
              <TextField fullWidth type="text" name="name" required></TextField>
            </div>
            <div>
              <label>Head Coach</label>
              <TextField fullWidth type="text" name="coach" required></TextField>
            </div>
            <div>
              <label>City</label>
              <TextField fullWidth type="text" name="city" required></TextField>
            </div>
            <div>
              <label>Record</label>
              <TextField fullWidth type="text" name="record" required></TextField>
            </div>
            <div>
              <label>Stadium</label>
              <TextField fullWidth type="text" name="stadium" required></TextField>
            </div>
            <div>
              <label>Previous Stadium</label>
              <TextField fullWidth type="text" name="prevName" required></TextField>
            </div>
            <div>
              <Button variant="contained" type="submit">Update Team</Button>
            </div>
          </form>
          </Grid>
        </Container>

        <Dialog open={openUpdate} onClose={handleClose}>
        <DialogTitle sx={{ mt: 2 }}>Update Team</DialogTitle>
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
                  <InputLabel fullWidth>Team Name</InputLabel>
                      <Select
                        fullWidth
                        label="Home Team"
                        inputProps={{
                          name: 'team1',
                          id: 'home-team',
                        }}
                      >
                        {teams != undefined && teams.length > 0 ? teams.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        )): ''}
                      </Select>
                </div>
                <Grid item xs={12}>
                <InputLabel fullWidth>Coach</InputLabel>
                      <Select
                        fullWidth
                        label="Coach"
                        inputProps={{
                          name: 'coach',
                          id: 'coach',
                        }}
                      >
                        {coach != undefined && coach.length > 0 ? coach.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name[1]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select>
                </Grid>
                <Grid item xs={12}>
                  <label>Record</label>
                  <TextField fullWidth type="text" name="record" required/>
                </Grid>
                <Grid item xs={12}>
                <InputLabel fullWidth>Stadium</InputLabel>
                      <Select
                        fullWidth
                        label="Stadium"
                        inputProps={{
                          name: 'stadium',
                          id: 'stadium',
                        }}
                      >
                        {stadium != undefined && stadium.length > 0 ? stadium.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name[1]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select>
                </Grid>
                <br></br>
                <Divider>Team Statistics</Divider>
                <br></br>
                <Grid item xs={12}>
                    <label>Points Allowed Per Game</label>
                    <TextField fullWidth type="number" name="pointsAllowedPerGame" required></TextField>
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                    <label>Points Per Game</label>
                    <TextField fullWidth type="number" name="pointsPerGame" required></TextField>
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

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mt: 2 }}>Add Team</DialogTitle>
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
                  <InputLabel fullWidth>Team Name</InputLabel>
                      <Select
                        fullWidth
                        label="Home Team"
                        inputProps={{
                          name: 'team1',
                          id: 'home-team',
                        }}
                      >
                        {teams != undefined && teams.length > 0 ? teams.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        )): ''}
                      </Select>
                </div>
                <Grid item xs={12}>
                <InputLabel fullWidth>Coach</InputLabel>
                      <Select
                        fullWidth
                        label="Coach"
                        inputProps={{
                          name: 'coach',
                          id: 'coach',
                        }}
                      >
                        {coach != undefined && coach.length > 0 ? coach.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name[1]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select>
                </Grid>
                <Grid item xs={12}>
                  <label>Record</label>
                  <TextField fullWidth type="text" name="record" required/>
                </Grid>
                <Grid item xs={12}>
                <InputLabel fullWidth>Stadium</InputLabel>
                      <Select
                        fullWidth
                        label="Stadium"
                        inputProps={{
                          name: 'stadium',
                          id: 'stadium',
                        }}
                      >
                        {stadium != undefined && stadium.length > 0 ? stadium.map((name, index) => (
                          <MenuItem
                            key={index}
                            value={name[1]}
                          >
                            {name[1]}
                          </MenuItem>
                        )): ''}
                      </Select>
                </Grid>
                <br></br>
                <Divider>Team Statistics</Divider>
                <br></br>
                <Grid item xs={12}>
                    <label>Points Allowed Per Game</label>
                    <TextField fullWidth type="number" name="pointsAllowedPerGame" required></TextField>
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                    <label>Points Per Game</label>
                    <TextField fullWidth type="number" name="pointsPerGame" required></TextField>
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
    </div></>
  );
}

export default Teams;
