import React, { useContext, useEffect, Fragment } from "react";
import JobItem from "../jobs/JobItem";
import JobFilter from "../jobs/JobFilter";
import { Typography, Paper, Icon, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import SearchIcon from "@material-ui/icons/Search";
import JobContext from "../../context/jobs/jobContext";

const Search = () => {
  const authContext = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { clearCash, filtred, cashFiltred, jobs } = jobContext;

  useEffect(() => {
    authContext.loadUser();

    clearCash();

    //eslint-disable-next-line
  }, [jobs]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      variant: "outlined",
    },
    text: {
      color: "grey",
    },
  }));

  const classes = useStyles();

  const filterRender = () => {
    if (filtred && cashFiltred) {
      return (
        <Fragment>
          {filtred.map((jobs) => (
            <JobItem key={jobs._id} jobs={jobs}></JobItem>
          ))}

          {cashFiltred.map((jobs) => (
            <JobItem key={jobs._id} jobs={jobs} component={"Cash"}></JobItem>
          ))}
        </Fragment>
      );
    } else if (cashFiltred && filtred == null) {
      return (
        <div>
          {cashFiltred.map((jobs) => (
            <JobItem key={jobs._id} jobs={jobs} component={"Cash"}></JobItem>
          ))}
        </div>
      );
    } else if (filtred && cashFiltred == null) {
      return (
        <div>
          {filtred.map((jobs) => (
            <JobItem key={jobs._id} jobs={jobs}></JobItem>
          ))}
        </div>
      );
    } else {
      return (
        <Paper className={classes.paper}>
          <Icon>
            <SearchIcon></SearchIcon>
          </Icon>
          <Typography className={classes.text}>
            Use Form to Search Jobs
          </Typography>
        </Paper>
      );
    }
  };

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <JobFilter></JobFilter>
      </Grid>
      <Grid item md={12} xs={12} sm={12}>
        {filterRender()}
      </Grid>
    </Grid>
  );
};

export default Search;
