import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';

function Scores() {
     // new line start
     const [gameData, setGameData] = useState(null)

     useEffect(() => {
       console.log("reload")
       getData()
     }, []);
   
     function getData() {
       axios({
         method: "GET",
         url:"http://127.0.0.1:5000/games",
       })
       .then((response) => {
         console.log(response.data.length)
         const results = response.data;
         setGameData(results)
       }).catch((error) => {
         if (error.response) {
           console.log(error.response)
           console.log(error.response.status)
           console.log(error.response.headers)
           }
       })}
   
       console.log("results: " + gameData)
       //end of new line 
   
       const handleSubmit = (event) => {
         var bodyFormData = new FormData();
         bodyFormData.append(date, team1, team2, teamscore1, teamscore2, stadium);
         console.log(bodyFormData)
   
         axios({
           method: "POST",
           url:"http://127.0.0.1:5000/add-game",
           data: bodyFormData,
           headers: { "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}` },
         })
         .then((response) => {
           console.log("added: " + response)
         }).catch((error) => {
           console.log(error)
         })
     }
   
     const [date, setDate] = useState('');
     const [team1, setTeam1] = useState('');
     const [team2, setTeam2] = useState('');
     const [teamscore1, setTeamScore1] = useState('');
     const [teamscore2, setTeamScore2] = useState('');
     const [stadium, setStadium] = useState('');


   
     const handleDate = (event) => {
       setDate(event.target.value);
     };
   
     const handleSetTeam1 = (event) => {
       setTeam1(event.target.value);
     };
   
     const handleSetTeam2 = (event) => {
       setTeam2(event.target.value);
     };
   
     const handleTeamScore1 = (event) => {
       setTeamScore1(event.target.value);
     };

     const handleTeamScore2 = (event) => {
      setTeamScore2(event.target.value);
    };

    const handleStadium = (event) => {
      setStadium(event.target.value);
    };

  return (
    <><NavBar></NavBar><div className="App">
      {gameData && gameData.length != 0 ? gameData.map((data) => {
        return (
          <div>
            <p>Game ID: {data[0]}</p>
            <p>Date: {data[1]}</p>
            <p>Team 1 ID: {data[2]}</p>
            <p>Team 2 ID: {data[3]}</p>
            <p>Team 1 Score: {data[4]}</p>
            <p>Team 2 Score: {data[5]}</p>
            <p>Stadium: {data[6]}</p>
            <Divider></Divider>
          </div>
        );
      }) : "No games added"}

      <Divider></Divider>

      <h3>Add Game</h3>
      <form method="POST" action="http://127.0.0.1:5000/add-game">
        <div>
          <label>Date</label>
          <input type="text" name="date" required />
        </div>
        <div>
          <label>Team 1 ID</label>
          <input type="number" name="team1" required />
        </div>
        <div>
          <label>Team 2 ID</label>
          <input type="number" name="team2" required />
        </div>
        <div>
          <label>Team 1 Score</label>
          <input type="number" name="teamscore1" required />
        </div>
        <div>
          <label>Team 2 Score</label>
          <input type="number" name="teamscore2" required />
        </div>
        <div>
          <button type="submit">Add Score</button>
        </div>
      </form>
    </div></>
  );
}

export default Scores;
