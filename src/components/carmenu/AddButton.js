import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

const MyButton = styled(Button)({
  color: 'black',
  maxWidth: '50px',
  maxHeight: '50px',
});


export default function AddButton(){
    return <MyButton><Add style={{height:'50px',width:'50px'}}/></MyButton>
}