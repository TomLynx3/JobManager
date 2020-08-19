import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
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

  const { emailVer, verSuccess } = authContext;

  useEffect(() => {
    emailVer(props.history.push);
    if (verSuccess === true) {
      props.history.push("/login");
    }

    //eslint-disable-next-line
  }, []);

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
