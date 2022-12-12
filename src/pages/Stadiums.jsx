import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';

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


function Stadiums() {
     // new line start

     const [open, setOpen] = React.useState(false);
     const [teamData, setTeamData] = useState([])

     const [stadiumData, setStadiumData] = useState(null)

     useEffect(() => {
       console.log("reload")
       getData()
     }, []);
   
     function getData() {
      axios({
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

       axios({
        method: "GET",
        url:"http://127.0.0.1:5000/stadiums",
      })
      .then((response) => {
        console.log(response.data.length)
        const results = response.data;
        setStadiumData(results)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
      }
   
       console.log("results: " + stadiumData)
       //end of new line 
   
       const handleSubmit = (event) => {
         var bodyFormData = new FormData();
         bodyFormData.append(name, city, owner);
         console.log(bodyFormData)
   
         axios({
           method: "POST",
           url:"http://127.0.0.1:5000/add-stadium",
           data: bodyFormData,
           headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}` },
         })
         .then((response) => {
           console.log("added: " + response)
         }).catch((error) => {
           console.log(error)
         })
     }
   
     const [name, setName] = useState('');
     const [city, setCity] = useState('');
     const [owner, setOwner] = useState('');

   
     const handleNameChange = (event) => {
       setName(event.target.value);
     };
   
     const handleCityChange = (event) => {
       setCity(event.target.value);
     };
   
     const handleOwnerChange = (event) => {
       setOwner(event.target.value);
     };

     const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <><NavBar></NavBar>
    <div>
    <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleClickOpen}>
        Add a new Stadium
    </Button>
    </div>
    &nbsp;
    <div className="App">
    <Grid
                        justifyContent="center"
                        alignItems="center"
                        container spacing={2}
                    >
      {stadiumData && stadiumData.length != 0 ? stadiumData.map((data) => {
        const imageURL = "process.env.PUBLIC_URL + ../../teamLogos/" + ((teamData[parseInt(data[0])-1])[1]).toLowerCase() + ".png";
        return (     
          <div>
            <Grid item xs={6}>
            <Card
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: 125, minWidth: 400, maxWidth: 400 }}>       
                    <Grid
                        justifyContent="center"
                        alignItems="center"
                        container
                    >
                      <Grid item xs={4}>

                      <Typography gutterBottom variant="h6" component="div">
                        Stadium name
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                      
                        {data[1]}
                      </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography gutterBottom variant="h6" component="div">
                          Team
                        </Typography>
                        
                          <Typography gutterBottom variant="h7" component="div">
                          <img width="56" height="37" src={imageURL} />
                          </Typography>
                          </Grid>
                          <Grid item xs={4}>
                        <Typography gutterBottom variant="h6" component="div">
                          City
                        </Typography>
                          <Typography gutterBottom variant="h7" component="div">
                            {data[2]}
                        </Typography>
                        </Grid>
                      </Grid>
            </Card>
            </Grid>
            <Divider></Divider>
          </div>
        );
      }) : "No stadiums added"}
      </Grid>

      <Divider></Divider>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Stadium</DialogTitle>
        &nbsp;
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
            <form method="POST" action="http://127.0.0.1:5000/add-stadium">
                <div>
                  <TextField
                  required
                  name="name"
                  id="stadium_name"
                  label="Stadium Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div>
                &nbsp;
                <InputLabel id="Team">Age</InputLabel>
                  <Select
                    sx={{ mt: 2, minWidth: 140 }}
                    labelId="Team"
                    required
                    onChange={(e) => setOwner(e.target.value)}
                    name="owner"
                    label="Team"
                    type="text"
                    inputProps={{
                      name: 'owner',
                      id: 'owner',
                    }}
                  >
                    {teams.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  </div>
                  <div>
                  <TextField
                  sx={{ mt: 2, minWidth: 140 }}
                  required
                  name="city"
                  id="city"
                  label="City"
                  variant="outlined"
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
                </div>
                <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
              </form>
          </Box>
        </DialogContent>
        
      </Dialog>

    </div></>
  );
}

export default Stadiums;
