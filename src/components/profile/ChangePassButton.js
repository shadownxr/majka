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
    color: 'white',
    width: '35px',
    height: '35px',
    minWidth: '35px',
    padding: '0px 0px 0px 0px',
  });

export default function ChangePassButton(props){
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErr("");
    setOpen(false);
  };

  const handleChange = () => {
    fetchChangePassword();
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const fetchChangePassword = () => {
    if(password === ""){
        setErr("Wypełnij pole");
        return;
      }
    let details = {
        'userId': props.account.id,
        'password': password
      };
  
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details),
      };
  
      const url = 'http://localhost:8000/accounts/user';
  
      fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setErr("");
        setOpen(false);
      });
    }
  return (
    <div>
      <MyButton color="primary" onClick={handleClickOpen}><Edit style={{height:'35px',width:'35px',color:'black'}}/></MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dodaj Spalanie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Podaj nowe hasło<br/>
            {err}
          </DialogContentText>
          <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePassword}
              InputLabelProps={{
                shrink: true,
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleChange} color="primary">
            Zmień
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )

}