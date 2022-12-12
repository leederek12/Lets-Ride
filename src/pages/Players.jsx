import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css';
import Divider from '@mui/material/Divider'; 
import FormData from 'form-data';
import NavBar from '../components/NavBar';
import PlayerTable from '../components/PlayerTable';
import { DataGrid } from '@mui/x-data-grid';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

function Players() {
     // new line start
     const [playerData, setPlayerData] = useState(null)
     const rows = [
        {
          id: 0,
          name: 'Trend McDuffie',
          teamId: 1,
          birthday: 'September 13, 2000',
          age: '22',
          height: '5-11',
          weight: '195lb',
          pos: 'DB',
          college: 'Washington',
        }
      
      ];

      
     const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'teamId', headerName: 'Team', width: 130 },
      { field: 'birthday', headerName: 'Birthday', width: 130 },
      { field: 'age', headerName: 'Age', width: 150},
      { field: 'height', headerName: 'Height', width: 100 },
      { field: 'weight', headerName: 'Weight', width: 100 },
      { field: 'pos', headerName: 'Position', width: 100 },
      { field: 'college', headerName: 'College', width: 130 }
    ];


     useEffect(() => {
       console.log("reload")
       getData()
     }, []);
   
     async function getData() {
       await axios({
         method: "GET",
         url:"http://127.0.0.1:5000/players",
       })
       .then((response) => {

         const results = response.data;

         

         for (var i = 1; i < results.length; i++) {
          rows.push({id: results[i][0], name: results[i][1], teamId: results[i][2], 
            birthday: results[i][3], age: results[i][4], height: results[i][5], 
          weight: results[i][6], pos: results[i][7], college: results[i][8]})
         }

         console.log(rows);
        
         setPlayerData(results);
       }).catch((error) => {
         if (error.response) {
           console.log(error.response)
           console.log(error.response.status)
           console.log(error.response.headers)
           }
       })}

       //console.log("results: " + playerData)
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

    <PlayerTable></PlayerTable>
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
