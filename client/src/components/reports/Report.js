import React, { useEffect, useContext } from "react";
import JobContext from "../../context/jobs/jobContext";
import AuthContext from "../../context/auth/authContext";
import Loading from "../layout/Loading";
import ReportItem from "../reports/ReportItem";
import ReportStatement from "../reports/ReportStatement";
import Upload from "./Upload";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AlertContext from "../../context/alert/alertContext";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Icon, Typography } from "@material-ui/core";

import TwoWeeks from "./TwoWeeks";

const Report = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      variant: "outlined",
      height: "30vh",
    },
    text: {
      color: "grey",
    },
  }));

  const classes = useStyles();

  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const {
    getUnpaidJobs,
    getTwoWeeks,
    jobs,
    loading,
    msg,
    error,
    clearAlerts,
  } = jobContext;

  useEffect(() => {
    authContext.loadUser();
    getTwoWeeks();
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

  const allJobs = () => {
    getTwoWeeks();
  };

  const getUnpaid = () => {
    getUnpaidJobs();
  };

  const jobsRender = () => {
    if (jobs.length !== 0 && !loading) {
      return (
        <Grid container direction="row" spacing={4}>
          {jobs.map((jobs) => (
            <ReportItem key={jobs._id} jobs={jobs}></ReportItem>
          ))}
        </Grid>
      );
    } else if (loading) {
      return <Loading />;
    } else {
      return (
        <Grid container direction="row" spacing={3}>
          <Grid item md={12} xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Icon>
                <ErrorIcon />
              </Icon>
              <Typography className={classes.text}>
                No Jobs For Current Period
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Grid>
      <Upload></Upload>
      <TwoWeeks></TwoWeeks>
      <ReportStatement />
      <Grid container direction="row" spacing={4}>
        <Grid item md={6} xs={6} sm={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={allJobs}
            fullWidth={true}
          >
            Show Jobs
          </Button>
        </Grid>
        <Grid item md={6} xs={6} sm={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={getUnpaid}
            fullWidth={true}
          >
            Show Unpaid
          </Button>
        </Grid>
      </Grid>

      {jobsRender()}
    </Grid>
  );
};

export default Report;