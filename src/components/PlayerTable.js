import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable() {
    const [playerData, setPlayerData] = useState(null)
    const [rows, setRows] = useState(null)

     
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
      axios({
        method: "GET",
        url:"http://127.0.0.1:5000/players",
      })
      .then((response) => {

        const results = response.data;
        const values = [{
            id: 0,
            name: 'Trend McDuffie',
            teamId: 'Chiefs',
            birthday: 'September 13, 2000',
            age: '22',
            height: '5-11',
            weight: '195lb',
            pos: 'DB',
            college: 'Washington',
          }]
        
        for (var i = 1; i < results.length; i++) {
         values.push({id: results[i][0], name: results[i][1], teamId: 'Chiefs', 
           birthday: results[i][3], age: results[i][4], height: results[i][5], 
         weight: results[i][6], pos: results[i][7], college: results[i][8]})
        }

        console.log(rows);
        setRows(values);
        setPlayerData(results);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }, []);
  
    const [name, setName] = useState('');
    const [team, setBirthday] = useState('');
    const [pb, setpb] = useState('');
    const [chmp, setWeight] = useState('');
    const [api1, setPosition] = useState('');

  return (
    <div style={{ height: 600, width: '100%' }}>
      {rows && (<DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />)}
    </div>
  );
}