import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
  color: 'black',
  width: '50px',
  height: '50px',
  minWidth: '50px',
  padding: '0px 0px 0px 0px',
});


export default function AddButton(){
  const [open, setOpen] = useState(false);
  const [carBrand, setCarBrand] = useState(" ");
  const [carModel, setCarModel] = useState(" ");
  const [carEngine, setCarEngine] = useState(" ");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <div>
    <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'50px',width:'50px'}}/></MyButton>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Dodaj nowy samochód
            </DialogContentText>
            <Autocomplete
              id="brand-box"
              disableClearable
              onChange={(event,newBrand)=>{setCarBrand(newBrand.label)}}
              options={cars}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 , margin: "5px"}}
              renderInput={(params) => <TextField {...params} label="Marka" variant="outlined" />}
            />
            <Autocomplete
              id="model-box"
              disableClearable
              onChange={(event,newModel)=>{setCarModel(newModel.label)}}
              options={carBrand?(model.filter(car => car.id === carBrand)):[]}
              getOptionLabel={(option) =>  option.label}
              style={{ width: 300 , margin: "5px"}}
              renderInput={(params) => <TextField {...params} label="Model" variant="outlined" />}
            />
            <Autocomplete
              id="engine-box"
              disableClearable
              onChange={(event,newEngine)=>{setCarEngine(newEngine.label)}}
              options={(carBrand && carModel)?(engine.filter(car => car.id === carModel)):[]}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 , margin: "5px"}}
              renderInput={(params) => <TextField {...params} label="Silnik" variant="outlined" />}
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

const cars = [{
  label: "Porsche",
},{
  label: "Ford",
}]

const model = [{
  id: "Porsche", label: "911 (992)",
},{
  id: "Porsche", label: "Carrera GT",
},{
  id: "Ford", label: "Mustang",
}]

const engine = [{
  id: "911 (992)", label: "Porsche 1"
},{
  id: "Carrera GT", label: "Porsche 2"
},{
  id: "Mustang", label: "Mustang 1"
},{
  id: "Mustang", label: "Mustang 2"
}]