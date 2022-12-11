import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable() {
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


const rows = [
    {id: playerData[0][0], name: "", teamId: "", birthday: "", age: "", height: "", weight: "", pos: "", college: ""}
];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}