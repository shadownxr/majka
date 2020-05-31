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


export default function SearchButton(){
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Podaj date i tytuł
          </DialogContentText>
          <TextField
              id="date"
              label="Od"
              type="date"
              value={date}
              onChange={(event, newDate) => {
                setDate(newDate);
                console.log(date);
              }}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
              id="date"
              label="Do"
              type="date"
              value={date}
              onChange={(event, newDate) => {
                setDate(newDate);
                console.log(date);
              }}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tytuł"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleClose} color="primary">
            Szukaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}