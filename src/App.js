import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FixedSizeList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'; 
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormData from 'form-data';

function App() {

   // new line start
  const [teamData, setTeamData] = useState(null)

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
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    console.log("results: " + teamData)
    //end of new line 

    const handleSubmit = (event) => {
      var bodyFormData = new FormData();
      bodyFormData.append(team, coach, city, record);
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

  const [coach, setCoach] = useState('');
  const [team, setTeam] = useState('');
  const [record, setRecord] = useState('');
  const [city, setCity] = useState('');

  const handleCoach = (event) => {
    setCoach(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleRecordChange = (event) => {
    setRecord(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
        {/* new line start*/}
        {teamData && teamData.length != 0 ? teamData.map((data) => {
          return(
              <div>
                <p>Key: {data[0]}</p>
                <h2>{data[3]} {data[1]}</h2>
                <p>Coach: {data[2]}</p>
                <p>Record: {data[4]}</p>
                <p>Stadium: {data[5]}</p>
                <p>Previous Stadium: {data[6]}</p>
                <Divider></Divider>
              </div>
             )}): "There are no Projects!" }

        <Divider></Divider>

        <h3>Add Team</h3>
        <form method="POST" action="http://127.0.0.1:5000/add-team">
            <div>
                <label>Team Name</label>
                <input type="text" name="name" required />
            </div>
            <div>
                <label>Head Coach</label>
                <input type="text" name="city" required />
            </div>
            <div>
                <label>City</label>
                <input type="text" name="coach" required />
            </div>
            <div>
                <label>Record</label>
                <input type="text" name="record" required />
            </div>
            <div>
                <label>Stadium</label>
                <input type="text" name="stadium" required />
            </div>
            <div>
                <label>Previous Stadium</label>
                <input type="text" name="prevName" required />
            </div>
            <div>
                <button type="submit">Add Team</button>
            </div>
        </form>
    </div>
  );
}

export default App;