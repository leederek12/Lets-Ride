import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';
import { TextField, Button, Container, Grid } from '@mui/material';

function Teams() {
     // new line start
     const [teamData, setTeamData] = useState(null)

     useEffect(() => {
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
       }).catch((error) => {
         if (error.response) {
           console.log(error.response)
           console.log(error.response.status)
           console.log(error.response.headers)
           }
       })}
   
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
   
     const [name, setName] = useState('');
     const [coach, setCoach] = useState(0);
     const [record, setRecord] = useState('');
     const [city, setCity] = useState('');
     const [stadium, setStadium] = useState('');
     const [prevName, setPrevName] = useState('');
   
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

  return (
    <><NavBar></NavBar><div className="App">
      <Container component="main" maxWidth="60%">
      {teamData && teamData.length != 0 ? teamData.map((data) => {
        return (
          <div>
            <p>Team ID: {data[0]}</p>
            <h2>{data[3]} {data[1]}</h2>
            <p>Coach: {data[2]}</p>
            <p>Record: {data[4]}</p>
            <p>Stadium: {data[5]}</p>
            <p>Previous Stadium: {data[6]}</p>
            <p>Last Modified Date: {data[7]}</p>
          <Divider></Divider>
          <form method="POST" action="http://127.0.0.1:5000/delete-team">
          <TextField maxWidth='0%' type="text" name="id" value={data[0]} required></TextField>
          <div>
            <button type="submit">Delete Team</button>
          </div>
          </form>
          </div>
        );
      }) : "No teams added"}

      <Divider></Divider>
      <Grid item xs={50} sm={6}>
      <h3>Add Team</h3>
      <form method="POST" action="http://127.0.0.1:5000/add-team">
        <div>
          <label>Team Name</label>
          <TextField type="text" name="name" required></TextField>
        </div>
        <div>
          <label>Head Coach ID</label>
          <TextField fullWidth type="number" name="coach" required></TextField>
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
          <label>Stadium ID</label>
          <TextField fullWidth type="number" name="stadium" required></TextField>
        </div>
        <div>
          <label>Previous Stadium</label>
          <TextField fullWidth type="text" name="prevName" required></TextField>
        </div>

        <div>
          <label>Points Allowed Per Game</label>
          <TextField fullWidth type="number" name="pointsAllowedPerGame" required></TextField>
        </div>
        <div>
          <label>Points Scored Per Game</label>
          <TextField fullWidth type="number" name="pointsPerGame" required></TextField>
        </div>
        <div>
          <Button variant="contained" type="submit">Add Team</Button>
        </div>
      </form>
      </Grid>
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
    </div></>
  );
}

export default Teams;
