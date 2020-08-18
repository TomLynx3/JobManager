import React, { useContext, useEffect, Fragment, useState } from "react";
import BreakdownItem from "../weekBreakdown/BreakdownItem";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import JobContext from "../../context/jobs/jobContext";
import Loading from "../layout/Loading";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { Typography, Grid, Card } from "@material-ui/core/";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Weeks from "../reports/Weeks";

import moment from "moment";

const Breakdown = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const {
    jobs,
    getJobsWeek,
    filtred,
    loading,
    clearFilter,
    msg,
    error,
    clearAlerts,
  } = jobContext;
  const useStyles = makeStyles(() => ({
    wrapIcon: {
      verticalAlign: "middle",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "red",
      marginBottom: "1rem",
      marginTop: "1rem",
    },
    card: {
      padding: "1rem",
    },
    grid: {
      backgroundColor: "#00C6CF",
      marginTop: "2rem",
    },
  }));

  const classes = useStyles();

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    authContext.loadUser();
    clearFilter();
    trackPromise(getJobsWeek());
    setDate(days);
    if (msg && msg.length > 0) {
      setAlert(msg, "success");
      clearAlerts();
    }
    if (error && error.length > 0) {
      setAlert(error, "error");
      clearAlerts();
    }

    //eslint-disable-next-line
  }, [msg, error]);
  let curr = moment();
  let days = [];
  let from_date = curr.startOf("week");

  for (let i = 1; i <= 7; i++) {
    days.push(
      moment(from_date + 1)
        .add(i, "days")
        .format("dddd, MMMM DD YYYY")
    );
  }

  const [date, setDate] = useState(days);

  //Callback function to get date from FilterWeek search input

  // Callback function to get week number from Weeks component

  const getWeek = (weekNumber) => {
    let days = [];

    let curr = moment().isoWeek(weekNumber);

    let from_date = curr.startOf("week");

    for (let i = 1; i <= 7; i++) {
      days.push(moment(from_date).add(i, "days").format("dddd, MMMM DD YYYY"));
    }
    setDate(days);
  };

  return (
    <Fragment>
      <Weeks props={getWeek} component={"Breakdown"}></Weeks>
      <Typography component="h3" variant="h6" className={classes.wrapIcon}>
        Total per Week: {""}
        {filtred != null
          ? filtred
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)
          : jobs
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
        <Icon className="fas fa-dollar-sign" />
      </Typography>

      {promiseInProgress === true ? (
        <Loading />
      ) : (
        <Grid container direction="row" spacing={3} className={classes.grid}>
          {date.map((date, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <Card className={classes.card}>
                <Typography
                  component="h3"
                  variant="h6"
                  className={classes.wrapIcon}
                >
                  Total per Day: {""}
                  {jobs
                    .filter(function (job) {
                      return job.date === date;
                    })
                    .reduce(function (acc, obj) {
                      return acc + obj.total_earned;
                    }, 0)
                    .toFixed(2)}
                  <Icon className="fas fa-dollar-sign" />
                </Typography>

                <Typography component="h3" variant="h6" color="inherit">
                  {date}
                </Typography>
                {filtred !== null
                  ? filtred
                      .filter((jobs) => {
                        return jobs.date === date;
                      })
                      .map((jobs) => (
                        <BreakdownItem
                          key={jobs._id}
                          jobs={jobs}
                        ></BreakdownItem>
                      ))
                  : jobs
                      .filter((jobs) => {
                        return jobs.date === date;
                      })
                      .map((jobs) => (
                        <BreakdownItem
                          key={jobs._id}
                          jobs={jobs}
                        ></BreakdownItem>
                      ))}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
};
export default Breakdown;
