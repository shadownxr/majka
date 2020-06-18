import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
  color: 'black',
  width: '35px',
  height: '35px',
  minWidth: '35px',
  padding: '0px 0px 0px 0px',
});


export default function AddButton(props){
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [value, setValue] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [err, setErr] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErr("");
    setOpen(false);
  };

  const handleAdd = () => {
    addMileageHandle();
  };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleDistance = (event) => {
    setDistance(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const addMileageHandle = () => {
    if(date === "" || value === "" || date === ""){
      setErr("Wypełnij wszystkie pola");
      return;
    }

    let details = {
        'date': date,
        'value':  value,
        'distance': distance,
        'userId': props.account.id,
        'carId': props.carData.acId
      };
  
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details),
      };

      const url = 'http://localhost:8000/mileage/add';
  
      fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        props.refreshCallback(true);
        setErr("");
        handleClose();
      });
  };

  return (
    <div>
      <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dodaj Spalanie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Podaj date, ilość tankowanego paliwa i przebytą drogę.<br/>
            {err}
          </DialogContentText>
          <TextField
              id="date"
              label="Data"
              type="date"
              value={date}
              onChange={handleDate}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fuel"
            label="Paliwo"
            type="text"
            onChange={handleValue}
            fullWidth
          />L
          <TextField
            autoFocus
            margin="dense"
            id="distance"
            label="Droga"
            type="text"
            onChange={handleDistance}
            fullWidth
          />KM
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleAdd} color="primary">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}