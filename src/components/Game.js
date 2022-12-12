import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; 
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { Divider, Container } from '@mui/material';
import '../App.css';

import axios from "axios";
import { useState, useEffect } from 'react';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {           // this is the`className` passed to `CardMedia` later
        height: 100,     // as an example I am modifying width and height
        width: '33%',
        marginLeft: '33%'
    },
})


export default function FormDialog() {

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(dayjs('2022-11-8T21:11:54'));
    const [games, setGames] = React.useState(0);
    const [teamData, setTeamData] = useState([])

    const [homePoints, setHomePoints] = React.useState();

    const [awayPoints, setAwayPoints] = React.useState();

    useEffect(() => {
        getData()
      }, []);
    
      async function getData() {
        await axios({
            method: "GET",
            url:"http://127.0.0.1:5000/teams",
          })
          .then((response) => {
            console.log(response.data.length)
            const results = response.data;
            setTeamData(results)
            console.log("teams: " + results)
          }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })

        await axios({
          method: "GET",
          url:"http://127.0.0.1:5000/games",
        })
        .then((response) => {
          console.log(response.data.length)
          var results = response.data;
          console.log(results)
          setGames(results)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
      }

    const teams = [
        'Bears',
        'Bengals',
        'Bills',
        'Broncos',
        'Bucs',
        'Cardinals',
        'Chargers',
        'Chiefs',
        'Colts',
        'Commanders',
        'Cowboys',
        'Dolphins',
        'Eagles',
        'Falcons',
        'Giants',
        'Jags',
        'Jets',
        'Lions',
        'Niners',
        'Packers',
        'Panthers',
        'Patriots',
        'Raiders',
        'Rams',
        'Ravens',
        'Saints',
        'Seahawks',
        'Steelers',
        'Texans',
        'Titans',
        'Vikings'
    ];

    return (
        <div>
            <Container 
            fullWidth
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: 500, mt: "20px" }}>

            <h2>Scores</h2>
            <Divider sx={{ mt: "20px" }}></Divider>
                
            {games != undefined && games.length > 0 ? games.map((data) => (
                        <Card
                        justifyContent="center"
                        fullWidth
                        spacing={0}
                        alignItems="center"
                        sx={{ maxWidth: 500, ml:"28%", mt:"10px", mb: "10px" }}>
        
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Final Score
                            </Typography>
                            <form method="POST" action="http://127.0.0.1:5000/delete-game">
                                <TextField sx={{ width: "1px", height: "1px", "& fieldset": { border: 'none' } }} value={data[0]} inputProps={{readOnly: true}} name="id"/>
                                <Button type="submit">Delete Game</Button>
                            </form>
                            <Grid
                                justifyContent="center"
                                alignItems="center"
                                container spacing={2}
                            >
                                <Grid item xs={4}>
                                <img width="112" height="112" src={"process.env.PUBLIC_URL + ../../teamLogos/"+((teamData[parseInt(data[2])-1])[1]).toLowerCase()+".png"} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {((teamData[parseInt(data[2])-1])[1])}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {data[4]} - {data[5]}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {data[1]}
                                    </Typography>
        
                                </Grid>
                                <Grid item xs={4}>
                                    <img width="112" height="112" src={"process.env.PUBLIC_URL + ../../teamLogos/"+((teamData[parseInt(data[3])-1])[1]).toLowerCase()+".png"} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {((teamData[parseInt(data[3])-1])[1])}
                                    </Typography>
                                </Grid>
                                <br></br>
                                <Divider></Divider>
                                <br></br>
                            </Grid>
                        </CardContent>
                    </Card>
                      )): ''}
            </Container>
        </div>
    );
}