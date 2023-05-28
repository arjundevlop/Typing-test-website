
import React from 'react'
import AccountCircle from './AccountCircle';
import logo from "../logo3.png";
import { redirect, useNavigate } from 'react-router-dom';

const Header = () => {
  
  return (
    <div className="header">
        <div className="logo">
            <img src={logo} alt="logo" style={{width : "90px" , height: "40px", cursor:"pointer"}} />
        </div>
        <div className="user-icon">
            <AccountCircle/>
        </div>
    </div>
  )
}

export default Header