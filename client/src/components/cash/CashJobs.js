import React, { useContext, useEffect, Fragment } from "react";
import JobContext from "../../context/jobs/jobContext";
import Loading from "../layout/Loading";
import JobItem from "../jobs/JobItem";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Icon, Typography } from "@material-ui/core";

const CashJobs = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      variant: "outlined",
      height: "40vh",
    },
    text: {
      color: "grey",
    },
  }));

  const classes = useStyles();

  const jobContext = useContext(JobContext);

  const { jobsCash, getJobsCash, loading } = jobContext;

  useEffect(() => {
    getJobsCash();
    //eslint-disable-next-line
  }, []);

  const cashJobRender = () => {
    if (!loading && jobsCash.length > 0) {
      return (
        <Grid container direction="row" spacing={4}>
          {jobsCash.map((jobs, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <JobItem key={jobs._id} jobs={jobs} component={"Cash"}></JobItem>
            </Grid>
          ))}
        </Grid>
      );
    } else if (loading) {
      return (
        <Grid item md={12} xs={12} sm={12}>
          <Loading />
        </Grid>
      );
    } else {
      return (
        <Grid container direction="row" spacing={3}>
          <Grid item md={12} xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Icon>
                <ErrorIcon />
              </Icon>
              <Typography className={classes.text}>
                No Cash Jobs For Current Period
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  };

  return <Fragment>{cashJobRender()}</Fragment>;
};

export default CashJobs;
