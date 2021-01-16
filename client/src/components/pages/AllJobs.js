import React, { useContext, useEffect, Fragment, useState,useRef } from "react";
import AuthContext from "../../context/auth/authContext";
import JobContext from "../../context/jobs/jobContext";
import ReportItem from '../reports/ReportItem'
import { List } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from "../layout/Loading";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import JobState from "../../context/jobs/JobState";

const AllJobs = () => {
    const myRef = useRef(null)
    const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);
  const {getAllJobs ,allJobs, clearAllJobs} = jobContext;
  const [testState,setTestState] = useState(false)

  const { promiseInProgress } = usePromiseTracker();


  const [limit, setLimit] = useState({limit:50});

  useEffect(() => {
    authContext.loadUser(); 
    trackPromise(getAllJobs(limit))
 
    //eslint-disable-next-line
  }, [limit]);

  useEffect(()=>{
    return ()=>{
      clearAllJobs();
     
    }
  },[])
  
 
  const exucuteMore = () => {
    
   if(myRef.current.scrollTop + myRef.current.clientHeight>= myRef.current.scrollHeight)
        if(allJobs.length >= limit.limit){
            setLimit({limit:limit.limit+50})
        }
  }

 
  

  
  return (
   
      <div ref={myRef} style={{
        overflow: 'scroll',
      }} onScroll={exucuteMore} > 

      {allJobs ? allJobs.map((jobs)=><div style={{marginBottom:"5px"}}  key={jobs._id}><ReportItem jobs={jobs} key={jobs._id} ></ReportItem></div>):null}
  
   {promiseInProgress ? <Loading></Loading> : null}

   
    </div>
  );
};

export default AllJobs;
