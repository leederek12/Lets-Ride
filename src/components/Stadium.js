import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import '../App.css';

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

    return (
        <div>
            <Card
                justifyContent="center"
                alignItems="center"
                sx={{ maxWidth: 500 }}>

                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        Final Score
                    </Typography>
                    <Grid
                        justifyContent="center"
                        alignItems="center"
                        container spacing={2}
                    >
                        <Grid item xs={4}>
                            <img width="112" height="75" src="process.env.PUBLIC_URL + ../../teamLogos/chiefs.png" />
                            <Typography gutterBottom variant="h5" component="div">
                                Chiefs
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="h4" component="div">
                                0 - 72
                            </Typography>
                            <Typography variant="h7" component="div">
                                December 14th, 2022
                            </Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <img width="112" height="75" src="process.env.PUBLIC_URL + ../../teamLogos/broncos.png" />
                            <Typography gutterBottom variant="h5" component="div">
                                Broncos
                            </Typography>
                        </Grid>
                    </Grid>



                </CardContent>
            </Card>
        </div>
    );
}