import React, { useReducer } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import JobContext from "./jobContext";
import jobReducer from "./jobReducer";

import {
  GET_JOBS,
  GET_ALL_JOBS,
  GET_JOBS_WEEK,
  ADD_JOB,
  CLEAR_JOBS,
  DELETE_JOB,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOB,
  FILTER_JOB,
  CLEAR_FILTER,
  JOB_ERROR,
  CLEAR_FILTER_ITEM,
  FILTER_WEEK,
  GET_JOBS_CASH,
  DELETE_JOB_CASH,
  ADD_JOB_CASH,
  CLEAR_CASH,
  UPDATE_CASH_JOB,
  GET_UNPAID_JOBS,
  CLEAR_ALL_JOBS,
  GET_TWO_WEEKS,
  GET_CALENDAR_STATEMENT,
  SEND_FILE,
  UNPAID_UPDATE,
  CLEAR_CASH_FILTER_ITEM,
  FILE_SEND_ERROR,
} from "../types";

const JobState = (props) => {
  const initialState = {
    jobs: [],
    allJobs:[],
    current: null,
    filtred: null,
    cashFiltred: null,
    error: null,
    msg: null,
    jobsCash: [],
    calendarStatement: null,
    file: null,
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get jobs

  const getJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
       
      dispatch({ type: GET_JOBS, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

//Get All Jobs with limit 
const getAllJobs = async(limit)=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/jobs/alljobs", limit, config);
   
    dispatch({ type: GET_ALL_JOBS, payload: res.data });
  } catch (err) {
    dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
  }
}


  //Get Jobs cash

  const getJobsCash = async (period) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/jobs/getCash", period, config);

      dispatch({ type: GET_JOBS_CASH, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Get Jobs for week
  const getJobsWeek = async () => {
    try {
      const res = await axios.get("/api/jobs/week");

      dispatch({ type: GET_JOBS_WEEK, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //Send file

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file.file);
    const convertToBase64 = (file) =>{
      return new Promise ((resolve,reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)


        fileReader.onload = ()=>{
          resolve(fileReader.result)
        }

        fileReader.onerror = ((error)=>{
          reject(error)
        }) 
      })
    }
    
    const base64 =  await convertToBase64(file.file)

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   
    //formData.append('file',file.file)
    const obj = {
      string:base64
    }
    
  //   formData.append('base64',base64)
  // console.log()
   try {
        const res = await axios.post("/api/jobs/sendfile", obj,config);
        dispatch({ type: SEND_FILE, payload: res.data });
        NotificationManager.success(res.data.msg, "Success!", 2500);
      } catch (err) {
        dispatch({ type: FILE_SEND_ERROR });
        NotificationManager.error(err.response.data.error, "Error!", 2500);
      }
    


  //console.log(x)
  
   // console.log(file)
    
  
}

  //Add Job
  const addJob = async (job) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/jobs", job, config);

      dispatch({ type: ADD_JOB, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //Delete Job
  const deleteJob = async (_id) => {
    try {
      const res = await axios.delete(`/api/jobs/${_id}`);

      dispatch({ type: DELETE_JOB, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //Update Job
  const updateJob = async (job) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/jobs/${job._id}`, job, config);

      dispatch({ type: UPDATE_JOB, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Clear Jobs

  const clearJobs = () => {
    
    dispatch({ type: CLEAR_JOBS });
  };
  //clear all jobs
  const  clearAllJobs = () =>{
    console.log("3")
    dispatch({ type: CLEAR_ALL_JOBS });
  }

  //Set Current Job
  const setCurrent = (job) => {
    dispatch({ type: SET_CURRENT, payload: job });
  };
  //Clear Current Job
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //filter job
  const filterJobs = async (text) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/jobs/filtred", text, config);

      dispatch({ type: FILTER_JOB, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //fILTER JOBS by WEEK
  const filterWeek = async (text) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/jobs/filtredweek", text, config);

      dispatch({ type: FILTER_WEEK, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  const clearFilterItem = (_id) => {
    dispatch({ type: CLEAR_FILTER_ITEM, payload: _id });
  };

  const clearCashFilterItem = (_id) => {
    dispatch({ type: CLEAR_CASH_FILTER_ITEM, payload: _id });
  };

  //delete job cash
  const deleteJobCash = async (_id) => {
    try {
      const res = await axios.delete(`/api/jobs/cash/${_id}`);

      dispatch({ type: DELETE_JOB_CASH, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  // add job cash

  const addJobCash = async (job) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/jobs/cash", job, config);

      dispatch({ type: ADD_JOB_CASH, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Update cash Job

  const updateCashJob = async (job) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/jobs/cash/${job._id}`, job, config);

      dispatch({ type: UPDATE_CASH_JOB, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Update unpaid job to paid
  const updateUnpaid = async (_id) => {
    try {
      const res = await axios.put(`/api/jobs/unpaid/${_id}`);

      dispatch({ type: UNPAID_UPDATE, payload: res.data });
     
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  const clearCash = () => {
    dispatch({ type: CLEAR_CASH });
  };

  const getUnpaidJobs = async () => {
    try {
      const res = await axios.get("/api/jobs/unpaid");

      dispatch({ type: GET_UNPAID_JOBS, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  const getTwoWeeks = async () => {
    try {
      const res = await axios.get("/api/jobs/twoweeks");

      dispatch({ type: GET_TWO_WEEKS, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  const getCalendarStatement = async (period) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/jobs/calendar/statement/",
        period,
        config
      );

      dispatch({ type: GET_CALENDAR_STATEMENT, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        allJobs:state.allJobs,
        current: state.current,
        filtred: state.filtred,
        cashFiltred: state.cashFiltred,
        jobsCash: state.jobsCash,
        msg: state.msg,
        calendarStatement: state.calendarStatement,
        file: state.file,
        getJobs,
        getAllJobs,
        getJobsWeek,
        filterJobs,
        filterWeek,
        clearFilter,
        clearFilterItem,
        updateJob,
        getJobsCash,
        getUnpaidJobs,
        addJob,
        setCurrent,
        addJobCash,
        clearCurrent,
        deleteJobCash,
        clearCash,
        updateCashJob,
        getTwoWeeks,
        deleteJob,
        getCalendarStatement,
        clearJobs,
        sendFile,
        updateUnpaid,
        clearCashFilterItem,
        clearAllJobs
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
