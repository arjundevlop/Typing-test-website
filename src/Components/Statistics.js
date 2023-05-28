import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import ReplayIcon from '@mui/icons-material/Replay';

const Statistics = ({wpm,accuracy,correctChars,incorrectChars,missedChars,extraChars,graphData}) => {
    let timeSet = new Set();
    let updatedgraphData = graphData.filter((i)=>{
        if(!timeSet.has(i[0]))
        {
            timeSet.add(i[0]);
            return i;
        }
    })

    const pushData = ()=>{

        if(isNaN(accuracy))
        {
            toast.error('Invalid Test', {
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
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;
        resultRef.add({
            wpm : wpm,
            accuracy : accuracy,
            timestamp : new Date(),
            characters : `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
            userId : uid
        }).then((res)=>{
            toast.success('Data added !', {
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
            toast.error('Not able to save results', {
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

    

    useEffect(()=>{
        if(auth.currentUser)
        {
            pushData()
        } else {
            toast.warning('Login to save results', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    },[])
  return (
    <div className='stats-box'>
    
        <div className="left-box">
        <div className="data-figures">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title" title='Correct/Incorrect/Missed/Extra'>Charactrers</div>
        <div className="subtitle" title='Correct/Incorrect/Missed/Extra'>{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        <div className="char-info">(Correct/Incorrect/Missed/Extra)</div>
        </div>
         <div className = "reload-btn">
        <ReplayIcon fontSize='large' onClick={() => window.location.reload(false)} style={{cursor:'pointer'}} />
        </div>
        

        </div>
        <div className="right-box">
            <Graph graphData={updatedgraphData}/>
        </div>
    </div>
  )
}

export default Statistics