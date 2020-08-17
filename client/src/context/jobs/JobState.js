import React, { useReducer } from "react";
import axios from "axios";

import JobContext from "./jobContext";
import jobReducer from "./jobReducer";

import {
  GET_JOBS,
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
  GET_TWO_WEEKS,
  GET_CALENDAR_STATEMENT,
  SEND_FILE,
  UNPAID_UPDATE,
  CLEAR_ALERTS,
  CLEAR_CASH_FILTER_ITEM,
  FILE_SEND_ERROR,
} from "../types";

const JobState = (props) => {
  const initialState = {
    jobs: [],
    current: null,
    filtred: null,
    cashFiltred: null,
    error: null,
    msg: null,
    jobsCash: [],
    loading: true,
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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

  //Get Jobs for week
  const getJobsWeek = async () => {
    try {
      const res = await axios.get("/api/jobs/week");

      dispatch({ type: GET_JOBS_WEEK, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };
  //Send file

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file.file);

    try {
      const res = await axios.post("/api/jobs/sendfile", formData);
      dispatch({ type: SEND_FILE, payload: res.data });
    } catch (err) {
      dispatch({ type: FILE_SEND_ERROR, payload: err.response.data });
    }
  };

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
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };
  //Delete Job
  const deleteJob = async (_id) => {
    try {
      const res = await axios.delete(`/api/jobs/${_id}`);

      dispatch({ type: DELETE_JOB, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

  //Clear Jobs

  const clearJobs = () => {
    dispatch({ type: CLEAR_JOBS });
  };

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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

  //Update unpaid job to paid
  const updateUnpaid = async (_id) => {
    try {
      const res = await axios.put(`/api/jobs/unpaid/${_id}`);

      dispatch({ type: UNPAID_UPDATE, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response });
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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

  const getTwoWeeks = async () => {
    try {
      const res = await axios.get("/api/jobs/twoweeks");

      dispatch({ type: GET_TWO_WEEKS, payload: res.data });
    } catch (err) {
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
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
      dispatch({ type: JOB_ERROR, payload: err.response.msg });
    }
  };

  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS });
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        current: state.current,
        filtred: state.filtred,
        cashFiltred: state.cashFiltred,
        error: state.error,
        jobsCash: state.jobsCash,
        loading: state.loading,
        msg: state.msg,
        calendarStatement: state.calendarStatement,
        file: state.file,
        getJobs,
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
        clearAlerts,
        sendFile,
        updateUnpaid,
        clearCashFilterItem,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
