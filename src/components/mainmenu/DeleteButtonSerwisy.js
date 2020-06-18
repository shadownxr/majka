import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
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


export default function DeleteButton(props){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    let details = {
      'serviceId': props.serviceId
    };

    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(details),
    };

    const url = 'http://localhost:8000/services';

    fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      props.refreshCallback(true);
      handleClose();
    });
  }

  return (
   <div>
     <MyButton color="primary" onClick={handleClickOpen}><Delete style={{height:'35px',width:'35px'}}/></MyButton>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Usuń</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Czy jesteś pewny usunięcia wpisu?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleDelete} color="primary">
              Usuń
            </Button>
          </DialogActions>
        </Dialog>
   </div>
  )
}