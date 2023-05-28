import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utilities/errorMapping';

const LoginForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {theme} = useTheme();

    const handleSubmit = ()=>{
          if(!email || !password)
          {
            toast.warning('Please Fill all the details!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                return;
          }

          auth.signInWithEmailAndPassword(email,password).then((res)=>{
            toast.success('Logged in!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                handleClose();
          }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'Some Error Occured !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          })
    }

  return (
    <Box
    p={3}
    style = {{
        display : 'flex',
        flexDirection : 'column',
        gap : '20px'
    }}>
        <TextField
            variant='outlined'
            type='email'
            label = 'Enter Email'
            onChange={(e)=> setEmail(e.target.value)}
            InputLabelProps={{
                style : {
                    color : 'white'
                }
            }}
            inputProps={{
                style : {
                    color : 'white'
                }
            }}
        />
        <TextField
            variant='outlined'
            type='password'
            label = 'Enter Password'
            onChange={(e)=> setPassword(e.target.value)}
            InputLabelProps={{
                style : {
                    color : 'white'
                }
            }}
            inputProps={{
                style : {
                    color : 'white'
                }
            }}
        />
        <Button
        variant='contained'
        size='large'
        style={{
            backgroundColor : theme.textColor,
            color : theme.backgroundColor
        }}
        onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default LoginForm