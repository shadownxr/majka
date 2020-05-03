import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

const MyButton = styled(Button)({
  color: 'black',
  width: '50px',
  height: '50px',
  minWidth: '50px',
  padding: '0px 0px 0px 0px',
});


export default function AddButton(){
    return <MyButton><Add style={{height:'50px',width:'50px'}}/></MyButton>
}