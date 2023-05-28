import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../Utilities/themeOptions';
import { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {
    const {settheme,theme} = useTheme();
    const handleChange = (e)=>{
        settheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value))


    }
    const email = 'arjun.tomar45@gmail.com';
  return (
    <div className='footer'>
    <div className="links">
       <a href='https://github.com/arjundevlop' target='blank'> <GitHubIcon style={{transform : 'scale(1.4)'}}/></a>
        <a href= 'https://www.linkedin.com/in/arjun-singh-b49a4777/' target='blank'><LinkedInIcon style={{transform : 'scale(1.4)'}}/></a>
        <a href={`mailto:${email}`} target='blank'><EmailIcon style={{transform : 'scale(1.4)'}}/></a>
    </div>
    <div className="themeButton">
        <Select
            onChange={handleChange}
            options={themeOptions}
            menuPlacement='top'
            defaultValue={{label:theme.label, value:theme}}
            styles={{
                control : styles => ({...styles,backgroundColor : 'white'}),
                menu : styles => ({...styles, backgroundColor: 'white'}),
                option : (styles, {isfocused}) => {
                    return {
                        ...styles,
                        backgroundColor: !isfocused ? theme.background : theme.textColor,
                        color : !isfocused ? theme.textColor : theme.background,
                        cursor : 'pointer'
                    }
                }
            }}
        />
    </div>
    </div>
  )
}

export default Footer