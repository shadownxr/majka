import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
  color: 'white',
  width: '35px',
  height: '35px',
  minWidth: '35px',
  padding: '0px 0px 0px 0px',
});


export default function SearchButton(props){
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [err, setErr] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErr("");
    setOpen(false);
  };

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
  };

  const handleSearchC = () => {
    props.searchCallback({to:to, from:from, search: true});
    setOpen(false);
  }

  const handleSearch = () => {
    let fromDate;
    let toDate;

    if(((from !== '')||( from !== null)) && ((to !== '')||(to !== null))){
        fromDate = new Date(from);
        toDate = new Date(to);
    } else {
        setErr("Wybierz datę od do której będzie szukany wpis");
        return;
    }

    let details = {
        'userId': props.account.id,
        'carId': props.carData.acId,
        'dateFrom': fromDate,
        'dateTo': toDate,
        };
    
        const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details),
        };
    
        const url = 'http://localhost:8000/mileage/search';
    
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
              console.log(result);
              setErr("");
              props.searchResultCallback({data:result,search:true});
              setOpen(false);
        })
    }

  return (
    <div>
    <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Podaj date od do<br/>
          {err}
        </DialogContentText>
        <TextField
            id="date"
            label="Od"
            type="date"
            value={from}
            onChange={handleFrom}
            InputLabelProps={{
              shrink: true,
            }}
        />
        <TextField
            id="date"
            label="Do"
            type="date"
            value={to}
            onChange={handleTo}
            InputLabelProps={{
              shrink: true,
            }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Anuluj
        </Button>
        <Button onClick={handleSearch} color="primary">
          Szukaj
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}