import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import UserDataTable from '../Components/UserDataTable';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {
  const [data, setdata] = useState([]);
  const [graphData, setgraphData] = useState([])
  const [dataLoading, setdataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserData = ()=>{
    const resultsRef = db.collection("Results");
    const {uid} = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
    .where("userId", "==", uid)
    .orderBy('timestamp','desc')
    .get()
    .then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
       
        tempData.push({...doc.data()})
        tempGraphData.push([doc.data().timestamp.toDate().toLocaleString().split(",")[0] , doc.data().wpm])
        
      })
      setdata(tempData);
      setgraphData(tempGraphData.reverse());
      setdataLoading(false);
      
    })
  }
  

  useEffect(()=>{
    if(!loading)
    {
      fetchUserData();
    }
    if(!loading && !user)
    {
      navigate('/');
    }
  },[loading])

  if(loading || dataLoading)
  {
    return <div className="loading-div"><CircularProgress size={150}/></div>
  }

  return (
    <div className='App'>
    <UserInfo data= {data}/>
    <div className="graph-div">
    <Graph graphData = {graphData} />
    </div>
    
      <UserDataTable data = {data}/>
    </div>
  )
}

export default UserPage