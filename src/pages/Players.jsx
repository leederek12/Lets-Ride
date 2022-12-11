import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';

function Players() {
     // new line start
     const [playerData, setPlayerData] = useState(null)

     useEffect(() => {
       console.log("reload")
       getData()
     }, []);
   
     function getData() {
       axios({
         method: "GET",
         url:"http://127.0.0.1:5000/players",
       })
       .then((response) => {
         console.log(response.data.length)
         const results = response.data;
         setPlayerData(results)
       }).catch((error) => {
         if (error.response) {
           console.log(error.response)
           console.log(error.response.status)
           console.log(error.response.headers)
           }
       })}
   
       console.log("results: " + playerData)
       //end of new line 
   
       const handleSubmit = (event) => {
         var bodyFormData = new FormData();
         bodyFormData.append(name, team, pb, chmp, api1);
         console.log(bodyFormData)
   
         axios({
           method: "POST",
           url:"http://127.0.0.1:5000/add-player",
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
     const [team, setBirthday] = useState('');
     const [pb, setpb] = useState('');
     const [chmp, setWeight] = useState('');
     const [api1, setPosition] = useState('');

  return (
    <><NavBar></NavBar><div className="App">
      {playerData && playerData.length != 0 ? playerData.map((data) => {
        return (
          <div>
            <p>Player ID: {data[0]}</p>
            <p>Name: {data[1]}</p>
            <p>Team: {data[2]}</p>
            <p>Pro Bowls 1: {data[3]}</p>
            <p>Championships: {data[4]}</p>
            <p>First All Pro: {data[5]}</p>
            <p>First Year: {data[6]}</p>
            <p>Last Year: {data[7]}</p>
            <p>Games Played: {data[5]}</p>
            <Divider></Divider>
          </div>
        );
      }) : "No players added"}

      <Divider></Divider>

      <h3>Add Player</h3>
      <form method="POST" action="http://127.0.0.1:5000/add-players">
        <div>
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Team</label>
          <input type="text" name="team" required />
        </div>
        <div>
          <label>Championships</label>
          <input type="text" name="chmp" required />
        </div>
        <div>
          <label>All Pro Bowls</label>
          <input type="text" name="ap1" required />
        </div>
        <div>
          <label>Pro Bowls</label>
          <input type="text" name="pb" required />
        </div>
        <div>
          <label>From</label>
          <input type="text" name="from" required />
        </div>
        <div>
          <label>To</label>
          <input type="text" name="to" required />
        </div>
        <div>
          <label>Games Played</label>
          <input type="text" name="g" required />
        </div>
        <div>
          <button type="submit">Add Player</button>
        </div>
      </form>
    </div></>
  );
}

export default Players;
