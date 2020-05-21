import React from 'react';
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
  const [open, setOpen] = React.useState(false);
  const [carBrand, setCarBrand] = React.useState(0);
  const [carModel, setCarModel] = React.useState(0);
  const [carEngine, setCarEngine] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  console.log(carBrand+" "+carModel);

  return (
  <div>
    <MyButton variant="outlined" color="primary" onClick={handleClickOpen}><Add style={{height:'50px',width:'50px'}}/></MyButton>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Dodaj nowy samochód
            </DialogContentText>
            <Autocomplete
              id="brand-box"
              disableClearable
              value={carBrand}
              onChange={(event,newBrand)=>{setCarBrand(newBrand.id)}}
              options={cars}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Marka" variant="outlined" />}
            />
            <Autocomplete
              id="model-box"
              disableClearable
              value={carModel}
              onChange={(event,newModel)=>{setCarModel(newModel.id)}}
              options={cars[carBrand].model}
              getOptionLabel={(option) =>  option.label}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Model" variant="outlined" />}
            />
            <Autocomplete
              id="engine-box"
              disableClearable
              value={carEngine}
              onChange={(event,newEngine)=>{setCarModel(newEngine.id)}}
              options={cars[carBrand].model[carModel].engine}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 }}
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
  id: 0, label: "Porsche", model: [{
    id: 0, label: "911 (992)", engine: [{
      id: 0, label: 1,
    },{
      id: 1, label: 2,
    }]
  },{
    id: 1, label: "Carrera GT", engine: [{
      id: 0, label: 1,
    },{
      id: 1, label: 2,
    }]
  }]
},
{
  id: 1, label: "Ford", model: [{
    id: 0, label: "Mustang", engine: [{
      id: 0, label: 1,
    },{
      id: 1, label: 2,
    }]
  }]
}]
