import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

export default function FormDialog() {
    
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(dayjs('2022-11-8T21:11:54'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const handleSubmit = () => {
    //Logic to add game info to database
    setOpen(false);
  };

  const [homePoints, setHomePoints] = React.useState();

  const [awayPoints, setAwayPoints] = React.useState();

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
      <Button sx={{ flexGrow: 1}} variant="outlined" onClick={handleClickOpen}>
        Add New Game Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add game</DialogTitle>
        <DialogContent>
        <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl sx={{ mt: 2, minWidth: 140 }}>
              <InputLabel>Chiefs</InputLabel>
              <Select
                label="Home Team"
                inputProps={{
                  name: 'home-team',
                  id: 'home-team',
                }}
              >
                {teams.map((name) => (
                <MenuItem
                    key={name}
                    value={name}
                >
                {name}
                </MenuItem>
            ))}
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ mt: 2, minWidth: 140 }}>
              <InputLabel>Broncos</InputLabel>
              <Select
                label="Away Team"
                inputProps={{
                  name: 'away-team',
                  id: 'away-team',
                }}
              >
            {teams.map((name) => (
                <MenuItem
                    key={name}
                    value={name}
                >
            {name}
                </MenuItem>
            ))}
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField 
                id="home-points" 
                label="Home Team Points" 
                variant="outlined" 
                type="number"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                onChange={(e) => setHomePoints(e.target.value)}
                value={homePoints}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField 
                id="away-points" 
                label="Away Team Points" 
                variant="outlined"
                type="number"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                onChange={(e) => setAwayPoints(e.target.value)}
                value={awayPoints}
            />
        </Grid>
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Game Date"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Grid>
      </Grid>
            
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}