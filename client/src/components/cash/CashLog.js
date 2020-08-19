import React, { useContext, useEffect, Fragment } from "react";
import StatementContext from "../../context/statement/statementContext";
import LogItem from "../statementComp/LogItem";
import Loading from "../layout/Loading";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { Grid, Paper, Icon, Typography } from "@material-ui/core/";

const CashLog = () => {
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

  const statementContext = useContext(StatementContext);
  const { getCashLogs, cashLogs } = statementContext;

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(getCashLogs());

    //eslint-disable-next-line
  }, []);

  const cashLogRender = () => {
    if (!promiseInProgress && cashLogs.length > 0) {
      return (
        <Grid container direction="row" spacing={4}>
          {cashLogs.map((log, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <LogItem key={log._id} logs={log}></LogItem>
            </Grid>
          ))}
        </Grid>
      );
    } else if (promiseInProgress) {
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
                No Cash Logs For Current Period
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  };

  return <Fragment>{cashLogRender()}</Fragment>;
};

export default CashLog;
