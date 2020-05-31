import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
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


export default function EditButton(){
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   <div>
     <MyButton  color="primary" onClick={handleClickOpen}><Edit style={{height:'35px',width:'35px'}}/></MyButton>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edycja</DialogTitle>
          <DialogContent>
          <DialogContentText>
            Edytuj wpis
          </DialogContentText>
            <TextField
                id="date"
                label="Data"
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
                id="fuel"
                label="Paliwo"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="distance"
                label="Droga"
                type="text"
                fullWidth
            />
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleClose} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
   </div>
  )
}