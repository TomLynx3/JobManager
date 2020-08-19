import React, { Fragment, useContext, useEffect } from "react";
import JobContext from "../../context/jobs/jobContext";
import DayOfWeek from "./DayOfWeek";
import Amount from "./Amount";
import Today from "./Today";
import Loading from "../layout/Loading";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import Grid from "@material-ui/core/Grid";

const Jobs = () => {
  const jobContext = useContext(JobContext);

  const { jobs, getJobs, filtred } = jobContext;

  const { promiseInProgress } = usePromiseTracker();

  const calcAmount = (jobs) => {
    const amount = jobs.reduce(function (acc, obj) {
      return acc + obj.total_earned;
    }, 0);

    return amount;
  };

  useEffect(() => {
    trackPromise(getJobs());

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!filtred && (
        <div>
          <Today></Today>
        </div>
      )}
      {jobs !== null && !promiseInProgress ? (
        <div>
          <DayOfWeek jobs={jobs}></DayOfWeek>
          <Amount amount={calcAmount(jobs)}></Amount>
        </div>
      ) : (
        <Grid item md={12} xs={12} sm={12}>
          <Loading />
        </Grid>
      )}
    </Fragment>
  );
};

export default Jobs;
