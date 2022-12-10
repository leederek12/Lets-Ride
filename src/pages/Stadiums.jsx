import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';

function Stadiums() {
     // new line start
     const [stadiumData, setStadiumData] = useState(null)

     useEffect(() => {
       console.log("reload")
       getData()
     }, []);
   
     function getData() {
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
       })}
   
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

  return (
    <><NavBar></NavBar><div className="App">
      {stadiumData && stadiumData.length != 0 ? stadiumData.map((data) => {
        return (
          <div>
            <p>Stadium ID: {data[0]}</p>
            <p>Stadium Name: {data[1]}</p>
            <p>City: {data[2]}</p>
            <p>Owner: {data[3]}</p>
            <p>Added Date: {data[4]}</p>
            <Divider></Divider>
          </div>
        );
      }) : "No stadiums added"}

      <Divider></Divider>

      <h3>Add Stadium</h3>
      <form method="POST" action="http://127.0.0.1:5000/add-stadium">
        <div>
          <label>Stadium Name</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" required />
        </div>
        <div>
          <label>Owner</label>
          <input type="text" name="owner" required />
        </div>
        <div>
          <button type="submit">Add Stadiums</button>
        </div>
      </form>
    </div></>
  );
}

export default Stadiums;
