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
         bodyFormData.append(name, birthday, age, height, weight, position, college);
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
     const [birthday, setBirthday] = useState('');
     const [age, setAge] = useState('');
     const [teamId, setTeam] = useState('');
     const [height, setHeight] = useState('');
     const [weight, setWeight] = useState('');
     const [position, setPosition] = useState('');
     const [college, setCollege] = useState('');

   
     const handleName = (event) => {
       setName(event.target.value);
     };
   
     const handleBirthday = (event) => {
       setBirthday(event.target.value);
     };
   
     const handleAge = (event) => {
       setAge(event.target.value);
     };

     const handleTeam = (event) => {
        setTeam(event.target.value);
      };
   
     const handleHeight = (event) => {
       setHeight(event.target.value);
     };

     const handleWeight = (event) => {
      setWeight(event.target.value);
    };

    const handlePosition = (event) => {
      setPosition(event.target.value);
    };

    const handleCollege = (event) => {
        setCollege(event.target.value);
      };

  return (
    <><NavBar></NavBar><div className="App">
      {playerData && playerData.length != 0 ? playerData.map((data) => {
        return (
          <div>
            <p>Player ID: {data[0]}</p>
            <p>Name: {data[1]}</p>
            <p>Team Id: {data[2]}</p>
            <p>Birthday 1: {data[3]}</p>
            <p>Age: {data[4]}</p>
            <p>Height: {data[5]}</p>
            <p>Weight: {data[6]}</p>
            <p>Position: {data[7]}</p>
            <p>College: {data[8]}</p>
            <Divider></Divider>
          </div>
        );
      }) : "No games added"}

      <Divider></Divider>

      <h3>Add Player</h3>
      <form method="POST" action="http://127.0.0.1:5000/add-players">
        <div>
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Team Id</label>
          <input type="id" name="teamId" required />
        </div>
        <div>
          <label>Birthday</label>
          <input type="text" name="birthday" required />
        </div>
        <div>
          <label>Age</label>
          <input type="text" name="age" required />
        </div>
        <div>
          <label>Height</label>
          <input type="text" name="height" required />
        </div>
        <div>
          <label>Weight</label>
          <input type="number" name="weight" required />
        </div>
        <div>
          <label>Position</label>
          <input type="text" name="position" required />
        </div>
        <div>
          <label>College</label>
          <input type="text" name="college" required />
        </div>
        <div>
          <button type="submit">Add Score</button>
        </div>
      </form>
    </div></>
  );
}

export default Players;
