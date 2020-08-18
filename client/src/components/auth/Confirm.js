import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core/";

const Confirm = (props) => {
  const useStyles = makeStyles((theme) => ({
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  }));

  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { emailVer, msg, error, verSuccess } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    emailVer(props.match.params);

    if (verSuccess === true) {
      props.history.push("/login");
      setAlert(msg, "success");
    }

    if (error !== null) {
      setAlert(error, "error");
    }

    //eslint-disable-next-line
  }, [msg, error, verSuccess]);

  return (
    <Grid className={classes.flex}>
      <Button
        href="/login"
        variant="contained"
        color="primary"
        startIcon={<SettingsBackupRestoreIcon />}
      >
        Go Back
      </Button>
    </Grid>
  );
};

export default Confirm;
