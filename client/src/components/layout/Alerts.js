import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";

const Alerts = () => {
  const useStyles = makeStyles((theme) => ({
    alert: {
      position: "fixed",
      zIndex: 100,
      width: "100%",
    },
  }));

  const classes = useStyles();
  const alertContext = useContext(AlertContext);

  return (
    <Grid container justify="flex-start" className={classes.alert}>
      <Grid item md={12} xs={12} sm={12}>
        {alertContext.alerts.length > 0 &&
          alertContext.alerts.map((alert) => (
            <Alert key={alert.id} severity={alert.type}>
              <AlertTitle>{alert.type.toUpperCase()}</AlertTitle>
              {alert.msg}
            </Alert>
          ))}
      </Grid>
    </Grid>
  );
};

export default Alerts;
