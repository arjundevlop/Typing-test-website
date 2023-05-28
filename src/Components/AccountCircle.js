import React from 'react'
import  AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utilities/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {

    const [open, setopen] = useState(false);
    const [value, setvalue] = useState(0);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const handleModal = ()=>{
        if(user)
        {
            navigate('/user');
        } else {
            setopen(true);
        }
        
    }
    const handleChange = (e,v)=>{
        setvalue(v);
    }
    const handleClose = ()=>{
        setopen(false)
    }
    const logOut = ()=>{
        auth.signOut().then((res)=>{
            toast.success('Logged Out', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }).catch((err)=>{
            toast.error('Not able to Log Out', {
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
    const {theme} = useTheme();
    const googleProvider = new GoogleAuthProvider();
    

    const handleGoogleSignIn = ()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            toast.success(' Google Sign-in Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'Unable to sign in with Google', {
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
    <div className='icon-logout-div'>
        <AccountCircleIcon onClick={handleModal} style={{transform: 'scale(1.5)', cursor:'pointer'}}/>
        {user && <LogoutIcon onClick={logOut} style={{transform: 'scale(1.5)', cursor:'pointer'}} />}
        <Modal
         open = {open}
         onClose={handleClose}
         style={{
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center'
         }} >
            <div style={{width : '400px', textAlign: 'center'}}>
                <AppBar position='static' style={{background:'transparent'}}>
                    <Tabs variant='fullWidth'
                    value={value}
                    onChange={handleChange}>
                        <Tab label= 'login' style={{color : 'white'}}></Tab>
                        <Tab label = 'signup' style={{color : 'white'}}></Tab>
                    </Tabs>
                </AppBar>
                {value===0 && <LoginForm handleClose={handleClose}/>}
                {value === 1 && <SignUpForm handleClose={handleClose}/>}
                <Box>
                    <span style={{color: 'white'}}>OR</span>
                    <GoogleButton style={{width : '100%', marginTop: '13px'}} onClick={handleGoogleSignIn}/>
                </Box>
            </div>
        </Modal>
    </div>
  )
}

export default AccountCircle