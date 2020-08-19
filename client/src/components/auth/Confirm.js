import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core/";
import Loading from "../layout/Loading";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

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

  const { emailVer, verSuccess } = authContext;

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(emailVer(props.match.params));

    //eslint-disable-next-line
  }, []);

  const redirect = () => {
    if (verSuccess === true) {
      props.history.push("/login");
    }
  };

  return (
    <Grid className={classes.flex}>
      {promiseInProgress === true ? (
        <Loading />
      ) : (
        <Button
          href="/login"
          variant="contained"
          color="primary"
          startIcon={<SettingsBackupRestoreIcon />}
        >
          Go Back
        </Button>
      )}
      {redirect()}
    </Grid>
  );
};

export default Confirm;
