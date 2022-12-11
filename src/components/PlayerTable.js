import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable() {
     
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'player', headerName: 'Name', width: 200 },
    { field: 'teamId', headerName: 'Team', width: 130 },
    { field: 'chmp', headerName: 'Championships', width: 130 },
    { field: 'AP1', headerName: '1st Team All-Pro', width: 150},
    { field: 'PB', headerName: 'Pro Bowls', width: 100 },
    { field: 'from', headerName: 'From', width: 100 },
    { field: 'to', headerName: 'To', width: 100 },
    { field: 'G', headerName: 'Games Played', width: 130 },
  ];


const rows = [
    { id: 1, player: "Patrick Mahomes", teamId: "Chiefs", chmp: 1, AP1: 3, PB: 4, from: 2018, to: 2022, G: 77}
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