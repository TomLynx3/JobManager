import React, { useEffect, useContext, useState } from "react";
import CashJobs from "../cash/CashJobs";
import Weeks from "../reports/Weeks";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Statement from "../cash/Statement";
import LogForm from "../statementComp/LogForm";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CashLog from "../cash/CashLog";
import { Grid, Modal, Backdrop, Fade, Button } from "@material-ui/core/";
import StatementContext from "../../context/statement/statementContext";
import JobContext from "../../context/jobs/jobContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Cash = () => {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    modalContent: {
      outline: "none",
    },
  }));

  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const statementContext = useContext(StatementContext);
  const jobContext = useContext(JobContext);

  const { setAlert } = alertContext;
  const { msg, error, clearAlerts } = jobContext;
  const { clearLogs } = statementContext;

  const [toogle, setToogle] = useState({
    toogled: false,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    if (toogle.toogled === false) {
      setToogle({ toogled: true });
    } else {
      setToogle({ toogled: false });
    }
  };

  useEffect(
    () => {
      authContext.loadUser();
      clearLogs();

      if (msg && msg.length > 0) {
        setAlert(msg, "success");
        clearAlerts();
      }
      if (error && error.length > 0) {
        setAlert(error, "error");
        clearAlerts();
      }
      if (statementContext.msg && statementContext.msg.length > 0) {
        setAlert(statementContext.msg, "success");
        statementContext.clearAlerts();
      }

      if (statementContext.error && statementContext.error.length > 0) {
        setAlert(statementContext.error, "error");
        statementContext.clearAlerts();
      }

      //eslint-disable-next-line
    },
    [msg, error, statementContext.msg],
    statementContext.error
  );

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <Weeks component={"Cash"}></Weeks>
        <Statement></Statement>

        <Grid container direction="row" spacing={4}>
          <Grid item md={12} xs={12} sm={12}>
            <Button
              onClick={handleOpen}
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              fullWidth={true}
            >
              Edit Cash Balance
            </Button>
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
            <Button
              onClick={onClick}
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              fullWidth={true}
            >
              {!toogle.toogled ? "Show Logs" : "Show Jobs"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {!toogle.toogled ? <CashJobs /> : <CashLog></CashLog>}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalContent}>
            <LogForm handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Cash;