import React from 'react';
import  AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserInfo = ({data}) => {
    const [user] = useAuthState(auth)
    const wpmSum = data.reduce((acc,elem)=>{
          return acc + elem.wpm;
    },0);
    
    let average = Math.floor(wpmSum/data.length);
    if(isNaN(average)){
        average = 0;
    }
  return (
    <div className="user-profile">
        <div className="user">
        <div className="picture">
        <AccountCircleIcon style={{display: 'block' , transform: 'scale(6)', margin:'auto', marginTop:'3.5rem'}}/>

        </div>
        <div className="info">
            <div className="email">
               {user.email}
            </div>
            <div className="joined-at">
               {user.metadata.creationTime}
            </div>
        </div>

        </div>
        <div className="total-tests">
             <span>Total Tests taken - {data.length}</span>
             <span>Average - {average} WPM </span>

        </div>
    </div>
  )
}

export default UserInfo